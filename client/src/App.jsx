import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import {LoginForm} from "./Components/AuthComponents"
import {NavHeader} from "./Components/NavHeader"
import { NotFound } from './Components/NotFound';
import {Home} from './Components/Home';
import { Footer } from './Components/Footer';
import { MatchLayout } from './Components/Match';
import { ProfileLog } from './Components/ProfileLog';
import './App.css'
import API from "./API/API.mjs"

function App() {
  const [loggedIn, setLoggedIn] = useState(false);  
  const [user, setUser] = useState('');
  const [meme, setMeme] = useState("");
  const [captions, setCaptions] = useState([]);
  const [message, setMessage] = useState('');
  const [roundsRecording,setRoundsRecording] = useState([]) 
  const [score,setScore] = useState(0);
  
  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.username} ! Now you can live a 360˚experience of WDYM!`, type: 'success'});
      setUser(user);
    }catch(err) {
      setMessage({msg: "Failed to Login", type: 'danger'});
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setMessage('');
  };

  useEffect(() => {
    const checkAuth = async () => {
      try{
      const user = await API.getUserInfo(); // we have the user info here
      setLoggedIn(true);
      setUser(user);
      }
      catch(err){
      setMessage({msg: "It seems you are not authenticated, Login if you want to become a Master of Memes!", type: 'danger'});
      }
    };
    checkAuth()
  }, []);

  const handleMeme = async (start=false) =>{
    try {
      const memeround = loggedIn ? await API.getNextMeme(start) : await API.getMeme();
      const cap = await API.getCaptions(memeround);
      setMeme(memeround);
      setCaptions(cap) 
      if (start){
        setRoundsRecording([]);
        setScore(0)
      }
  }
  catch(err){
    console.log(err);
  }
}

  return (
    <Routes>
      <Route element={
        <>
        <NavHeader loggedIn={loggedIn} handleLogout={handleLogout} />
        <Container fluid className='mt-3'>
          <Outlet/>
        </Container>
        <Footer/>
        </>
      }>
        <Route index element={
          <Home handleMeme={handleMeme} message={message} setMessage={setMessage}/>
        } />
        <Route path='/login' element={
          loggedIn ? <Navigate replace to='/'/> : <LoginForm handleLogin={handleLogin} />
        } />

        <Route path='/round/*' element={
          <MatchLayout 
          user={user}
          loggedIn={loggedIn} 
          handleMeme={handleMeme} 
          meme={meme} 
          captions={captions} 
          score={score} 
          setScore={setScore} 
          roundsRecording={roundsRecording} 
          setRoundsRecording={setRoundsRecording}>
          </MatchLayout>
        }/>

        <Route path="/profile" element={
            !loggedIn ? <Navigate replace to='/'/> : <ProfileLog user={user}></ProfileLog>
        }/>
         
        <Route path="*" element={ <NotFound/> } />
   
      </Route>
    </Routes>
  )
}

export default App
