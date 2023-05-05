import axios from "axios";
import React, { useEffect, useState } from "react";
import "./singlemovie.css"
import { Navbar } from "./navigationbar";
import { useParams } from "react-router-dom";
import { Backdrop, Button, Paper, Rating, TextField } from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

function ReviewMovie({ movie, onclose}) {
  const [rating, Setrating] = useState(3)
  const [review, Setreview] =useState(movie[0].Review)
  const token = localStorage.getItem('token')
  let data = {
    rating:  rating,
    comments: review
  };
   const handleclick=()=>{
    
    console.log(rating)
    console.log(review)
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/user/addreview/?movieID=${movie[0].movieID}`,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization': `Bearer ${token}`
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      alert(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error);
    });
    onclose()
  }
  return (
    <div className="postmovie">
      <Paper sx={{ position: 'absolute', backgroundColor: '#706c61', top: '25%', width: '30%', height: '50%', left: '35%' }} elevation={24}>
      <div className="newrating">
        <Rating size="large" name="half-rating" value={rating} onChange={(event, newValue) => Setrating(newValue)} precision={0.5}
          sx={{
            '& .MuiRating-iconFilled': {
              color: '#d5b942', // change to your desired color
            },
          }} />
          </div>
        <div>
          <h2 style={
            {
              position: "absolute",
              color: '#f8f4e3',
              textAlign: 'center',
              marginTop: '5%',
              left: '30%',
              fontSize: '30px',
            }}> Your Review</h2>
        </div>
        <div>

          <TextField
            variant="outlined"
            sx={{
              position: "absolute",
              fontFamily: 'Inter',
              textAlign: 'left',
              marginTop: '20%',
              width: '90%',
              borderRadius: '5px',
              fontSize: '50px',
              left: '5%',
              color: 'white',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
            }}
            multiline
            minRows={4}
            maxRows={5}
            defaultValue={movie[0].Review}
            onChange={(event) => Setreview(event.target.value)}
          />


        </div>
        <div className="submitreview">
          <Button onClick={handleclick} variant="filled" size="large" sx={{ color: 'white', backgroundColor: '#660C97',border: '2px solid #660C97' }}>
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  )
}

function DisplayMoviePoster({ movie }) {
  const [open, Setopen] = useState(false)
  const handleClose = () => {
    Setopen(false);

  };
  const handleOpen = () => {
    Setopen(true);

  };
  if (!movie) {
    return <div>Loading...</div>;
  }
  return (
    <div className="moviedetails">
      <div className="movietitle">
        <h1 style={{ fontFamily: 'Blackpast Demo', color: 'white' }}>{movie[0].movieName}</h1>
      </div>
      <div className="moviedesc">
        <h2 style={{ color: 'white' }}>Synopsis</h2>
        <p style={{ fontFamily: 'Inter', color: 'white' }}><b>{movie[0].overview}</b></p>
      </div>
      <div className="releasedate">
        <p style={{ fontFamily: 'Inter', color: 'white' }}>Release Date: <b>{movie[0].releaseDate}</b></p>
      </div>
      <div className="actors">
        <p style={{ fontFamily: 'Inter', color: 'white' }}>Actors: <b>{movie[0].Actors}</b></p>
      </div>
      <div className="director">
        <p style={{ fontFamily: 'Inter', color: 'white' }}>Director: <b>{movie[0].movieDirector}</b></p>
      </div>
      <div className="genre">
        <p style={{ fontFamily: 'Inter', color: 'white' }}>Genre: <b>{movie[0].genre}</b></p>
      </div>
      <div className="poster">
        <img src={`${movie[0].photourl}`} alt={movie[0].movieName} title={movie[0].movieName} className="image" />
      </div>
      <Paper className="review" elevation={24} sx={{ backgroundColor: '#323433' }}>
        <div className="rating" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Rating name="read-Only" value={movie[0].Rating} readOnly precision={0.5} size="large" sx={{
            '& .MuiRating-iconFilled': {
              color: '#d5b942', // change to your desired color
            },

          }} />
        </div>
        <h2 style={{ color: '#f8f4e3', textAlign: 'center', marginTop: '20%', fontSize: '30px' }}>Review</h2>

        <div className="reviewtext" >
          <hr />
          <p style={{ fontFamily: 'Inter', color: 'white', textAlign: 'left', margin: '3%', fontSize: '20px' }}><i>{movie[0].Review}</i></p>
        </div>
        <div className="logmovie">
          {movie[0].Review ? (
            <Button onClick={handleOpen} variant="filled" size="large" sx={{ color: 'white', backgroundColor: '#660C97', width: '100%', border: '2px solid #660C97' }}>
              Edit Review
            </Button>
          ) : (
            <Button onClick={handleOpen} variant="filled" size="large" sx={{ color: 'white', backgroundColor: '#660C97', width: '100%', border: '2px solid #660C97' }}>
              Log
            </Button>
          )}
          <Backdrop
            open={open}
            
          >
            <ReviewMovie movie={movie}  onclose={handleClose} />
          </Backdrop>
        </div>

      </Paper>

    </div>
  );
}


export function Singlemovie() {
  const { moviename } = useParams()
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    console.log(moviename)
    console.log(`http://localhost:5000/user/movie/${moviename}`)
    const token = localStorage.getItem('token')
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/user/movie/${moviename}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data.result);
        setMovie(response.data.result);

      })

      .catch((error) => {
        console.log(error);
      });


  }, [])
  return (
    <div>
      <DisplayMoviePoster movie={movie} ></DisplayMoviePoster>
      <Navbar />
    </div>
  )
}