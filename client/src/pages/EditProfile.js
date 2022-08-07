import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import './addquestion.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Defaultuser from '../assets/images/defaultuser.jpg';


function EditProfile() {

    const userID = localStorage.getItem("_id");
    const [darkMode, setDarkMode] = useState('light');
    const [about, setAbout] = useState('');
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [title, setTitle] = useState('');
    const [wlink, setWLink] = useState('');
    const [tusername, setTUsename] = useState('');
    const [gusername, setGUsername] = useState('');
    
    const editor = useRef(null);

    const config = {
        readonly: false,
        height: 200
    };

    const navigate = useNavigate();

    useEffect(()=>{
        setDarkMode(localStorage.getItem("darkMode"));
        axios.get(`/getuser?userID=${userID}`)
            .then(res => {
                if(res.data){
                    //console.log(res.data)
                    setName(res.data[0].name);
                    setPhoto(res.data[0].photo);
                    setLocation(res.data[0].location);
                    setAbout(res.data[0].about);
                    setTitle(res.data[0].title);
                    setWLink(res.data[0].wlink);
                    setTUsename(res.data[0].tusername);
                    setGUsername(res.data[0].gusername);
                }
            })
            .catch(err => {
                console.log(err);
            });
    },[])

    const handleSubmit = (e) => {

            e.preventDefault();

            const formData = new FormData();

            formData.append('photo', photo);
            formData.append('name', name);
            formData.append('title', title);
            formData.append('location', location);
            formData.append('about', about);
            formData.append('wlink', wlink);
            formData.append('tusername', tusername);
            formData.append('gusername', gusername);

            if(formData){
                axios.post(`/editprofile?userID=${userID}`, formData)
                .then(res => {
                        if(res.data){
                            //console.log(res.data)
                            toast("Profile Edit Success!");
                            navigate('/dashboard');
                            localStorage.setItem("name", res.data.name);
                            localStorage.setItem("photo", res.data.photo);
                            localStorage.setItem("location", res.data.location);
                            localStorage.setItem("title", res.data.title);
                            localStorage.setItem("wlink", res.data.wlink);
                            localStorage.setItem("tusername", res.data.tusername);
                            localStorage.setItem("gusername", res.data.gusername);
                            localStorage.setItem("about", res.data.about);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                });
            }
        else{
            toast("Pill Select a Photo!");
        }
    }

    const handleName= (e) => {
        setName(e.target.value);
    }

    const handleTitle= (e) => {
        setTitle(e.target.value);
    }

    const handleWebsiteLink= (e) => {
        setWLink(e.target.value);
    }

    const handleTUsername= (e) => {
        setTUsename(e.target.value);
    }

    const handleGusername= (e) => {
        setGUsername(e.target.value);
    }

    const handleLocation= (e) => {
        setLocation(e.target.value);
    }

    const handlePhoto = (e) => {
        if(e.target.files[0] !== ''){
            setPhoto(e.target.files[0]);
        }else{
            toast('Please Select a file')
        }
    }

    const handleUpdate = (e) => {
        setAbout(e);
    };

    return (
        <div className={`dashboardContainer ${darkMode === 'light' ? 'light' : 'dark' }`}>
            <Header/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="container">
                <div className="row">
                    <div className="col-sm-2 adminSidebar">
                        <Sidebar/>
                    </div>
                    <div className="col-sm-10 adminContent addQuestion">
                        <div className="row">
                            <div className="col-sm-12 mt-3">
                                <h3>Edit your profile</h3>
                            </div>
                            <div className="col-sm-12 mt-3">
                                <label>Profile Picture</label>
                                <img className="profilePhoto" src={Defaultuser} alt={name} width={150}/>
                            </div>
                            <div className="col-sm-12 mt-3">
                                <label>Upload Picture</label>
                                <input 
                                    type="file" 
                                    placeholder="Upload a Photo"
                                    accept=".png, .jpg, .jpeg"
                                    name="photo"
                                    className='form-control mb-2'
                                    onChange={handlePhoto}
                                />
                            </div>
                            <div className="col-sm-12 mt-3">
                                <label>Display Name</label>
                                <input 
                                    type="text"
                                    placeholder="Enter Your Name"
                                    name="name"
                                    className='form-control mb-2'
                                    value={name}
                                    onChange={handleName}
                                />
                            </div>
                            <div className="col-sm-12 mt-3">
                                <label>Location</label>
                                <input 
                                    type="text"
                                    placeholder="Enter Your Location"
                                    name="location"
                                    className='form-control mb-2'
                                    value={location}
                                    onChange={handleLocation}
                                />
                            </div>
                            <div className="col-sm-12 mt-3">
                                <label>Title</label>
                                <input 
                                    type="text"
                                    placeholder="Enter Your Title"
                                    name="title"
                                    className='form-control mb-2'
                                    value={title}
                                    onChange={handleTitle}
                                />
                            </div>
                            <div className="col-sm-4 mt-3">
                                <label>Website Link</label>
                                <input 
                                    type="text"
                                    placeholder="Enter Your Title"
                                    name="wlink"
                                    className='form-control mb-2'
                                    value={wlink}
                                    onChange={handleWebsiteLink}
                                />
                            </div>
                            <div className="col-sm-4 mt-3">
                                <label>Twitter Profile Link</label>
                                <input 
                                    type="text"
                                    placeholder="Enter Your Title"
                                    name="tusername"
                                    className='form-control mb-2'
                                    value={tusername}
                                    onChange={handleTUsername}
                                />
                            </div>
                            <div className="col-sm-4 mt-3">
                                <label>Github Profile Link</label>
                                <input 
                                    type="text"
                                    placeholder="Enter Your Title"
                                    name="gusername"
                                    className='form-control mb-2'
                                    value={gusername}
                                    onChange={handleGusername}
                                />
                            </div>
                            <div>
                                <label>About me</label>
                                <JoditEditor
                                    ref={editor}
                                    value={about}
                                    config={config}
                                    onBlur={handleUpdate}
                                />
                                <input type='hidden' value={about} name='about'/>
                            </div>
                            <div className="float-end mt-3 mb-5">
                                <button onClick={handleSubmit} 
                                    className='btn btn-primary' 
                                >Submit</button>
                            </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
    )
}

export default EditProfile
