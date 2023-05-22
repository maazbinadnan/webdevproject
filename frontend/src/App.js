import { Login } from './LoginPage';
import { Movies } from './Movies';
import { Singlemovie } from './singlemoviepage';
import { Actorsearched } from './actorsearchedpage';
import { Moviesearched } from './moviesearchedpage';
import { Reviews } from './Reviews';
import { GetToken } from './token';
import FeaturedPost from './blogs';
import Wikistoapprove from './adminwikistoapprove';
import SearchPost from './blogsearchpage';
import { ActorPage } from './Actors';
import { Singleactor } from './SingleActor';
import { Homepage } from './homepage';
import Signup from './signup';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import React from 'react';


function App() {
  const [token, setToken] = React.useState(false);
const [admin, setAdmin] = React.useState(false);
const user = localStorage.getItem('role');

React.useEffect(() => {
  const token = GetToken();
  if (token) {
    setToken(true);
    if (user === 'admin') {
      setAdmin(true);
    }
  }
}, []);

return (
  <Router>
    <div>
      {token && user === 'user' ? (
        <Routes>
          {/* Admin Routes */}
          <Route path="/home" element={<Homepage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/singlemovie/:imdbID" element={<Singlemovie />} />
          <Route path="/movie" element={<Moviesearched />} />
          <Route path="/blogs" element={<FeaturedPost />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/actors" element={<ActorPage />} />
          <Route path="/actors/searchactor" element={<Actorsearched />} />
          <Route path="/actor/:imdbID" element={<Singleactor />} />
          <Route path="/blogs/searchblog" element={<SearchPost />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      ) : token && user === 'admin' ? (
        <Routes>
          {/* Admin Routes */}
          <Route path="/wikistoapprove" element={<Wikistoapprove />} />
          <Route path="/blogs" element={<FeaturedPost />} />
          <Route path="*" element={<FeaturedPost />} />
        </Routes>
      ) : (
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </div>
  </Router>
);
      }
export default App;

