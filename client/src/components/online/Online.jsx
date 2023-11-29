import React from 'react';
import "./online.css";

export default function Online({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarfriend">
    <div className="rightbarprofileimgcontainer">
        <img className="rightbarprofileimg" src={PF+user.profilePicture} alt="profile img"></img>
        <span className="rightbaronline"></span>
    </div>
    <span className="rightbarusername">{user.username}</span>

</li>
  )
}
