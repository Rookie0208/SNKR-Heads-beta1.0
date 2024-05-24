import React, { useRef, useState } from 'react';
import './register.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState('');
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return re.test(password);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const confirmPasswordValue = confirmPassword.current.value;

    if (!validateEmail(emailValue)) {
      setErrorMessage('Invalid email address');
      return;
    }

    else if (!validatePassword(passwordValue)) {
      setErrorMessage('Password must be at least 6 characters long and include at least one letter and one number');
      return;
    }

    else if (passwordValue !== confirmPasswordValue) {
      setErrorMessage('Passwords do not match');
      return;
    }
    else {
      setErrorMessage(''); // Clear any previous error messages

    }

    console.log('Registration Data:', {
      username: username.current.value,
      email: emailValue,
      password: passwordValue,
    });

    
   const user = {
      username: username.current.value,
      email: emailValue,
      password: passwordValue,
    }; 
    try {
      await axios.post('/auth/register', user);
      openModal();
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred during registration. Please try again.');
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
          {errorMessage && <span className='error-message'>{errorMessage}</span>}
          <button className='register-button' type='submit'>
            SIGN UP
          </button>
          <Link className='reglink' to="/login">
            <button className='login-into-button'>LOG IN</button>
          </Link>
        </form>
      </div>
      {isModalOpen && <div id="confirmationModal" className="modal">
        <div className="modal-content">
          <p>You just leveled up your sneaker game {username.current.value}! <br />
            Login to join the kicks revolution!</p>
          <div className="modal-login-btn">
            <Link className='reglink' style={{ backgroundColor: 'transparent' }} to="/login">
              <button className='login-into-button'>LOG IN</button>
            </Link>
          </div>
        </div>
      </div>}
    </div>
  );
}
