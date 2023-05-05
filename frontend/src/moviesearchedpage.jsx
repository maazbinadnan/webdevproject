import React, { useEffect, useState } from "react";
import "./movies.css";
import { Navbar } from "./navigationbar";
import { Link, useLocation, } from "react-router-dom";
import { Grid} from "@mui/material";
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
export function Moviesearched() {
const location = useLocation();
const moviename = new URLSearchParams(location.search).get("moviename");
  const [movies, setMovies] = React.useState([]);
  const [sortby, setSortby] = React.useState('');
  //    * handle movies function 
  //    */
  const token = localStorage.getItem('token')
  useEffect(() => {
    console.log(token)
    console.log(sortby)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/user/moviename?moviename=${moviename}`,
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
  }, [token, sortby,moviename])

  return (
    <div className="background" >

      <Renderimages movies={movies}></Renderimages>
      <Navbar />
    </div>
  )
}
