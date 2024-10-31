import React, {useContext, useEffect, useState} from "react";
import "./Sidebar.css";
import { ChatBubble, Groups3, Bookmark, EmojiEvents, ContactSupport, AccountCircleOutlined } from "@mui/icons-material";
import GrainIcon from '@mui/icons-material/Grain';
import CloseFriend from "../closefriend/CloseFriend";
import { Link, useLocation } from 'react-router-dom';
import Faq from '../../pages/faq/Faq';
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


export default function Sidebar() {

    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [Users, setUsers] = useState([]);

    useEffect(()=>{
        const fetchUser = async () =>{
            try{
          const userList = await axios.get("/users/all");
          console.log(userList.data);
          setUsers(userList.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchUser();
      },[user, user.city]);

    return (
        <div className="sidebar">
            <div className="sidebarwrapper">
                <ul className="sidebarlist">
                    <li className="sidebarlistitem">
                        <Link to="/" style={{ textDecoration: "none", backgroundColor: "rgb(15,15,15)" }}>
                            <GrainIcon className="sidebaricon" />
                            <span className={`sidebarlistitemtext ${location.pathname === '/' ? 'active' : ''}`}>FEED</span>
                        </Link>

                    </li>
                    <li className="sidebarlistitem">
                        <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", backgroundColor: "rgb(15,15,15)" }} >
                            <AccountCircleOutlined className="sidebaricon" />
                            <span className={`sidebarlistitemtext ${location.pathname === `/profile/${user.username}` ? 'active' : ''}`}>PROFILE</span>
                        </Link>

                    </li>
                    {/* <li className="sidebarlistitem">
                    <ChatBubble className="sidebaricon"/>
                    <span className="sidebarlistitemtext">CHAT</span>

                    </li> */}
                    {/* <li className="sidebarlistitem">
                    <Groups3 className="sidebaricon"/>
                    <span className="sidebarlistitemtext">SNEAKS</span>

                    </li> */}
                    {/* <li className="sidebarlistitem">
                    <Bookmark className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Saved</span>

                    </li> */}
                    {/* <li className="sidebarlistitem">
                    <EmojiEvents className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Events</span>

                    </li> */}
                    <li className="sidebarlistitem">
                        <Link to="/Faq" style={{ textDecoration: "none", backgroundColor: "rgb(15,15,15)" }} >
                            <ContactSupport className="sidebaricon" />
                            <span className={`sidebarlistitemtext ${location.pathname === '/Faq' ? 'active' : ''}`}>FAQ</span>
                        </Link>

                    </li>

                </ul>
                {/* <button className="sidebarbutton">More</button> */}
                <hr className="sidebarhr" />
                <ul className="sidebarfriendlist">
                    {/* <li className="sidebarfriend">
                    <img className="sidebarfriendimg" src="assets/posts/post1.jpeg" alt="" ></img>
                    <span className="sidebarfriendname">sneakerhead1 </span>

                    </li> */}
                    {Users.filter(u => u._id !== user._id)
                          .filter(u => u.city ? true : false).map(u => (
                        <CloseFriend user={u} key={u._id} />
                    ))}

                </ul>
            </div>
        </div>
    )
}