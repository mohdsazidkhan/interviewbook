import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from "./pages/Dashboard";
import AddQuestion from "./pages/AddQuestion";
import Questions from "./pages/Questions";
import Category from "./pages/Category";
import AuthorQues from "./pages/AuthorQues";
import EditProfile from "./pages/EditProfile";
import Tagged from "./pages/Tagged";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";

function App() {

  const [loggedIn, setLoggedIn] = useState('');
  
  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
  }, [])

  if(loggedIn === 'true'){
  return (
    <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/allquestions" element={<Questions/>} />
          <Route path="/addquestion" element={<AddQuestion/>} />
          <Route exact path="/" element={<Home/>}/>
          <Route path="/questions/:category" element={<Category/>}/>
          <Route path="/users/:authorID" element={<AuthorQues/>}/>
          <Route path="/editprofile/:userID" element={<EditProfile/>}/>
          <Route path="/profile/:userID" element={<Profile/>}/>
          <Route path="/questions/tagged/:tag" element={<Tagged/>}/>
          <Route path="/publicprofile/:userID/:userName" element={<PublicProfile/>}/>
        </Routes>
    </Router>
  )
  }else{
  return (
    <Router>
        <Routes>
          <Route path="/questions/:category" element={<Category/>}/>
          <Route path="/users/:authorID" element={<AuthorQues/>}/>
          <Route path="/questions/tagged/:tag" element={<Tagged/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>}/>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/publicprofile/:userID/:userName" element={<PublicProfile/>}/>
        </Routes>
    </Router>
  )
  }
}

export default App;
