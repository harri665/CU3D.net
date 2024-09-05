import React, { useState } from 'react';

const AnnouncementModal = ({ imageSrc, title, description }) => {
  const [isOpen, setIsOpen] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>


      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`bg-white rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            } sm:max-w-lg sm:w-full`}
          >
            <div className="bg-gray-800 text-white p-4 relative">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button
                className="absolute top-0 right-0 mt-3 mr-4 text-gray-400 hover:text-white"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Announcement"
                  className="w-full h-auto rounded-lg mb-4"
                />
              )}
              <p className="text-gray-600">{description}</p>
            </div>
            <div className="px-6 pb-4 flex justify-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementModal;
