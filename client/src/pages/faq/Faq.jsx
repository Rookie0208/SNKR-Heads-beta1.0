import React from 'react';
import '../faq/faq.css';
import { Link, useNavigate } from 'react-router-dom';


const Faq = () => {
  return (
    <div className="faq">
      <h1 className='head'>Frequently Asked Questions (FAQ)</h1>
      <div className="question">
        <h3 className='ques'>What is this social media platform about?</h3>
        <p className='ans'>
          This is an exclusive social media platform designed for sneaker heads. It provides a space for sneaker enthusiasts to connect, share their collections, and engage with like-minded individuals. Please note that it is not a marketplace.
        </p>
      </div>

      <div className="question">
        <h3 className='ques'>Is this platform in the development phase?</h3>
        <p className='ans'>
          Yes, this project is currently in the development phase. We appreciate your participation and welcome any feedback or bug reports. Your input will help us improve the platform.
        </p>
      </div>

      <div className="question">
        <h3 className='ques'>How can I report bugs or provide feedback?</h3>
        <p className='ans'>
          We encourage you to report any bugs or provide feedback by contacting via mail on p.s.piyushsokhi@gmail.com
        </p>
      </div>

      {/* Add more FAQ questions and answers as needed */}
      <div className="disclaimer">
        <p className='desc'>
          Please note that the information provided here is subject to change, and we appreciate your understanding during the development phase of the platform.
        </p>
        <Link className='goback' to={'/'}>
                    <span className="button">
                    GO BACK
                    </span>
        </Link>
      </div>

    </div>
  );
}

export default Faq;
