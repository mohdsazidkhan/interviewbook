import React,{useEffect,useState}  from 'react'
import './sidebar.css'
import {NavLink} from 'react-router-dom';
import {MdDashboard,MdSubject,MdPeople} from "react-icons/md";

function Sidebar() {
  const [userID, setUserID] = useState('');
  useEffect(() => {
    setUserID(localStorage.getItem("_id"));
  }, []) 
    return (
        <div className="sidebar">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/dashboard">
                    <MdDashboard/>
                    Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to={`/profile/${userID}`}>
                    <MdPeople/>
                    Profile
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle">
                    <MdSubject/>
                    Questions
                </div>
                <div className="dropdown-menu show">
                  <NavLink className="dropdown-item" activeclassname="active" to="/allquestions">Questions</NavLink>
                  <NavLink className="dropdown-item" activeclassname="active" to="/addquestion">Add New Question</NavLink>
                </div>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to={`/editprofile/${userID}`}>
                    <MdPeople/>
                    Edit Profile
                </NavLink>
              </li>
            </ul>
        </div>
    )
}

export default Sidebar
