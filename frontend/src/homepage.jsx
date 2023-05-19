
import React, { useEffect, useState } from "react";
import "./Images.css";
import { Navbar } from "./navigationbar";
import { Link } from "react-router-dom";
import { Grid, Rating, Card, CardContent, Typography } from "@mui/material";

import axios from "axios";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './blogs.css'



function Renderimages({ movies }) {

  if (!movies) {
    return <div>Loading...</div>;
  }
  const shuffledMovies = [...movies].sort(() => Math.random() - 0.5);

  // Get the first 8 movies from the shuffled array
  const randomMovies = shuffledMovies.slice(0, 8);

  return (
    <div className="homeimagelist">
      <Grid container sx={{ height: '100%', width: '100%' }}>
        {randomMovies.map((movie) => (
          <Grid item key={movie.movieID} xs={4} md={1.5} sx={{ margin: 0 }}>\
            <Link to={`/singlemovie/${movie.imdbID}`}>
              <img src={`${movie.photourl}`} alt={movie.movieName} title={movie.movieName} className="images" />

            </Link>
            <Rating
              size="medium"
              readOnly
              value={movie.avgRating}
              precision={0.5}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#d5b942',
                },
                '& .MuiRating-iconEmpty': {
                  borderColor: 'white',
                },
              }}
              emptyIcon={<StarBorderIcon style={{ color:'white' }} />}
            />


          </Grid>
        ))}
      </Grid>
      
    </div>
  );
}
export function Homepage() {
  const [movies, setMovies] = React.useState([]);
  const [sortby, setSortby] = React.useState('');
  const [count, setCount] = React.useState(1);
  const [currentpage, Setcurrentpage] = useState(1);
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [genre, setGenre] = React.useState('');
  const handlegenreselect = (event) => {
    setGenre(event.target.value);
  };

  


  const handlePageChange = (event, value) => {
    Setcurrentpage(value);
  };


  const token = localStorage.getItem('token')
  if (!token) {
    window.location.assign('/login')
  }
  useEffect(() => {


    console.log(token)
    console.log(sortby)

    let url = `http://localhost:5000/user/movies?moviepage=${currentpage}&sortby=${sortby}`;

    if (genre) {
      url += `&genre=${genre}`;
    }

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(url)
        console.log(response.data)
        console.log(response.data.totalrecords)
        setCount(Math.ceil(response.data.totalrecords / 24))
        console.log(count)
        setMovies(response.data.result);

      })
      .catch((error) => {
        console.log(error);
      });
      let config1 = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/user/wikis',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      axios.request(config1)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setPosts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        })
  }, [sortby, currentpage, genre])

  if (loading) {
    return (
      <div>
        <h1>loading</h1>
      </div>
    )
  }
  const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
  const randomPosts = shuffledPosts.slice(0, 3);

  return (
    <div className="background" >
      <div style={{ position: 'absolute', height: '1.5px', top: '28%', backgroundColor: 'white', left: '8.8%', right: '8.65%' }}>

      </div>
      <h1 style={{
        position: 'absolute', top: '5%',left:'43%', fontSize: '60px', color: 'white', fontWeight: 'bold',fontFamily:'Blackpast Demo'
      }}>lumiere</h1>
     <p style={{
        position: 'absolute', top: '22%',left:'44%', fontSize: '20px', color: 'white', fontWeight: 'bold',fontFamily:'Blackpast Demo'
      }}>Popular this week</p>
     
      
      
 
      <Renderimages movies={movies}></Renderimages>
      <div style={{ position: 'absolute', height: '1.5px', top: '70%', backgroundColor: 'white', left: '8.8%', right: '8.65%' }}>

      </div>
      <p style={{
        position: 'absolute', top: '64%',left:'47%', fontSize: '20px', color: 'white', fontWeight: 'bold',fontFamily:'Blackpast Demo'
      }}>Top Posts</p>
     
      <Navbar />
      //wikis
      
      <div className='homegrid'>
        <Grid container spacing={2}>
          {randomPosts.map((post, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card sx={{

                '&:hover': {
                  transform: 'scale(1.05)',
                  zIndex: 1,
                }
              }}>

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
            </Grid>

          ))}
        </Grid>
      </div>
     
    </div>
  )
}









