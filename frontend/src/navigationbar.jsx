import "./navbar.css"
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, InputBase, styled, alpha, Autocomplete,TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
export function Navbar() {
    const [moviename,Setmoviename]= useState("")
    const navigate=useNavigate();
    const handlesearch = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (moviename.trim() !== '') { // check if search bar is not empty
            navigate(`/moviename?moviename=${moviename}`);
            Setmoviename('');
          }
        }
      };
      
    return (

        <div>
            <AppBar position="fixed" sx={{ height: '9%', backgroundColor: '#360538' }}>
                <Toolbar>
                    <div>
                        <Link className="home">
                            Home
                        </Link>
                    </div>
                    <div>
                        <Link className="movies" to={'/movies'}>
                            Movies
                        </Link>
                    </div>
                    <div>
                        <Link className="blogs">
                            Blogs
                        </Link>
                    </div>
                    <div>
                        <Link className="reviews" to={'/reviews'}>
                            Reviews
                        </Link>
                    </div>
                    
                    <Search sx={{ left: '68%', top: '2%' }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search for movies"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(event)=>Setmoviename(event.target.value)}
                            onKeyDown={handlesearch}
                        />
                        
                    </Search>
                    
                    <div className="login">
                        <Button onClick={handlesearch}  variant="filled" sx={{ color: 'white', backgroundColor: 'black', border: '2px solid black' }}>
                            Login
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
//href="http://localhost:3000/login"