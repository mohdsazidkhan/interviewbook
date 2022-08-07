import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import './addquestion.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


function AddQuestion() {

    const author = localStorage.getItem("name"); 
    const authorID = localStorage.getItem("_id");
    const [categoryName, setCategoryName] = useState('');
    const [darkMode, setDarkMode] = useState('light');

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
    
    const navigate = useNavigate();

    const [question, setQuestion] = useState(
        {
            query: '',
            categoryID: '',
            categoryName: '',
            author: '',
            authorID: '',
            tags: tags
        }
    );

    useEffect(()=>{
        setDarkMode(localStorage.getItem("darkMode"));
    },[])


    const handleSubmit = (e) => {

        e.preventDefault();

        if(question.query && question.categoryID && categoryName && author && authorID && tags){
            axios.post('/addquestion', {
                query : question.query,
                categoryID : question.categoryID,
                categoryName: categoryName,
                author: author,
                authorID: authorID,
                tags: tags
            }).then(res => {
                    if(res){
                        toast("Question Added Success!");
                        navigate('/allquestions')
                    }
                })
                .catch(err => {
                    console.log(err);
            });
        }else{
            toast("Pill fill the Textbox!");
        }
    }

    const handleCategory = (e) => {
        setCategoryName(e.target.selectedOptions[0].text);
        setQuestion({...question, categoryID: e.target.value});
    }

    const handleUpdate = (e) => {
        setQuestion({...question, query: e});
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
                                <h3>Add New Question</h3>
                            </div>
                            <div className="col-sm-12">
                            <label>Select Category</label>
                            <div className="mb-2">
                                <select value={question.categoryID} className='form-control' name="category" onChange={handleCategory}>
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => {
                                    return(
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
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
                            <div>
                            <label>Enter Question</label>
                            <JoditEditor
                                ref={editor}
                                value={question.query}
                                config={config}
                                onBlur={handleUpdate}
                            />
                            <input type='hidden' value={question.query} name='query'/>
                            </div>
                            <div className="float-end mt-3 mb-5">
                                <button className='btn btn-primary' onClick={handleSubmit}>Submit</button> 
                            </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default AddQuestion
