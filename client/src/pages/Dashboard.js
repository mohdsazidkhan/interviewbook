import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';
import './dashboard.css'

function Dashboard() {
  const [loggedIn, setLoggedIn] = useState('');
  const [darkMode, setDarkMode] = useState('light');
  
  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
    setDarkMode(localStorage.getItem("darkMode"));
  }, [])
  if(loggedIn === 'true'){
    return (
        <div className={`dashboardContainer ${darkMode === 'light' ? 'light' : 'dark' }`}>
        <Header/>
        <div className="container">
                <div className="row">
                    <div className="col-sm-2 adminSidebar">
                        <Sidebar/>
                    </div>
                    <div className="col-sm-10 adminContent p-3">
                      <Link className='btn btn-primary' to="/addquestion">Add Your Question</Link>
                    </div> 
                </div>
            </div>
        </div>
    )
  }else{
    return (
        <div className="empltyContainer">
            <p>Please Login First</p>
        </div>
    )
  }
}

export default Dashboard