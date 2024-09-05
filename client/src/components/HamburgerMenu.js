import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className="p-2  text-white rounded-full focus:outline-none transition-transform duration-300 transform hover:scale-105"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`block w-8 h-0.5 bg-white transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Full-screen menu with transitions */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-95 z-40 flex flex-col items-center justify-center transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center space-y-8 text-white text-2xl">
          <Link
            to="/"
            onClick={toggleMenu}
            className="transition-transform duration-300 transform hover:scale-110"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={toggleMenu}
            className="transition-transform duration-300 transform hover:scale-110"
          >
            About
          </Link>
          <Link
            to="/services"
            onClick={toggleMenu}
            className="transition-transform duration-300 transform hover:scale-110"
          >
            Services
          </Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className="transition-transform duration-300 transform hover:scale-110"
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default HamburgerMenu;
