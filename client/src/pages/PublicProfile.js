import React, { useState, useEffect,useRef } from "react";
import './addquestion.css'
import axios from 'axios';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import Defaultuser from '../assets/images/defaultuser.jpg';
import {MdCalendarViewMonth,MdLocationOn,MdLink} from "react-icons/md";
import { FaTwitterSquare,FaGithubSquare} from "react-icons/fa";
import moment from 'moment';
import { useLocation, Link, useNavigate} from "react-router-dom";
import Close from '@material-ui/icons/Close';
import LikesDislikes from '../components/LikesDislikes';
import JoditEditor from "jodit-react";

function PublicProfile() {
    const locationData = useLocation();
    let userID = {};
    if(locationData.state !== ''){
        userID = locationData.state.userID;
    }else{
        userID = localStorage.getItem("_id");
    }
    const navigate = useNavigate();
    //console.log(userID) 
    const [darkMode, setDarkMode] = useState('light');
    const loggedIn = localStorage.getItem("loggedIn"); 
    const [about, setAbout] = useState('');
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [title, setTitle] = useState('');
    const [wlink, setWLink] = useState('');
    const [tusername, setTUsename] = useState('');
    const [gusername, setGUsername] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [questionID, setQuestionID] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [query, setQuery] = useState('');
    const [tags, setTags] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [ans, setAns] = useState("");
    const [aanswers, setAAnswers] = useState([]);
    const [limit] = useState(3);
    const [skip, setSkip] = useState(0);

    //console.log(aanswers);
    
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
                    setCreatedAt(res.data[0].updatedAt)
                }
            })
            .catch(err => {
                console.log(err);
            });
    },[])

    const editor = useRef(null);

    const config = {
      readonly: false,
      height: '60vh'
    };

    function giveAnswer(id){
      setShowForm(!showForm);
      setQuestionID(id)
    }

    function hideForm(){
      setShowForm(false);
    }

    function onTextChange(e){
      let queryText = e.target.value.toLowerCase();
      //console.log(queryText.length)
      if(queryText.length === 0){
        axios.get(`/getaquestions?authorID=${userID}`).then(res => {
          if(res){
            setQuestions(res.data);
          }
        }).catch(err => {
            console.log(err);
        });
      }else{
        let resQues = questions.filter((e) => {
        let dataFilter = e.query.toLowerCase()
          return dataFilter.indexOf(queryText) !== -1
        })
        setQuestions(resQues);
      }
    }

    function onTextAChange(e){
      let queryText = e.target.value.toLowerCase();
      
      if(queryText.length === 0){
        axios.get(`/getaanswers?userID=${userID}`).then(res => {
          if(res){
            setAAnswers(res.data);
            }
        }).catch(err => {
            console.log(err);
        });
      }else{
        let resAns = aanswers.filter((e) => {
        let dataFilter = e.answer.toLowerCase()
          return dataFilter.indexOf(queryText) !== -1
        })
        setAAnswers(resAns);
      }
    }

    function showAnswers(id,query,tags){
      axios.get(`/getanswers?id=${id}`).then(res => {
        if(res){
          setAnswers(res.data);
          setQuery(query);
          setTags(tags);
          setQuestionID(id);
        }
      }).catch(err => {
          console.log(err);
      });
      setShowAnswer(true);
    }

    function hideAnswers(){
      if(questionID){
        axios.post(`/addview?id=${questionID}`, {
          view : 1
        }).then(res => {
          if(res){
            //toast("View Added Success!");
            getQuestions();
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
      }else{
        toast("Something Went Wrong!!");
      }
      setShowAnswer(false);
    }

    useEffect(() => {
      setDarkMode(localStorage.getItem("darkMode"));
      getQuestions(skip, limit);
      getAAnswers(skip, limit);
    }, [skip, limit])

    const getQuestions = (skip, limit) => {
      axios.get(`/getaquestions?authorID=${userID}&limit=${limit}&skip=${skip}`).then(res => {
          if(res){
            setQuestions(res.data);
          }
      }).catch(err => {
          console.log(err);
      });
    }


    const getAAnswers = (skip, limit) => {
      axios.get(`/getaanswers?userID=${userID}&limit=${limit}&skip=${skip}`).then(res => {
          if(res){
            setAAnswers(res.data);
          }
      }).catch(err => {
          console.log(err);
      });
    }

    const handleSubmit = (e) => {

      e.preventDefault();
      if(ans){
      axios.post(`/addanswer?id=${questionID}`, {
        answer : ans,
        user: name,
        userID: userID
      }).then(res => {
          if(res){
            toast("Answer Added Success!");
            window.location.reload();
          }
      })
      .catch(err => {
          console.log(err);
      });
    }else{
      toast("Pill fill the Textbox!");
    }
  }

  const previousPage = () => {
    setSkip(skip - limit)
  }

  const nextPage = () => {
    setSkip(skip + limit)
  }

  const handleUpdate = (e) => {
    setAns(e);
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
                    <div className="col-sm-12 adminContent addQuestion">
                        <div className="row">
                            <div className="col-sm-12 mt-3">
                                <h3>Profile</h3>
                            </div>
                            <div className="col-sm-2 mt-3">
                                <img className="profilePhoto" src={photo ? require('../../../uploads/'+photo) : Defaultuser } alt={name} width={150}/>
                            </div>
                            <div className="col-sm-10 mt-3">
                                <h3>{name}</h3>
                                <h5>{title}</h5>
                                <label><MdCalendarViewMonth/> Member since {moment(createdAt).fromNow()}</label>
                                <label><MdLocationOn/> {location}</label>
                                <label>
                                    <a target='_blank' rel="noopener noreferrer" href={wlink} className='plink' title={wlink}><MdLink/> {wlink}</a>
                                    <a target='_blank' rel="noopener noreferrer" href={tusername} className='plink ms-2' title={tusername}><FaTwitterSquare/></a>
                                    <a target='_blank' rel="noopener noreferrer" href={gusername} className='plink ms-2' title={gusername}><FaGithubSquare/></a>
                                </label>
                                
                            </div>
                            <div className="col-sm-12 mt-3">
                                <label>About me</label>
                                <label><span dangerouslySetInnerHTML={{__html: about}} /></label>
                            </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className={`homeContainer ${darkMode === 'light' ? 'light' : 'dark' }`}>
                  <div className='container'>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="questions-tab" data-bs-toggle="tab" data-bs-target="#questions" type="button" role="tab" aria-controls="questions" aria-selected="true">Questions</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="answers-tab" data-bs-toggle="tab" data-bs-target="#answers" type="button" role="tab" aria-controls="answers" aria-selected="false">Answers</button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="questions" role="tabpanel" aria-labelledby="questions-tab">
                      <div className='searchFilter'> 
                        <h4 className={`totalQues  ${darkMode === 'light' ? 'light' : 'dark' }`}>Total Questions: {questions.length}</h4>
                        <div className='d-flex justify-content-center'> 
                          <button className='btn btn-primary btn-sm mt-2' onClick={previousPage}> Previous Page </button>
                          <button className='btn btn-primary btn-sm mt-2 ms-2' onClick={nextPage}> Next Page </button> 
                        </div>
                        <input placeholder="Enter Question..." onChange={onTextChange}/>
                    </div> 
                    {questions.length > 0 ?
                      questions.map((question, index)=>{
                          return(
                              <div className='homequery shadow-sm' key={index}>
                              <h5>Question {index+1}</h5>
                              <div dangerouslySetInnerHTML={{__html: question.query}} />
                              <div className='tags my-2'>
                              {question.tags.map((tag, index)=>{
                                  return(
                                  <Link key={index} to={`/questions/tagged/${tag}`} className='tag' state={{tag: tag}}>{tag}</Link>
                                  )
                              })
                              }
                              </div>
                              <div className='footer'>Asked by <span className='link'>{question.author}</span> {moment(question.createdAt).fromNow()} in <Link to={`/questions/${question.categoryName.toLowerCase().replace(/\s+/g, '-')}`} className='link' state={{categoryID:question.categoryID}}>{question.categoryName}</Link>  <span className='views'>Viewed: {question.views ? question.views : 0} times</span></div>
                              {loggedIn === 'true' ? <div className='btn btn-primary btn-sm mt-2 me-2' onClick={() => giveAnswer(question._id)}>Give Answer</div> : <div className='btn btn-primary btn-sm mt-2 me-2' onClick={() => navigate('/login')}>Give Answer</div> }
                              <div className='btn btn-primary btn-sm mt-2' onClick={() => showAnswers(question._id, question.query, question.tags)}>Show Answers</div>
                              </div>
                          )
                      })
                      :
                      <div className='notFound'>No Question Found</div>
                      }
                      </div>
                      <div className={`answerText ${showAnswer === true ? "active" : "" }`}>
                          <div className='closeBtn' onClick={() => hideAnswers()}><Close/></div>
                          <div className='container py-2'>
                          <h4 dangerouslySetInnerHTML={{__html: query}} /> 
                          <div className='tags mt-2'>
                              {tags.map((tag, index)=>{
                              return(
                                  <Link key={index} to={`/questions/tagged/${tag}`} className='tag' state={{tag: tag}}>{tag}</Link>
                              )
                              })
                              }
                          </div> 
                          <hr/>    
                          {answers.length > 0 ?   
                          answers.map((answer, index)=>{
                          return(
                              <div key={index} className="mb-3">
                              <h6>Answer: {index+1}</h6>
                              <div className="answer" dangerouslySetInnerHTML={{__html: answer.answer}} />
                              <div className="ansNo"><strong>Answered by <Link className='link' to={`/publicprofile/${answer.userID}/${answer.user.toLowerCase().replace(/\s+/g, '-')}`} state={{userID:answer.userID}}>{answer.user}</Link> {moment(answer.createdAt).format("DD MMM, YYYY")} at {moment(answer.createdAt).format("hh:mm A")}</strong></div>
                              <LikesDislikes props={{userID: userID, answerID: answer._id}}/>
                              <hr/>
                              </div>
                          )
                          })
                          :
                          <div className={`notFound  ${darkMode === 'light' ? 'light' : 'dark' }`}>No Answer Found!</div>
                          }
                          </div>
                      </div>
                      
                      <div className={`answerBox ${showForm === true ? "active" : "" }`}>
                          <form onSubmit={handleSubmit} encType='multipart/form-data'>
                          <div className='closeBtn' onClick={() => hideForm()}><Close/></div>
                          <div className='answerEditor'>
                              <JoditEditor
                                  ref={editor}
                                  value={ans.answer}
                                  config={config}
                                  onBlur={handleUpdate}
                              />
                              <input type='hidden' value={ans.answer} name='answer'/>
                          </div>
                          <div className='float-end m-2'>
                              <input 
                                  className='btn btn-primary'
                                  type="submit"
                                  value={'Submit'}
                              />
                        </div>
                      </form>
                      </div>
                      <div className="tab-pane fade" id="answers" role="tabpanel" aria-labelledby="answers-tab">
                      <div className='searchFilter'> 
                        <h4 className={`totalQues  ${darkMode === 'light' ? 'light' : 'dark' }`}>Total Answers: {aanswers.length}</h4>
                        <div className='d-flex justify-content-center'> 
                          <button className='btn btn-primary btn-sm mt-2' onClick={previousPage}> Previous Page </button>
                          <button className='btn btn-primary btn-sm mt-2 ms-2' onClick={nextPage}> Next Page </button> 
                        </div>
                        <input placeholder="Enter Answer..." onChange={onTextAChange}/>
                      </div> 
                      {aanswers.length > 0 ?
                      aanswers.map((aanswer, index)=>{
                          return(
                              <div className='homequery shadow-sm userans' key={index}>
                                <h5>Question {index+1}</h5>
                                <div className="mb-2" dangerouslySetInnerHTML={{__html: aanswer.query}} />
                                <h5>Answer {index+1}</h5>
                                <p className="answer" dangerouslySetInnerHTML={{__html: aanswer.answer}} />
                              </div>
                          )
                      })
                      :
                      <div className="notFound">No Answer Found!</div>
                      }
                      </div>
                    </div>
                  </div>
              </div>
            </div>
    )
}

export default PublicProfile
