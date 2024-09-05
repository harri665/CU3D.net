import React, { useState } from 'react';

const PostDetailModal = ({ post, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!post) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
        <button
          className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 hover:bg-gray-400"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={post.images[currentImageIndex]}
              alt={post.title}
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Previous Button */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
              onClick={handlePreviousImage}
            >
              &larr;
            </button>
            {/* Next Button */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
              onClick={handleNextImage}
            >
              &rarr;
            </button>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 leading-relaxed">{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
