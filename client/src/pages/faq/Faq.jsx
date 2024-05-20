import React,{useState} from 'react';
import '../faq/faq.css';
import { Link, useNavigate } from 'react-router-dom';

const PF=process.env.REACT_APP_PUBLIC_FOLDER;
const faqData = [
  {
    question: "What is this social media platform about?",
    answer: "This is an exclusive social media platform designed for sneaker heads. It provides a space for sneaker enthusiasts to connect, share their collections, and engage with like-minded individuals. Please note that it is not a marketplace."
  },
  {
    question: "Is this platform in the development phase?",
    answer: "Yes, this project is currently in the development phase. We appreciate your participation and welcome any feedback or bug reports. Your input will help us improve the platform."
  },
  {
    question: "How can I report bugs or provide feedback?",
    answer: 'We encourage you to report any bugs or provide feedback by contacting via mail on <a href="mailto:p.s.piyushsokhi@gmail.com">p.s.piyushsokhi@gmail.com</a>.'
  },
  // Add more FAQ items as needed
];
const Faq = () => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  return (
    <div className="faq">
      <div className="faq-container">
        <h2 className='head'>Frequently Asked Questions</h2>
        {faqData.map((faq, index) => (
          <div className="accordion" key={index}>
            <div className="accordion-summary">
              <div
                className="accordion-toggle"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
              </div>
              <button
                className="accordion-toggle"
                onClick={() => toggleAccordion(index)}
                >
                  <img src={openIndex === index ? PF + "icons/cross.svg" : PF + "icons/plus.svg"} alt="" 
                  className={openIndex === index ? 'rotate' : 'rotate-back'} />
                </button>
            </div>
            <div className={`accordion-details ${openIndex === index ? 'active' : ''}`} id={`panel${index}`}>
            <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
            </div>
          </div>
        ))}
      </div>
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
