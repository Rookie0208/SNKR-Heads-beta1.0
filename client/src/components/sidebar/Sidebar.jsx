import React from "react";
import "./Sidebar.css";
import {ChatBubble,Groups3,Bookmark,EmojiEvents,ContactSupport} from "@mui/icons-material";
import GrainIcon from '@mui/icons-material/Grain';
import {Users} from "../../dummyData";
import CloseFriend from "../closefriend/CloseFriend";
import { Link } from 'react-router-dom';
import Faq from '../../pages/faq/Faq';


export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarwrapper">
                <ul className="sidebarlist">
                    <li className="sidebarlistitem">
                    <Link to="/" style={{ textDecoration: "none", backgroundColor: "rgb(15,15,15)" }}>
                    <GrainIcon className="sidebaricon"/>
                    <span className="sidebarlistitemtext">FEED</span>
                    </Link>

                    </li>
                    <li className="sidebarlistitem">
                    <ChatBubble className="sidebaricon"/>
                    <span className="sidebarlistitemtext">CHAT</span>

                    </li>
                    <li className="sidebarlistitem">
                    <Groups3 className="sidebaricon"/>
                    <span className="sidebarlistitemtext">SNEAKS</span>

                    </li>
                    {/* <li className="sidebarlistitem">
                    <Bookmark className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Saved</span>

                    </li> */}
                    {/* <li className="sidebarlistitem">
                    <EmojiEvents className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Events</span>

                    </li> */}
                    <li className="sidebarlistitem">
                    <Link to="/Faq" style={{ textDecoration: "none", backgroundColor: "rgb(15,15,15)" }}>
                    <ContactSupport className="sidebaricon"/>
                    <span className="sidebarlistitemtext">FAQ</span>
                    </Link>

                    </li>
                    
                </ul>
                {/* <button className="sidebarbutton">More</button> */}
                <hr className="sidebarhr"/>
                <ul className="sidebarfriendlist">
                    {/* <li className="sidebarfriend">
                    <img className="sidebarfriendimg" src="assets/posts/post1.jpeg" alt="" ></img>
                    <span className="sidebarfriendname">sneakerhead1 </span>

                    </li> */}
                    {Users.map(u=>(
                        <CloseFriend user={u} key={u.id} />
                    ))}

                </ul>
            </div>
        </div>
    )
}