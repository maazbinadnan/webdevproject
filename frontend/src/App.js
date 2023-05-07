import { Login } from './LoginPage';
import { Movies } from './Movies';
import { Singlemovie } from './singlemoviepage';
import { Moviesearched } from './moviesearchedpage';
import { Reviews } from './Reviews';
import { GetToken } from './token';
import FeaturedPost from './blogs';
import Signup from './signup';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import React from 'react';

function App() {
  const [token, setToken] = React.useState(false)


  React.useEffect(()=>{
    const token = GetToken()
    if(token){
      setToken(true)
    } 
  },[])

  return (
    <Router>
      <div>
        {token ? (
          <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/singlemovie/:moviename" element={<Singlemovie />} />
            <Route path="/moviename" element={<Moviesearched />} />
            <Route path="/blogs" element={<FeaturedPost/>}/>
            <Route path='/reviews' element={<Reviews />} /> 
            <Route path="/signup" element={<Signup />}/>
            <Route path='*' element={<Movies/>} /> 
            
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />}/>
            <Route path="*" element={<Login />} />
            
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;

