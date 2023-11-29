import React, { useRef } from 'react';
import './register.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post('/auth/register', user);
        history('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='register'>
      <div className='register-left'>
        <h3 className='register-logo'></h3>
        <span className='register-description'>
          CONNECT WITH OTHER SNKR-HEADS AROUND THE WORLD
        </span>
      </div>
      <div className='register-right'>
        <form className='register-box' onSubmit={handleClick}>
          <input
            placeholder='USERNAME'
            required
            className='register-input'
            ref={username}
            type='text'
          />
          <input
            type='email'
            required
            placeholder='EMAIL'
            ref={email}
            className='register-input'
          />
          <input
            type='password'
            required
            placeholder='PASSWORD'
            ref={password}
            minLength='6'
            className='register-input'
          />
          <input
            type='password'
            ref={confirmPassword}
            required
            placeholder='CONFIRM PASSWORD'
            className='register-input'
          />
          <button className='register-button' type='submit'>
            SIGN UP
          </button>
          <Link className='reglink' to="/login">

          <button className='login-into-button'>LOG IN</button>
          </Link>
        </form>
      </div>
    </div>
  );
}



// #c91f1f