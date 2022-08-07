import React, {useState, useEffect} from 'react';
import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom';
import './Header.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LightIcon from '../assets/images/lightmode.png';
import DarkIcon from '../assets/images/darkmode.png';

function Header() {

  const [loggedIn, setLoggedIn] = useState('');
  const [darkMode, setDarkMode] = useState('light');
  
  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
    setDarkMode(localStorage.getItem("darkMode"));
  }, [])

  function signOut(){
    localStorage.clear()
    window.location.href = "/";
    toast('Logged Out Successfull!');
  }
  const lightDarkMode = () => {
    if(darkMode === 'light'){
      setDarkMode('dark');
      localStorage.setItem("darkMode", 'dark');
      window.location.reload()
    }else{
      setDarkMode('light')
      localStorage.setItem("darkMode", 'light');
      window.location.reload()
    }
  }

  return (
    <Navbar expand="lg" className={`fixed-top shadow-sm  ${darkMode === 'light' ? 'light' : 'dark' }`}>
      <Container>
        <Link className='logo' to="/">InterviewBook</Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
          >
            <Link to="/">Home</Link>
            {loggedIn === 'true' ?
            <div>
              <Link to="/dashboard">Dashboard</Link>
              <Link to='/' onClick={signOut}>Logout</Link>
            </div>
            :
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
            }
            <div
              onClick={lightDarkMode}
              className="lightDarkMode"
            >
              {darkMode === 'light' 
              ? 
              <img src={LightIcon} alt="Light Mode"/>
              :
              <img src={DarkIcon} alt="Dark Mode"/>
              }
            </div>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer 
      position="top-right"
      autoClose={10000}
      newestOnTop={true}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover />
    </Navbar>
  )
}

export default Header