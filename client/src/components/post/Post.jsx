import React, { useContext } from 'react'
import "./post.css";
import {MoreVert} from "@mui/icons-material";
// import {Users} from "../../dummyData";
import { useState,useEffect } from 'react';
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';




export default function Post({post}) {
    // console.log(post);
    const [like,setLike] = useState(post.likes.length);
    const [isLiked,setIsLiked] = useState(false);
    const [user,setUser] = useState({});
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser}=useContext(AuthContext);

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes]);


    useEffect(()=>{
        const fetchUser = async () =>{
        //   const res = await axios.get(`/users/${post.userId}`)
          const res = await axios.get(`/users?userId=${post.userId}`);
              console.log(res);
          setUser(res.data);
    
        };
        fetchUser();
        // console.log("feed rendered");
      },[post.userId]);//renders continously//[]means render only once
    


    const likeHandle = ()=>{
        try{
            axios.put("/posts/"+post._id+"/like",{ userId: currentUser._id});
        }
        catch(err){

        }
        // setLike((isLiked?like-1:like+1));
        // setIsLiked(!isLiked);
        setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
        setIsLiked((prevIsLiked) => !prevIsLiked);
    }

    // *************************************

    useEffect(() => {
        const postElement = document.querySelector(`#post-${post._id}`);
        return () => {
          // Cleanup function to remove the liked class when the component unmounts
          postElement && postElement.classList.remove('liked');
        };
      }, [post._id]);
    
      useEffect(() => {
        const postElement = document.querySelector(`#post-${post._id}`);
        // Add or remove the liked class based on the isLiked state
        postElement && isLiked ? postElement.classList.add('liked') : postElement && postElement.classList.remove('liked');
      }, [isLiked, post._id]);
    

  return (
    <div className='post'>
        <div className={`postgif ${isLiked ? 'liked' : 'gifremove'}`} id={`post-${post._id}`}>
            <div className='postwrapper' >
                <div className='posttop'>
                    <div className='posttopleft'>
                        {/* <img className='postprofileimg' src={Users.filter((u)=>u.id === post.userId)[0].profilePicture} alt="demo post 1" ></img> */}
                        <img className='postprofileimg' src={user.profilePicture? PF+"posts/"+user.profilePicture : PF+"icons/noavatar.png"} alt="demo post 1" ></img>
                        <Link to={`/profile/${user.username}/`}>
                        {/* <span className='postu((sername'>{Users.filteru)=>u.id === post.userId)[0].username}</span> */}

                        </Link>
                        <span className='postusername'>{user.username}</span>
                        {/* <span className='postdate'>{post.date}</span> */}
                        <span className='postdate'>{format(post.createdAt)}</span>
                    </div>
                    {/* <div className='posttopright'></div>
                    <MoreVert/> */}
                </div>
                <div className='postcentre'>
                    <span className='posttext'>{post.desc}</span>
                    <img className='postimg' src={PF+post.img} alt='post'></img>
                </div>
                <div className='postbottom'>
                    <div className='postbottomleft'>
                        <img className='likebutton' src={`${PF}icons/like_button.png`} alt='like button' onClick={likeHandle} ></img>
                        {/* <img className='commentbutton' src={`${PF}icons/comment_button.png`} alt='comment button'></img> */}
                        <span className='postlikecounter'>{like} people like it</span>
                    </div>
                    <div className='postbottomright'>
                    {/* <img className='sharebutton' src={`${PF}icons/share_button.png`} alt='share button'></img> */}

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
