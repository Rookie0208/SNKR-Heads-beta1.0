import React from 'react';
import "./login.css";
import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

export default function Login() {

  const email = useRef();
  const password = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext);

  const handleClick = (e)=>{
    e.preventDefault();//prevent reload of the page when log in is pressed
    // console.log(email.current.value);
    loginCall({ email:email.current.value, password:password.current.value}, dispatch);
  };

  console.log(user);

  return (
    <div className='login'>
        <div className='loginwrapper'>
            <div className='loginleft'>
                <h3 className='loginlogo'></h3>
                <span className='logindescription'>          CONNECT WITH OTHER SNKR-HEADS AROUND THE WORLD</span>
            </div>
            <div className='loginright'>
              <form className='loginbox' onSubmit={handleClick}>
                <input type='email' placeholder='Enter your Email' required className='logininput' ref={email}></input>
                <input type='password' placeholder="Enter your password" required minLength="6" className='logininput' ref={password}></input>
                <button className='loginbutton' type='submit' disabled={isFetching}>{isFetching ? <CircularProgress className='progress' size="15px" /> : "LOGIN"}</button>
                {/* <span className='loginforgot'>Forgot Password</span> */}
                <Link className='loglink' to="/register">
                <button className='loginregisterbutton'>{isFetching ? <CircularProgress className='progress' size="15px" /> : "SIGN UP"}</button>
                </Link>
              </form>
            </div>

        </div>
    </div>
  )
}
