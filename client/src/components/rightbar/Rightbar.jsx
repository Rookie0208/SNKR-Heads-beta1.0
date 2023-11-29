// import { useState, useEffect, useContext } from 'react';
// import "./Rightbar.css";
// import { Users } from "../../dummyData";
import Online from "../online/Online";
// import axios from "axios";
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { Add, Remove } from "@mui/icons-material";


// export default function Rightbar({ user }) {
//     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//     const [friends, setFriends] = useState([]);
//     const { user: currentUser, dispatch } = useContext(AuthContext);

//     // const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
//     const [followed, setFollowed] = useState(false);

//     // useEffect(() => {
//     //     setFollowed(currentUser.followings.includes(user?._id));
//     //     console.log("the value of followed is "+followed);
//     // }, [currentUser, user]);

//     useEffect(() => {
//         const isFollowing = currentUser.followings.includes(user?._id);
//         setFollowed(isFollowing);
//         console.log("isFollowing:", isFollowing);
//         console.log("followed:", followed);
//       }, [currentUser, user]);
      

//     useEffect(() => {
//         const getFriends = async () => {
//             try {
//                 const friendList = await axios.get("/users/friends/" + user._id);
//                 setFriends(friendList.data);
    
//                 // Check if the displayed user is a friend
//                 const isFriend = friendList.data.some(friend => friend._id === user._id);
//                 setFollowed(isFriend);
//             } catch (err) {
//                 console.log(err);
//             }
//         };
//         getFriends();
//     }, [user]);
    
//     const handleClick = async () => {
//         try {
//             if (followed) {
//                 const response = await axios.put(`/users/${user._id}/unfollow`, {
//                     userId: currentUser._id,
//                 });
    
//                 if (response.data === "You already Follow this user") {
//                     // If the response indicates that the user is already following,
//                     // treat it as a successful unfollow operation
//                     dispatch({ type: "UNFOLLOW", payload: user._id });
//                 } else {
//                     // Handle any other error or success conditions here
//                 }
//             } else {
//                 const response = await axios.put(`/users/${user._id}/follow`, {
//                     userId: currentUser._id,        
//                 });
    
//                 if (response.data === "You already Follow this user") {
//                     // If the response indicates that the user is already following,
//                     // treat it as a successful follow operation
//                     dispatch({ type: "FOLLOW", payload: user._id });
//                 } else {
//                     // Handle any other error or success conditions here
//                 }
//             }
    
//             // Toggle the 'followed' state
//             setFollowed(!followed);
//         } catch (err) {
//             console.log(err);
//         }
//     };
    


    
    

//     // const isGetFollowed = async()=>{
//     //     if(user._id){
//     //     return await currentUser.followings.includes(user?._id)
//     //     }
//     //   }
//     //  const [followed, setFollowed] = useState(isGetFollowed);

//     //  useEffect(() => {
//     //     const getFriends = async()=>{
//     //       if(user._id){
//     //         try {
//     //         const friendList = await axios.get("/users/friends/"+ user._id);
//     //         setFriends(friendList.data);
//     //       } catch (err) {
//     //         console.log(err);
//     //       }
//     //       }
//     //   };
//     //     getFriends();
//     //   }, [user]);




//     // useEffect(()=>{
//     //   setFollowed(currentUser.followings.includes(user?._id))  
//     // },[currentUser,user]);

//     // useEffect(() => {
//     //     const getFriends = async () => {
//     //         try {
//     //             const friendList = await axios.get("/users/friends/" + user._id);
//     //             setFriends(friendList.data);

//     //         } catch (err) {
//     //             console.log(err);
//     //         }
//     //     };
//     //     getFriends();
//     // }, [user]);

//     // const handleClick = async () => {
//     //     try {
//     //         if (followed) {
//     //           await axios.put(`/users/${user._id}/unfollow`, {
//     //             userId: currentUser._id,
//     //           });
//     //           dispatch({ type: "UNFOLLOW", payload: user._id });
//     //         } else {
//     //           await axios.put(`/users/${user._id}/follow`, {
//     //             userId: currentUser._id,
//     //           });
//     //           dispatch({ type: "FOLLOW", payload: user._id });
//     //         }
//     //         setFollowed(!followed);
//     //       } catch (err) {
//     //       }
//     //     };

//     const HomeRightbar = () => {
//         return (
//             <>
//                 <div className="birthdaycontainer">
//                     <img className="birthdayimg" src="/assets/icons/giftbox.png" alt="birthdays"></img>
//                     <span className="birthdaytext"><b>Pola foster</b> and <b>3 other</b> friends have a birthday today</span>
//                 </div>
//                 <img className="rightbarad" src="/assets/icons/ad.png" alt="advertisement"></img>
//                 <h4 className="rightbartitle">Online Friends</h4>
//                 <ul className="rightbarfriendlist">
//                     {/* <li className="rightbarfriend">
//                         <div className="rightbarprofileimgcontainer">
//                             <img className="rightbarprofileimg" src="/assets/posts/post4.png" alt="profile img"></img>
//                             <span className="rightbaronline"></span>
//                         </div>
//                         <span className="rightbarusername">John Carter</span>

//                     </li> */}

//                     {Users.map((u) =>
//                     (
//                         <Online key={u.id} user={u} />
//                     )
//                     )}

