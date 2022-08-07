import React,{useState,useEffect,useRef} from 'react'
import './questions.css'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import JoditEditor from "jodit-react";

function Questions() {
    
    const authorID = localStorage.getItem("_id");
    const [darkMode, setDarkMode] = useState('light');
    const [questions, setQuestions] = useState([]);
    const [query, setQuery] = useState('');
    const [questionID, setQuestionID] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [categoryName, setCategoryName] = useState('');


    const editor = useRef(null);

    const config = {
        readonly: false,
        height: 400
    };

    let tagInput = useRef(null);

    const [tags, setTags] = React.useState([]);

    console.log(tags);
      
    const removeTag = (i) => {
    const newTags = [ ...tags ];
    newTags.splice(i, 1);

    // Call the defined function setTags which will replace tags with the new value.
    setTags(newTags);
    };

    

    const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
        if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
        }
        setTags([...tags, val]);
        tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
        removeTag(tags.length - 1);
    }
    };
    //console.log(questions);

    const handleUpdate = (e) => {
        setQuery(e);
    };

    const categories = [
        {
            'id' : 1,
            'name': 'JAVASCRIPT'
        },
        {
            'id' : 2,
            'name': 'JQUERY'
        },
        {
            'id' : 3,
            'name': 'HTML'
        },
        {
            'id' : 4,
            'name': 'CSS'
        },
        {
            'id' : 5,
            'name': 'REACT JS'
        },
        {
            'id' : 6,
            'name': 'REACT NATIVE'
        },
        {
            'id' : 7,
            'name': 'NODE JS'
        },
        {
            'id' : 8,
            'name': 'NEXT JS'
        },
        {
            'id' : 9,
            'name': 'ANGULAR JS'
        },
        {
            'id' : 10,
            'name': 'VUE JS'
        },
        {
            'id' : 11,
            'name': 'PYTHON'
        },
        {
            'id' : 12,
            'name': 'MONGODB'
        },
        {
            'id' : 14,
            'name': 'MYSQL'
        },
        {
            'id' : 15,
            'name': 'JAVA'
        },
        {
            'id' : 16,
            'name': 'DOT NET'
        },
        {
            'id' : 17,
            'name': 'CORE PHP'
        },
        {
            'id' : 18,
            'name': 'LARAVEL'
        },
        {
            'id' : 19,
            'name': 'WORDPRESS'
        },
        {
            'id' : 20,
            'name': 'MAGENTO'
        },
        {
            'id' : 21,
            'name': 'SHOPIFY'
        },
        {
            'id' : 22,
            'name': 'JOOMLA'
        },
        {
            'id' : 23,
            'name': 'OPENCART'
        },
        {
            'id' : 24,
            'name': 'C'
        },
        {
            'id' : 25,
            'name': 'C++'
        },
        {
            'id' : 26,
            'name': 'CODIEGNITER'
        },
        {
            'id' : 27,
            'name': 'SYMFONY'
        },
        {
            'id' : 28,
            'name': 'CAKEPHP'
        },
        {
            'id' : 29,
            'name': 'BOOTSTRAP'
        },
        {
            'id' : 30,
            'name': 'ANDROID'
        },
        {
            'id' : 31,
            'name': 'OTHER'
        }
    ]

    useEffect(() => {
        getQuestions();
        setDarkMode(localStorage.getItem("darkMode"));
    }, [])

    const getQuestions = () => {
        axios.get(`/getquestions?authorID=${authorID}`).then(res => {
            if(res){
                setQuestions(res.data);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const handleName = question => (e) => {
        setQuery(question.query);
        setQuestionID(question.id);
        setCategoryID(question.categoryID);
        setCategoryName(question.categoryName);
        setTags(question.tags);
    }

    const updateQuestion = (e) => {
        e.preventDefault();
        axios.post('/updatequestion?questionID='+questionID, {
            query, 
            categoryName,
            categoryID,
            tags
        }).then(res => {
            if(res){
                window.location.reload();
                toast('Question Update Successfully!')
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const deleteQuestion = (e) => {
        e.preventDefault();
       // console.log(questionID)
        axios.delete('/deletequestion?questionID='+questionID).then(res => {
            if(res){
                window.location.reload()
                toast('Question Deleted Successfully!')
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleCategory = (e) => {
        setCategoryName(e.target.selectedOptions[0].text);
        setCategoryID(e.target.value);
    }

    if(questions){
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
                    <div className="col-sm-10 adminContent questions">
                    <div className="row">
                            <div className="col-sm-12">
                                <h1>Total Questions {questions.length}</h1>
                            </div>
                            <div className="col-sm-12">
                                <div className="table-responsive">
                                    <table className="adminTable">
                                        <thead>
                                            <th>#</th>
                                            <th>Question</th>
                                            <th>Category</th>
                                        </thead>
                                        <tbody>
                                        {questions.map((question, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}.</td>
                                                <td><div className='query' dangerouslySetInnerHTML={{__html: question.query}} /></td>
                                                <td>{question.categoryName}</td>
                                                <td> 
                                                    <button type="button" onClick={handleName({
                                                        categoryName: question.categoryName, 
                                                        categoryID: question.categoryID,
                                                        id: question._id, 
                                                        query: question.query,
                                                        tags: question.tags
                                                    })} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                                                </td>
                                                <td>
                                                    <button type="button" onClick={handleName({id: question._id})} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                                <div className='col-sm-12'>
                            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="editModalLabel">Edit Question</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                        <form className="row" encType='multipart/form-data'>
                                            
                                            <div className="col-sm-12">
                                                <label>Select Category</label>
                                                <select value={categoryID} className='form-control' name="category" onChange={handleCategory}>
                                                <option value="">Select Category</option>
                                                {categories.map((category) => {
                                                return(
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                    )
                                                })}
                                                </select>
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <label>Add Tags</label>
                                                <div className="input-tag mb-2">
                                                    <ul className="input-tag__tags">
                                                        { tags.map((tag, i) => (
                                                        <li key={i}>
                                                            {tag}
                                                            <button type="button" onClick={() => { removeTag(i); }}>+</button>
                                                        </li>
                                                        ))}
                                                        <li className="input-tag__tags__input"><input type="text" onKeyDown={inputKeyDown} ref={c => { tagInput = c; }} /></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                            <label>Enter Question</label>
                                            <JoditEditor
                                                ref={editor}
                                                value={query}
                                                config={config}
                                                onBlur={handleUpdate}
                                            />
                                            <input type='hidden' value={query} name='query'/>
                                            </div>
                                            <input type='hidden' value={questionID} name="questionID"/>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                            <button type="button" onClick={updateQuestion} className="btn btn-primary">Save Changes</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="deleteModalLabel">Delete Question</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                        <form className="row" encType='multipart/form-data'>
                                            <div className="col-sm-12">
                                                <h4>Are you sure to delete this Question?</h4>
                                                <input type='hidden' value={questionID} name="questionID"/>
                                            </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                            <button type="button" onClick={deleteQuestion} className="btn btn-primary">Delete</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
    )}else{
        return (
            <div className="admin">
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2 adminSidebar">
                            <Sidebar/>
                        </div>
                        <div className="col-sm-10 adminContent questions">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h1>Questions</h1>
                                </div>
                                <div className="col-sm-12">
                                    <h5>No Question Found!</h5>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Questions
