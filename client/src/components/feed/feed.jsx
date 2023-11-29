import React, { useContext } from 'react';
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
// import {Posts} from "../../dummyData";
import { useState,useEffect} from 'react';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';





export default function Feed({username}) {


  const [posts,setPosts]=useState([]);
  const {user} = useContext(AuthContext);


  // useEffect(() => {
  //   axios.get('posts/timeline/64cc0b8625a88732085c1662').then(response => {
  //     console.log(response.data);
  //   });
  // }, []);


//   useEffect(()=>{
//   async function getUser() {
//     try {
//       const response = await axios.get('posts/timeline/64cea396e478ad9b1c101a9f');
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   getUser();
//   console.log("rendered");
//  },[]);
  

  useEffect(()=>{
    const fetchPosts = async () =>{
      const res = username ? await axios.get("http://localhost:3000/posts/profile/"+username) : await axios.get("/posts/timeline/"+user._id)
      console.log(res);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
      );//make latest post come to top therefore sort

    };
    fetchPosts();
    // console.log("feed rendered");
  },[username,user._id]);//renders continously//[]means render only once

  return (
    <div className='feed'>
    <div className='feedwrapper'>
      {(!username || username === user.username) && < Share/>}
      {posts.map((p)=>(
       
      <Post key={p._id} post={p} />

      ))}
    </div>
    </div>
  )
}