//                 </ul>
//             </>
//         );
//     };

//     const ProfileRightbar = () => {
//         return (
//             <>
//                 {user.username !== currentUser.username && (
//                     <button className='rightbarfollowbutton' onClick={handleClick}>
//                         {followed ? "UNFOLLOW" : "FOLLOW"}
//                         {followed ? <Remove /> : <Add />}
//                     </button>
//                 )}
//                 <h4 className="rightbartitle">
//                     User Information
//                 </h4>
//                 <div className="rightbarinfo">
//                     <div className="rightbarinfoitem">
//                         <span className="rightbarinfokey">city:</span>
//                         <span className="rightbarinfovalue">{user.city}</span>
//                     </div>
//                     <div className="rightbarinfoitem">
//                         <span className="rightbarinfokey">From:</span>
//                         <span className="rightbarinfovalue">{user.from}</span>
//                     </div>
//                     <div className="rightbarinfoitem">
//                         <span className="rightbarinfokey">Relationship:</span>
//                         <span className="rightbarinfovalue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
//                     </div>
//                 </div>
//                 <h4 className="rightbartitle">
//                     User Friends
//                 </h4>
//                 <div className="rightbarfollowings">
//                     {friends.map((friend) => (
//                         <Link to={"/profile/" + friend.username} style={{ textDecoration: "none", textAlign: "center" }}>

//                             <div className="rightbarfollowing">
//                                 <img src={friend.profilePicture ? PF + "posts/" + friend.profilePicture : PF + "icons/noavatar.png"} alt="User followings" className="rightbarfollowingimg"></img>
//                                 <span className="Rightbarfollwoingname">{friend.username}</span>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </>
//         )
//     }

//     return (
//         <div className="rightbar">
//             <div className="rightbarwrapper">
//                 {/* {profile ? <ProfileRightbar /> : <HomeRightbar />} */}
//                 {user ? <ProfileRightbar /> : <HomeRightbar />}

//             </div>
//         </div>
//     );
// } 

import { useState, useEffect, useContext } from 'react';
import "./Rightbar.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from "@mui/icons-material";
import { Follow, Unfollow } from "../../context/AuthActions";


export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        const isFollowing = currentUser.followings.includes(user?._id);
        console.log("isFollowing:", isFollowing);
        setFollowed(isFollowing);
    }, [currentUser, user]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);
    
    const handleClick = async () => {
        try {
            if (followed) {
                const response = await axios.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });

                if (response.data === "User Unfollowed Successfully!!") {
                    // If the response indicates that the user was successfully unfollowed,
                    // dispatch the Unfollow action
                    dispatch({ type: "UNFOLLOW", payload: user._id });
                } else {
                    // Handle any other error or success conditions here
                }
            } else {
                const response = await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });

                if (response.data === "User Followed Successfully!!") {
                    // If the response indicates that the user was successfully followed,
                    // dispatch the Follow action
                    dispatch({ type: "FOLLOW", payload: user._id });
                } else {
                    // Handle any other error or success conditions here
                }
            }

            // Toggle the 'followed' state
            setFollowed(!followed);
        } catch (err) {
            console.log(err);
        }
    };

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdaycontainer">
                    <img className="birthdayimg" src="/assets/icons/giftbox.png" alt="birthdays"></img>
                    <span className="birthdaytext"><b>Pola foster</b> and <b>3 other</b> friends have a birthday today</span>
                </div>
                <img className="rightbarad" src="/assets/icons/ad.png" alt="advertisement"></img>
 <h4 className="rightbartitle">Online Friends</h4>
                 <ul className="rightbarfriendlist">
                     <li className="rightbarfriend">
                         <div className="rightbarprofileimgcontainer">
                             <img className="rightbarprofileimg" src="/assets/posts/post4.png" alt="profile img"></img>
                             <span className="rightbaronline"></span>
                         </div>
                         <span className="rightbarusername">John Carter</span>

                     </li>

                     {friends.map((u) =>
                     (
                         <Online key={u.id} user={u} />
                     )
                     )}

                 </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className='rightbarfollowbutton' onClick={handleClick}>
                        {followed ? "UNFOLLOW" : "FOLLOW"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="rightbartitle">
                    User Information
                </h4>
                <div className="rightbarinfo">
                    <div className="rightbarinfoitem">
                        <span className="rightbarinfokey">city:</span>
                        <span className="rightbarinfovalue">{user.city}</span>
                    </div>
                    <div className="rightbarinfoitem">
                        <span className="rightbarinfokey">From:</span>
                        <span className="rightbarinfovalue">{user.from}</span>
                    </div>
                    <div className="rightbarinfoitem">
                        <span className="rightbarinfokey">Relationship:</span>
                        <span className="rightbarinfovalue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
                    </div>
                </div>
                <h4 className="rightbartitle">
                    User Friends
                </h4>
                <div className="rightbarfollowings">
                    {friends.map((friend) => (
                        <Link to={"/profile/" + friend.username} style={{ textDecoration: "none", textAlign: "center" }} key={friend._id}>
                            <div className="rightbarfollowing">
                                <img src={friend.profilePicture ? PF + "posts/" + friend.profilePicture : PF + "icons/noavatar.png"} alt="User followings" className="rightbarfollowingimg"></img>
                                <span className="Rightbarfollwoingname">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarwrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}
