import React, { useEffect, useState } from "react";
import "./Images.css";
import { Navbar } from "./navigationbar";
import { Link, useNavigate, } from "react-router-dom";
import { Grid,Rating} from "@mui/material";
import axios from "axios";
import StarBorderIcon from '@mui/icons-material/StarBorder';



function Renderimages({ movies }) {

  if (!movies) {
    return <div>Loading...</div>;
  }
  return (
    <div className="imagelist">
      <Grid container sx={{ height: '100%', width: '100%' }}>
        {movies.map((movie) => (
          <Grid item key={movie.movieID} xs={4} md={1.5} sx={{ margin: 0 }}>\
            <Link to={`/singlemovie/${movie.imdbID}`}>
              <img src={`${movie.photourl}`} alt={movie.movieName} title={movie.movieName} className="images" />
            </Link>
            <Rating
              size="medium"
              readOnly
              value={movie.rating}
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
export function Reviews() {
  const navigate = useNavigate();
  const [movies, setMovies] = React.useState([]);

  //    * handle movies function 
  //    */
  const token = localStorage.getItem('token')
  useEffect(() => {
    console.log(token)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/user/home`,
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
  }, [token])

  return (
    <div className="background" >
      <div style={{ position: 'absolute', height: '1.5px', top: '19%', backgroundColor: 'white', left: '8.8%', right: '8.65%' }}>

      </div>
      <p style={{
        position: 'absolute', top: '12.5%', left: '8.8%', right: '8.65%', fontSize: '20px', color: 'white', fontWeight: 'bold',fontFamily:'Blackpast Demo'
      }}>Your Reviews</p>
      <Renderimages movies={movies}></Renderimages>
      <Navbar />
    </div>
  )
}