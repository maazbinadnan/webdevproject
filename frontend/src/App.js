import {Login} from './LoginPage';
import { Movies } from './Movies';
import { Singlemovie } from './singlemoviepage';
import { Moviesearched } from './moviesearchedpage';
import { Reviews } from './Reviews';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/singlemovie/:moviename" element={<Singlemovie/>} />
            <Route path="/moviename" element={<Moviesearched/>} />
            <Route path='/reviews' element={<Reviews/>}/>
            </Routes>
        </div>
      </Router>
   
  );
}


export default App;
