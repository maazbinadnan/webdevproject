import React, { useEffect, useState } from "react";
import "./movies.css";
import { Navbar } from "./navigationbar";
import { Link, useNavigate, } from "react-router-dom";
import { Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import axios from "axios";



function Renderimages({ movies }) {

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movielist">
      <Grid container sx={{ height: '100%', width: '100%' }}>
        {movies.map((movie) => (
          <Grid item key={movie.movieID} xs={4} md={1.5} sx={{ margin: 0 }}>\
            <Link to={`/singlemovie/${movie.movieName}`}>
              <img src={`${movie.photourl}`} alt={movie.movieName} title={movie.movieName} className="images" />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export function Movies() {
  const navigate =useNavigate();
  const [movies, setMovies] = React.useState([]);
  const [sortby, setSortby] = React.useState('');
  //    * handle movies function 
  //    */
  const token = localStorage.getItem('token')
  if (!token) {
    navigate('/login')
  }
    useEffect(() => {
    console.log(token)
    console.log(sortby)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/user/movies?moviepage=1&sortby=${sortby}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data)
        setMovies(response.data.result);

      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, sortby])

  return (
    <div className="background" >

      <div className="sort">
        <ToggleButtonGroup
          sx={{ backgroundColor: 'grey', borderRadius: '3px' }} size="small"
          exclusive
          onChange={(event, newSortBy) => setSortby(newSortBy)}
          aria-label="text alignment"
        >

          <ToggleButton value="movieName" selected={sortby === "movieName"} sx={{ bgcolor: sortby === "movieName" ? 'black' : '#f8f4e3', color: sortby === "movieName" ? 'white' : 'inherit' }}>
            <b>Movie Name</b>
          </ToggleButton>
          <ToggleButton value="releaseDate" selected={sortby === "releaseDate"} sx={{ bgcolor: sortby === "releaseDate" ? 'black' : '#f8f4e3', color: sortby === "releaseDate" ? 'white' : 'inherit' }}>
            Release Date
          </ToggleButton>
          <ToggleButton value="" sx={{ bgcolor: sortby === "" ? 'black' : '#f8f4e3', color: sortby === "" ? 'white' : 'inherit' }}>
            Default
          </ToggleButton>
          </ToggleButtonGroup>
      </div>
      <Renderimages movies={movies}></Renderimages>
      <Navbar />
    </div>
  )
}









