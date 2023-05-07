import React, { useEffect, useState } from "react";
import "./movies.css";
import { Navbar } from "./navigationbar";
import { Link } from "react-router-dom";
import { Grid, ToggleButtonGroup, ToggleButton, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios";
const genres = [

  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Drama',
  'Music',
  'Fantasy',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
]
function Pagelist({ count, pagechange }) {
  return (
    <div className="pagination">
      <Stack spacing={2}>
        <Pagination count={count} sx={{ backgroundColor: 'white', color: 'aqua' }} onChange={pagechange} />
      </Stack>

    </div>
  )
}

function Genredropdown({ genre, handlegenreselect }) {
  return (
    <div className="genredropdown">
      <FormControl fullWidth>
        <InputLabel>Genre</InputLabel>
        <Select
          value={genre}
          onChange={handlegenreselect}
        >
          {genres.map((genre) => (
            <MenuItem value={genre}>
              {genre}
            </MenuItem>
          ))}
          <MenuItem value={null}>
            none
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
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
  const [movies, setMovies] = React.useState([]);
  const [sortby, setSortby] = React.useState('');
  const [count, setCount] = React.useState(1);
  const [currentpage, Setcurrentpage] = useState(1);
  //handle genre
  const [genre, setGenre] = React.useState('');
  const handlegenreselect = (event) => {
    setGenre(event.target.value);
  };


  const handlePageChange = (event, value) => {
    Setcurrentpage(value);
  };

  //    * handle movies function 
  //    */
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
        setCount(Math.ceil(response.data.totalrecords/24))
        console.log(count)
        setMovies(response.data.result);

      })
      .catch((error) => {
        console.log(error);
      });
  }, [sortby, currentpage, genre])

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
      <Pagelist count={count} pagechange={handlePageChange}>
      
      </Pagelist>
      <Genredropdown genre={genre} handlegenreselect={handlegenreselect} />
    </div>
  )
}









