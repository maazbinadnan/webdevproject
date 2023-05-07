import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import './blogs.css'
import { Navbar } from './navigationbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function FeaturedPost() {
const [posts, setPosts] = React.useState([]);
const [loading, setLoading] = React.useState(true);
  const token = localStorage.getItem('token')
    if (!token) {
        window.location.assign('/login')
    } 
    
    useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/user/wikis',
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
    },[])
    if(loading){
        return(
            <div>
                <h1>loading</h1>
            </div>
        )
    }

  return (
    <div>
        <Navbar/>
        <div className='featurepost'>
        <Card sx={{ height: '100%', display: 'flex' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <h1 style={{ fontSize: '50px' }}> {posts[0].title} </h1>
            <h2 style={{fontSize:'20px',}}>{posts[0].content.split(' ').slice(0, 10).join(' ')}...
            <Link> continue </Link>
            </h2>
            <p> by {posts[0].username}

            </p>
          </CardContent>
          <CardMedia
            component="img"
            image="https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BpZGVybWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="random"
            sx={{ width: '30%', right: '0',objectFit:'cover' }}
            />
        </Card>
      </div>   
    <div className='grid'>
    <Grid container spacing={2}>
      {posts.slice(1).map((post, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
               <b> {post.title}</b>
              </Typography>
              <Typography variant="body2" component="p">
                {post.content.split(' ').slice(0,20).join(' ')} ... 
                <Link> continue
                </Link>
                <p> by {posts[0].username}
                </p>

              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
    </div>
  );
}
