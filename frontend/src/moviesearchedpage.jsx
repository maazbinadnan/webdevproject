import React, { useEffect, useState } from "react";
import "./Images.css";
import { Navbar } from "./navigationbar";
import { Link, useLocation, } from "react-router-dom";
import { Grid,Rating } from "@mui/material";
import axios from "axios";
import StarBorderIcon from '@mui/icons-material/StarBorder';

function Renderimages({ result }) {

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="imagelist" style={{ display: "flex", flexDirection: "column" }}>
      <Grid container sx={{ height: '100%', width: '100%' }}>
        {result.map((movie) => (
          <Grid item key={movie.imdbID} xs={4} md={1.5} sx={{ margin: 0 }}>\
            <Link to={`/singlemovie/${movie.imdbID}`}>
              <img src={`${movie.photourl}`} alt={movie.imdbID} title={movie.imdbID} className="images" />
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
export function  Moviesearched() {
  const location = useLocation();
  const moviename = new URLSearchParams(location.search).get("moviename");
  const [searchresult, setresult] = React.useState('')
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
        // console.log(response.data)
        setresult(response.data.result)

      })
      .catch((error) => {
        console.log(error);
      });
    //calling actors

  }, [token, sortby, moviename])

  return (
    <div className="background" >
      <div style={{ position: 'absolute', height: '1.5px', top: '19%', backgroundColor: 'white', left: '8.8%', right: '8.65%' }}>

      </div>
      <p style={{
        position: 'absolute', top: '12.5%', left: '8.8%', right: '8.65%', fontSize: '20px', color: 'white', fontWeight: 'bold', fontFamily: 'Blackpast Demo'
      }}>All Results with "{`${moviename}`}"</p>
      <Renderimages result={searchresult}></Renderimages>
      <Navbar />
    </div>
  )
}
