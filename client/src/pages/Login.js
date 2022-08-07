import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import '../pages/Auth.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState('light');

  //console.log(email);
  const loginForm = () => {
      if(email === '' && password === ''){
        alert('Please Fill Input Fields')
      }else{
        axios.post('/login', 
        {
          email: email,
          password: password
        }).then(res =>{
          console.log(res);
          if(res.data){
              localStorage.setItem("loggedIn", true)
              localStorage.setItem("_id", res.data._id)
              localStorage.setItem("name", res.data.name)
              localStorage.setItem("email", res.data.email)
              localStorage.setItem("photo", res.data.photo)
              localStorage.setItem("location", res.data.location)
              localStorage.setItem("title", res.data.title)
              localStorage.setItem("wlink", res.data.wlink)
              localStorage.setItem("tusername", res.data.tusername)
              localStorage.setItem("gusername", res.data.gusername)
              localStorage.setItem("about", res.data.about)
              localStorage.setItem("token", res.data.token)
              if(res.status === 200){
                  window.location.href = "/dashboard";
                  toast('LoggedIn Successfull!');
              }else{
                  window.location.href = "/";
              }
          }
        })
      }
  }
  useEffect(()=>{
    setDarkMode(localStorage.getItem("darkMode"));
  },[])
  const inputsHandler = (e) =>{
    const {name, value} = e.target;
    if(name === 'email'){
      setEmail(value);
    }else if(name === 'password'){
      setPassword(value);
    }
  }

  return (
    <div className={`authContainer ${darkMode === 'light' ? 'light' : 'dark' }`}>
      <Header/>
      <ToastContainer 
       position="top-right"
       autoClose={10000}
       newestOnTop={true}
       closeOnClick
       pauseOnFocusLoss
       draggable
       pauseOnHover />
      <div className='authForm px-5 shadow'>
      <h2 className='mb-5'>Login</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email ID</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" name='email' value={email} required onChange={inputsHandler}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name='password' value={password} required onChange={inputsHandler}/>
      </Form.Group>
      <div className="mx-5">
        <Button className='w-100' variant="primary" type="submit" onClick={loginForm}>Login</Button>
        </div>
      <div className="mt-3">Not Registered</div>
      <div className="mt-3">
        <Link to="/register" className='btn btn-outline-primary'>Register</Link>
      </div>
    </div>
    </div>
  )
}

export default Login