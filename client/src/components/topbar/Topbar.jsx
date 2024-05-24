import React, { useContext, useState, useEffect } from 'react';
import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
// import "../../../public/assets";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from '../../apiCalls'
import axios from 'axios';



export default function Topbar() {

    const { user, dispatch } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // const { user,dispatch } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const history = useNavigate();


    const handleClick = () => {
        logoutCall(
            dispatch
        );
    }


    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }
        try {
            const response = await axios.get(`/users/search?searchQuery=${searchQuery}`);
            if(response.data.length === 0) {
                setShowSearchResults(false);
                return;
            }
            setSearchResults(response.data);
            setShowSearchResults(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleResultClick = (username) => {
        history(`/profile/${username}`); // Navigate to the user's profile
        setSearchQuery(''); // Clear the search query
        setShowSearchResults(false); // Close the search results
    };

    // Close the search results when the user clicks outside
    useEffect(() => {
        const closeSearchResults = () => setShowSearchResults(false);
        document.addEventListener("click", closeSearchResults);
        return () => {
            document.removeEventListener("click", closeSearchResults);
        };
    }, []);


    return (
        <div className='topbarcontainer'>
            <div className='topbarleft'>
                <Link to="/" style={{ textDecoration: "none", backgroundColor: "#c91f1f" }}>
                    <span className='logo'>SNKR-HEADS</span>
                </Link>
            </div>
            <div className='topbarcentre'>
                <div className='searchbar'>
                    <Search className='searchicon' />
                    <input
                        placeholder="Search Here"
                        className="searchinput"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyUp={(e) => {
                                handleSearch(); 
                        }}
                    />
                    {showSearchResults && (
                        <ul className="searchresults">
                            {searchResults.map((result) => (
                                <li
                                    key={result._id}
                                    onClick={() => handleResultClick(result.username)} // Handle click on result
                                >
                                    {result.username}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className='topbarright'>
                <div className='topbarlinks'>
                    {/* <span className='topbarlink'>HOME PAGE</span> */}
                    {/* <span className='topbarlink'>TIMELINE</span> */}
                </div>
                {/* <div className='topbaricons'>
                    <div className='topbariconitem'>
                        <Person />
                        <span className='topbariconbadge'>1</span>
                    </div>
                    <div className='topbariconitem'>
                        <Chat />
                        <span className='topbariconbadge'>2</span>
                    </div>
                    <div className='topbariconitem'>
                        <Notifications />
                        <span className='topbariconbadge'>3</span>
                    </div>
                </div> */}
                {/* <img src="/assets/posts/post9.jpeg" className='topbarimg' alt="post1" /> */}
                <Link className='rightlinks' to={'/'}>
                    <span className="topbarlink">
                    HOME-PAGE
                    </span>
                </Link>

                <Link className='rightlinks' to={"/"}>
                    <span className="topbarlink" onClick={handleClick}>SIGN-OUT</span>
                </Link>
                <Link className='topbarimg' to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF+"posts/"+user.profilePicture : PF+"icons/noavatar.png"} className='topbarimg' alt="post1" />
                </Link>
            </div>

        </div>
    )
}