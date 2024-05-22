import React from 'react';
import "./login.css";
import { useContext, useRef, useState } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleClick = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  
    try {
      await loginCall({ email, password }, dispatch);
      // If login is successful, redirect or perform other actions
    } catch (error) {
      console.error('Login error:', error);
      // Display error message to the user
      setErrorMessage('Invalid email or password. Please try again.');
    }
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
                <input type='email' placeholder='Enter your Email' required className='logininput' ref={emailRef}></input>
                <input type='password' placeholder="Enter your password" required minLength="6" className='logininput' ref={passwordRef}></input>
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
