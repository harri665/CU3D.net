import React from 'react';

const PostCard = ({ title, excerpt, imageUrl, onClick }) => {
  return (
    <div
      className="flex-shrink-0 w-72 h-48 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{excerpt}</p>
      </div>
    </div>
  );
};

export default PostCard;
