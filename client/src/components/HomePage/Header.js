import React from "react";

const Header = ({ toggleGoldMode }) => {
  return (
    <header className="flex justify-center items-center p-8 absolute top-0 w-full text-blue-200 opacity-0 animate-fadeInUp animation-delay-2000">
      <h2 className="absolute left-0 ml-8 opacity-50 hover:opacity-100 transition-opacity duration-200">
        <a href="https://codepen.io/RAFA3L" target="_blank" rel="noopener noreferrer">
          RAFA
        </a>
      </h2>
      <div
        className="w-7 h-7 bg-black rounded-full shadow-lg cursor-pointer transition-shadow duration-1000 hover:shadow-gold"
        onClick={toggleGoldMode}
      ></div>
      <button className="absolute right-0 mr-8 px-4 py-2 bg-gray-900 text-blue-200 rounded-full border border-blue-200 hover:bg-gray-800 transition-colors duration-200">
        Contact Us
      </button>
    </header>
  );
};

export default Header;
