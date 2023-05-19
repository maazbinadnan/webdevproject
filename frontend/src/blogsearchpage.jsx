import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import './blogs.css'
import { Navbar } from './navigationbar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Deletwiki({ token,wikid}) {
  const handleclick = () => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/admin/wiki/${wikid}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(response.data.message)
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });

  }
  return (
    <Button onClick={handleclick} variant='contained' sx={{ backgroundColor: '', mt: 1 }}>Delete Wiki</Button>
  )
}

export default function SearchPost() {
    const location = useLocation();
  const title = new URLSearchParams(location.search).get("title");  
  const [posts, setPosts] = React.useState([]);
  const [admin, Setadmin] = React.useState(false)
  const [loading, setLoading] = React.useState(true);
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.assign('/login')
  }




  useEffect(() => {
    if (jwtDecode(token).user === 'admin') {
      Setadmin(true)
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/admin/allwikis',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setPosts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:5000/user/searchwiki?title=${title}`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setPosts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [])
  if (loading) {
    return (
      <div>
        <h1>loading</h1>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div style={{ position: 'absolute', height: '1.5px', top: '19%', backgroundColor: 'white', left: '8.8%', right: '8.65%' }}>

      </div>
      <p style={{
        position: 'absolute', top: '12.5%', left: '8.8%', right: '8.65%', fontSize: '20px', color: 'white', fontWeight: 'bold', fontFamily: 'Blackpast Demo'
      }}>All Posts with</p>
      <div className='grid'>
        <Grid container spacing={2}>
          {posts.map((post, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <b> {post.title}</b>
                  </Typography>
                  <Typography variant="body2" component="p">
                    {post.content}
                    <p> by {post.username}
                    </p>

                  </Typography>
                </CardContent>
              </Card>
              {admin && (
                <div>
                  <Deletwiki  token={token} wikid={post._id}/>
                </div>
              )}
            </Grid>

          ))}
        </Grid>
      </div>
    </div>
  );
}