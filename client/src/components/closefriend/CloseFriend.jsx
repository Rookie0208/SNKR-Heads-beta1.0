import React from 'react'
import "./CloseFriend.css";
import { useNavigate } from 'react-router-dom';

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useNavigate();

  const handleResultClick = (username) => {
    history(`/profile/${username}`); // Navigate to the user's profile
  };
  return (
    <li className="sidebarfriend" onClick={() => handleResultClick(user.username)} >
      <div>
        <img className="sidebarfriendimg" src={user.profilePicture ? PF + "posts/" + user.profilePicture : PF + "icons/noavatar.png"} alt="" ></img>
        <span className="sidebarfriendname">{user.username}</span>
      </div>
    </li>
  )
}
