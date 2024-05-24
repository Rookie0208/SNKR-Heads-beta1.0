import React, { useContext } from 'react';
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useState,useEffect } from 'react';
import {useParams} from "react-router";
import EditProfile from '../edit/Edit';
import { CameraAltRounded } from '@mui/icons-material';
import { common } from '@mui/material/colors';
import { AuthContext } from '../../context/AuthContext';



export default function Profile() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser] = useState({});
    const params = useParams();
    const username=params.username;
    const { currentUser, dispatch } = useContext(AuthContext);
    console.log(currentUser);
    //params.username will give username in the url

    useEffect(()=>{
        const fetchUser = async () =>{
          const res = await axios.get(`/users?username=${username}`)
          setUser(res.data);
    
        };
        fetchUser();
        // console.log("feed rendered");
      },[username]);//renders continously//[]means render only once

      const uploadPicture = async(e)  => {

            const formData = new FormData();
            const selectedFile = e.target.files[0];
            const fileName = Date.now() + selectedFile.name;

            formData.append('name', fileName);
            formData.append('file', selectedFile);
            const details = {
                userId: user._id,
                fileName: fileName
            };
            try {
                await axios.post("/profile/upload", formData);
                await axios.post(`/users/${details.userId}/profile/picture`, details);
                window.location.reload();

            } catch (error) {
              console.error('Error uploading file:', error);
            }

      }
    


    return (
        <div>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className='profileRight'>
                    <div className='profileRightTop'>
                        <div className='profilecover'>
                        {/* <img className='profilecoverimg' src={`${PF}posts/post3.jpeg`} alt='' /> */}
                        <img className='profilecoverimg' src={user.coverPicture ? PF+user.coverPicture : PF+"icons/nocover.png"} alt='' />
                        {/* <img className='profileuserimg' src={`${PF}posts/post7.jpeg`} alt='' /> */}
                        <img className='profileuserimg' src={user.profilePicture ? PF+"posts/"+user.profilePicture : PF+"icons/noavatar.png"} alt='' />
                        { <span className='edit-profile-pic-btn'>
                            <form>
                            <label htmlFor="dp">
                            <CameraAltRounded/>
                            <input style={{ display: "none" }} type='file' id="dp" accept='.png,.jpeg,.jpg' onChange={uploadPicture}></input>
                            </label>
                            </form>
                            </span>}
                        </div>
                        <div className='profileinfo'>
                            <h4 className='profileinfoname'>{user.username}</h4>
                            <span className='profileinfodesc'>{user.desc}</span>
                        </div>
                        {/* <EditProfile user={user} onUpdate={setUser} /> */}

                    </div>
                    <div className='profileRightBottom'>
                        <Feed username = {username} />
                        {/* <Rightbar profile=<Profile/> /> */}
                        <Rightbar user={user} />
                    </div>


                </div>


            </div>
        </div>
    )
}
