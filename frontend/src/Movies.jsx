import React, { useEffect, useState } from "react";
import "./Images.css";
import { Navbar } from "./navigationbar";
import { Link } from "react-router-dom";
import { Grid, ToggleButtonGroup, ToggleButton, Select, FormControl, InputLabel, MenuItem, Rating,PaginationItem } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios";
import StarBorderIcon from '@mui/icons-material/StarBorder';
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
        <Pagination
          count={count}
          onChange={pagechange}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: '#9612dd',
                  color: 'black',
                },
              }}
            />
          )}
        />
      </Stack>
    </div>
  );
}


function Genredropdown({ genre, handlegenreselect }) {
  return (
    <div className="genredropdown">
    
      <FormControl fullWidth variant="outlined" sx={{backgroundColor:'white', borderRadius:'5px'}} >
      <InputLabel sx={{position:'absolute', bottom:'35%', fontWeight:'bold', fontFamily:'Blackpast Demo'}}>Genre</InputLabel>
      <Select
        value={genre}
        onChange={handlegenreselect}
        size="small"
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
export function Movies() {
  const [movies, setMovies] = React.useState([]);
  const [sortby, setSortby] = React.useState('');
  const [count, setCount] = React.useState(1);
  const [currentpage, Setcurrentpage] = useState(1);
  
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
  }, [sortby, currentpage, genre])

  return (
    <div className="background" >
      <div style={{ position: 'absolute', height: '1.5px', top: '19%', backgroundColor: 'white', left: '8.8%', right: '8.65%' }}>

      </div>
      <p style={{
        position: 'absolute', top: '12.5%', left: '8.8%', right: '8.65%', fontSize: '20px', color: 'white', fontWeight: 'bold',fontFamily:'Blackpast Demo'
      }}>Sort By:</p>
        <p style={{
        position: 'absolute', top: '12.5%', left: '39.25%', fontSize: '20px', color: 'white', fontWeight: 'bold', fontFamily:'Blackpast Demo'
      }}>Select:</p>
      <div className="sort">
        <ToggleButtonGroup
          sx={{ backgroundColor: '#9612dd', borderRadius: '3px' }} size="small"
          exclusive

          onChange={(event, newSortBy) => setSortby(newSortBy)}
          aria-label="text alignment"
        >

          <ToggleButton
            value="movieName"
            sx={{
              bgcolor: sortby === "movieName" ? "#9612dd" : "white",
              color: sortby === "movieName" ? "white" : "inherit",
              borderRight: '2.5px solid #9612dd',
              fontSize:'16px',
              fontFamily:'Blackpast Demo'

            }}
          >
            <b>Movie Name</b>
          </ToggleButton>
          <ToggleButton
            value="releaseDate"
            sx={{
              bgcolor: sortby === "releaseDate" ? "#9612dd" : "white",
              color: sortby === "releaseDate" ? "white" : "inherit",
              borderLeft: '2.5px solid #9612dd',
              borderRight: '2.5px solid #9612dd',
              fontSize:'16px',
              fontFamily:'Blackpast Demo'
            }}
          >
            <b>Release Date</b>
          </ToggleButton>
          <ToggleButton
            value=""
            sx={{
              bgcolor: sortby === "" ? "#9612dd" : "white",
              color: sortby === "" ? "white" : "inherit",
              borderLeft: '2.5px solid #9612dd',
              fontSize:'16px',
              fontFamily:'Blackpast Demo'
}}
          >
            <b >None</b>
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









