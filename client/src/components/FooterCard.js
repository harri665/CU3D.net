import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


const FooterCard = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center items-center space-x-6">

        <a href="https://discord.com/invite/CS45mQWgPE" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-discord hover:text-blue-400"></i>
        </a>
        <a href="https://www.instagram.com/cu3dboulder" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram hover:text-pink-500"></i>
        </a>
        <a href="https://www.linkedin.com/company/cu3dboulder" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in hover:text-blue-700"></i>
        </a>
      </div>
    </div>
  );
};

export default FooterCard;
