import React, { useRef, useState } from 'react';
import "./Share.css";
import { ScatterPlot, LocationOn, People, EmojiEmotions, Cancel } from "@mui/icons-material";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
// import { grey } from '@mui/material/colors';


export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);
    const validateDesc = (desc) => {
        const re = /\S+/;
        return re.test(desc);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateDesc(desc.current.value) && !file) {
            return;
        }
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;

            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.post("/posts", newPost)
            window.location.reload();//we can also create a post context and update post state//reload to remove the uplaoded post from drop it


        }
        catch (err) {
            console.log(err);

        }
    }

    return (
        <div className='share'>
            <div className='sharewrapper'>
                <div className='sharetop'>
                    <img src={user.profilePicture ? PF +"posts/" + user.profilePicture : PF + "icons/noavatar.png"} className='shareprofileimg' alt='shareprofileimage' ></img>
                    <input type='text' className='shareinput' placeholder={'Drop your Drip here ' + user.username} ref={desc} required>
                    </input>
                </div>
                <hr className='sharehr' />
                {file && (
                    <div className='shareimgcontainer'>
                        <img className='shareimg' src={URL.createObjectURL(file)} alt='user-post' />
                        <Cancel className='sharecancelimg' onClick={() => setFile(null)} />
                    </div>
                )}
                <form className='sharebottom' onSubmit={submitHandler}>
                    <div className='shareoptions'>
                        <label htmlFor='file' className='shareoption'>
                            <ScatterPlot className='shareicon' />
                            <span className='shareoptiontext'></span>
                            <input style={{ display: "none" }} type='file' id="file" accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])}></input>
                        </label>
                        {/* [0] to take only one file */}
                        {/* <div className='shareoption'>
                        <People className='shareicon'/>
                        <span className='shareoptiontext'>Tag</span>
                    </div>
                    <div className='shareoption'>
                        <LocationOn className='shareicon'/>
                        <span className='shareoptiontext'>Location</span>
                    </div>
                    <div className='shareoption'>
                        <EmojiEmotions  className='shareicon'/>
                        <span className='shareoptiontext'>Feelings</span>
                    </div> */}
                    </div>
                    <button className='dropbutton' type='submit'>Drop it!</button>
                </form>
            </div>

        </div>
    )
}
