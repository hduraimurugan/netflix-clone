import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar'
import TvShows from './pages/tv_shows/TvShows'
import Movies from './pages/movies/Movies'
import PlayerTv from './pages/Player/PlayerTv'

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user logged in");
        navigate('/');
      } else {
        console.log("user not logged in");
        navigate('/login');
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  return (
    <>
     <ToastContainer hideProgressBar={true} position="top-center" autoClose={3000} />
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path='/playerTv/:id' element={<PlayerTv />} />
        <Route path='/tv' element={<TvShows />} />
        <Route path='/movies' element={<Movies />} />
      </Routes>
    </>
  )
}

export default App
