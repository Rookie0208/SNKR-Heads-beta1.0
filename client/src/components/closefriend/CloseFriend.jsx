import React from 'react'
import "./CloseFriend.css";

export default function CloseFriend({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarfriend">
    <img className="sidebarfriendimg" src={PF+user.profilePicture} alt="" ></img>
    <span className="sidebarfriendname">{user.username}</span>

    </li>
  )
}
