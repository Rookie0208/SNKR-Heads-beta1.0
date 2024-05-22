import React, { useState, useEffect } from 'react';
import '../faq/faq.css';
import { Link } from 'react-router-dom';

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await fetch('/faqData.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFaqData(data.faqData);
      } catch (error) {
        console.error('Error fetching the FAQ data:', error);
      }
    };

    fetchFaqData();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq">
      <div className="faq-container">
        <h2 className='head'>Frequently Asked Questions</h2>
        {faqData.length > 0 ? (
          faqData.map((faq, index) => (
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
                  <img
                    src={openIndex === index ? `${PF}icons/cross.svg` : `${PF}icons/plus.svg`}
                    alt=""
                    className={openIndex === index ? 'rotate' : 'rotate-back'}
                  />
                </button>
              </div>
              <div className={`accordion-details ${openIndex === index ? 'active' : ''}`} id={`panel${index}`}>
                <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading FAQs...</p>
        )}
      </div>
      <div className="disclaimer">
        <p className='desc'>
          Please note that the information provided here is subject to change, and we appreciate your understanding during the development phase of the platform.
        </p>
        <Link className='goback' to={'/'}>
          <span className="button">GO BACK</span>
        </Link>
      </div>
    </div>
  );
};

export default Faq;
