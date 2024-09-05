import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


const FooterCard = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center items-center space-x-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f hover:text-blue-500"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter hover:text-blue-400"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram hover:text-pink-500"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in hover:text-blue-700"></i>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github hover:text-gray-500"></i>
        </a>
      </div>
    </div>
  );
};

export default FooterCard;
