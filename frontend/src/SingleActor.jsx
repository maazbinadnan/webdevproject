import axios from "axios";
import React, { useEffect, useState } from "react";
import "./singleactor.css"
import "./singlemovie.css"
import { Navbar } from "./navigationbar";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { Grid, Paper } from "@mui/material";



function DisplayActorPoster({ actor }) {


  if (!actor) {
    return <div>Loading...</div>;
  }
  return (
    <div className="actordetails">
      
      <Paper sx={{ position: 'absolute', width: '35%', height: '100%', top: '15%', left: '32%', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="actorname">
        <h1 style={{ fontFamily: 'Blackpast Demo', color: 'white' }}>{actor[0].actorname}</h1>
      </div>
        <div className="actorbday">
        <p style={{ fontFamily: 'Inter', color: 'white' }}>Birthday:<b>{new Date(actor[0].birthdate).toLocaleDateString()} </b></p>

      </div>
      <div className="birthplace">
        <p style={{ fontFamily: 'Inter', color: 'white' }}>Nationality  : <b>{actor[0].birthplace}</b></p>
      </div>
      <div className="gender">
        <p style={{ fontFamily: 'Inter', color: 'white' }}>Gender: <b>{actor[0].gender}</b></p>
      </div>

      <div className="actorimdbid">
        <p style={{ fontFamily: 'Inter', color: 'white' }}>IMDB ID: <b>{actor[0].imdbID}</b></p>
      </div>
      </Paper>
      <div>
        <img src={`${actor[0].photourl}`} alt={actor[0].actorName} title={actor[0].actorName} className="actorposter" />

      </div>

    </div>
  );
}

function RenderBottomimages({ movieid, token }) {

  const [movies, setmovies] = useState([]);
  useEffect(() => {
    const photoUrls = [];
    movieid.map((movies) => {
      
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:5000/user/movie/${movies}`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      axios.request(config)
        .then((response) => {

          console.log(response.data.result[0].photourl)
          photoUrls.push(response.data.result[0]);

          if (photoUrls.length === movieid.length) {
            setmovies(photoUrls);
            console.log()
          }
          console.log(photoUrls.length)

        })

        .catch((error) => {
          console.log(error);
        });
    })

  }, [movieid])
  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="moviesactedin">
      <Grid container sx={{ height: '100%', width: '100%' }}>
        {movies.map((movies) => (
          <Grid item key={movies.movies} xs={4} md={4} sx={{ margin: 0 }}>\
            <Link to={`/singlemovie/${movies.imdbID}`}>
              <img src={`${movies.photourl}`} alt={movies.moviename} title={movies.moviename} className="singlemovieidentifier" />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}


export function Singleactor() {
  const { imdbID } = useParams()
  const [actors, setactor] = useState(null)
  const [movieIDs, setmovieIDs] = useState([]);

  const token = localStorage.getItem('token')
  if (!token) {
    window.location.assign('/login')
  }
  useEffect(() => {


    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/user/actor/${imdbID}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data.result);

        // console.log(response.data.result[0].Actors.split(", ").map(actor => actor.split("-")[1]))
        const movies = response.data.result[0].Movies.split(",")
        setmovieIDs(movies)
        console.log(movieIDs)
        setactor(response.data.result);
        console.log("hiiiii")
        console.log(actors)

      })

      .catch((error) => {
        console.log(error);
      });


  }, [])
  return (
    <div>
      <DisplayActorPoster actor={actors}></DisplayActorPoster>
      <Navbar />
      <RenderBottomimages movieid={movieIDs} token={token} ></RenderBottomimages>
    </div>
  )
}