import React, { useEffect, useState } from 'react';
import ThumbsUpIcon from '../assets/images/thumbs-up.png';
import ThumbsDownIcon from '../assets/images/thumb-down.png';
import LikeWhite from '../assets/images/likewhite.png';
import DislikeWhite from '../assets/images/dislikewhite.png';
import LikeIcon from '../assets/images/like.png';
import DislikeIcon from '../assets/images/dislike.png';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function LikesDislikes({props}) {
  const loggedIn = localStorage.getItem("loggedIn"); 
  const [likes, setLikes] = useState(0);
  const [dislikes, setDisLikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [disLikeAction, setDisLikeAction] = useState(null);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState('light');
  //console.log(props);
  let variable = {};
  variable = {
        userID: props.userID,
        answerID: props.answerID
  }

  const getLikes = () => {
    axios.post(`/getlikes`, {
        props
      }).then(res => {
          if(res.status === 200){
            //console.log(res.data);
            setLikes(res.data.length);
            res.data.map((like)=>(
                like.userID === props.userID && setLikeAction('liked')
            ))
          }
      })
      .catch(err => {
          console.log(err);
      });
  }
  const getDislikes = () => {
    axios.post(`/getdislikes`, {
        props
      }).then(res => {
          if(res.status === 200){
            //console.log(res.data.length);
            setDisLikes(res.data.length);
            res.data.map((like)=>(
                like.userID === props.userID && setDisLikeAction('disliked')
            ))
          }
      })
      .catch(err => {
          console.log(err);
      });
  }
  useEffect(()=>{
        getLikes();
        getDislikes();
        setDarkMode(localStorage.getItem("darkMode"));
  },[])

  const onLike = () => {
    if(likeAction === null){
        axios.post(`/uplike`,{variable})
        .then(res => {
            if(res.data.success){
                setLikes(likes+1);
                setLikeAction('liked');
                if(disLikeAction !== null){
                    setDisLikeAction(null);
                    setDisLikes(dislikes-1);
                }
            }else{
                alert("Failed to increase Likes!");
            }
        })
        .catch(err => {
            console.log(err);
        });
    }else{
        axios.post(`/unlike`,{variable})
        .then(res => {
            if(res.data.success){
                setLikes(likes-1);
                setLikeAction(null);
            }else{
                alert("Failed to decrease Likes!");
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
  }

const onDislike = () => {
    if(disLikeAction === null){
        axios.post(`/updislike`,{variable})
        .then(res => {
            if(res.data.success){
                setDisLikes(dislikes+1);
                setDisLikeAction('disliked');
                if(likeAction !== null){
                    setLikeAction(null);
                    setLikes(likes-1);
                    console.log('')
                }
            }else{
                alert("Failed to increase Likes!");
            }
        })
        .catch(err => {
            console.log(err);
        });
    }else{
        axios.post(`/undislike`,{variable})
        .then(res => {
            if(res.data.success){
                setDisLikes(dislikes-1);
                setDisLikeAction(null);
            }else{
                alert("Failed to increase Likes!");
            }
        })
        .catch(err => {
            console.log(err);
        });
        
    }
}
  return (
    <div>
    {loggedIn === 'true'  ?
    <div className='likeContainer'>
    <div
        onClick={onLike}
        className={`like ${likeAction === 'liked' ? "active" : "" }`}
    >
        <span>{likes}</span>
        {likeAction === 'liked' 
        ? 
        <img src={LikeIcon} alt="Liked Blue"/>
        :
        darkMode === 'light' ?
        <img src={ThumbsUpIcon} alt="Like Black"/>
        :
        <img src={LikeWhite} alt="Like White"/>
        }
    </div>
    <div
        className={`dislike ${disLikeAction === 'disliked' ? "active" : "" }`}
        onClick={onDislike}
    >
        <span>{dislikes}</span>
        {disLikeAction === 'disliked' 
        ? 
        <img src={DislikeIcon} alt="Disliked Blue"/>
        :
        darkMode === 'light' ?
        <img src={ThumbsDownIcon} alt="Dislike Black"/>
        :
        <img src={DislikeWhite} alt="Dislike White"/>
        }
    </div>
    </div>  
    :
    <div className='likeContainer'>
    <div
        onClick={() => navigate('/login')}
        className={`like ${likeAction === 'liked' ? "active" : "" }`}
    >
        <span>{likes}</span>
        {likeAction === 'liked' 
        ? 
        <img src={LikeIcon} alt="Liked Blue"/>
        :
        darkMode === 'light' ?
        <img src={ThumbsUpIcon} alt="Like Black"/>
        :
        <img src={LikeWhite} alt="Like White"/>
        }
    </div>
    <div
        className={`dislike ${disLikeAction === 'disliked' ? "active" : "" }`}
        onClick={() => navigate('/login')}
    >
        <span>{dislikes}</span>
        {disLikeAction === 'disliked' 
        ? 
        <img src={DislikeIcon} alt="Disliked"/>
        :
        darkMode === 'light' ?
        <img src={ThumbsDownIcon} alt="Dislike Black"/>
        :
        <img src={DislikeWhite} alt="Dislike White"/>
        }
    </div> 
    </div>
    }
    </div>
  )
}

export default LikesDislikes