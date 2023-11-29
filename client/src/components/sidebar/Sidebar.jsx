import React from "react";
import "./Sidebar.css";
import {ChatBubble,Groups3,Bookmark,EmojiEvents,ContactSupport} from "@mui/icons-material";
import GrainIcon from '@mui/icons-material/Grain';
import {Users} from "../../dummyData";
import CloseFriend from "../closefriend/CloseFriend";

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarwrapper">
                <ul className="sidebarlist">
                    <li className="sidebarlistitem">
                    <GrainIcon className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Feed</span>
                    </li>
                    <li className="sidebarlistitem">
                    <ChatBubble className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Chats</span>

                    </li>
                    <li className="sidebarlistitem">
                    <Groups3 className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Sneaks</span>

                    </li>
                    <li className="sidebarlistitem">
                    <Bookmark className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Saved</span>

                    </li>
                    <li className="sidebarlistitem">
                    <EmojiEvents className="sidebaricon"/>
                    <span className="sidebarlistitemtext">Events</span>

                    </li>
                    <li className="sidebarlistitem">
                    <ContactSupport className="sidebaricon"/>
                    <span className="sidebarlistitemtext">FAQ</span>

                    </li>
                    
                </ul>
                <button className="sidebarbutton">More</button>
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