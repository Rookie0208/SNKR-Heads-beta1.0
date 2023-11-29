import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";


export default function Home(){
    return(
        <div>
            <Topbar/>
            <div className="homecontainer">
            <Sidebar/>
            <Feed/>
            <Rightbar/>

            </div>
        </div>
    )
}