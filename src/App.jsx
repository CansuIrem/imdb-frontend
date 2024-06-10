import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import MovieDetail from './components/movie/MovieDetail';
import Login from './components/login/Login';
import { UserContext } from './components/UserContext';
import MovieCard from './components/home/MovieCard';

function App() {
  const [userEmail, setUserEmail] = useState('');

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      <Header />
      <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signin' element={<SignUp />} />
          <Route exact path='/movie/:id' element={<MovieDetail />} /> {/* Dinamik route */}
          <Route exact path="/login" element={<Login setUserEmail={setUserEmail} />} />
          <Route path="/movieCard" element={<MovieCard/>}/>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
