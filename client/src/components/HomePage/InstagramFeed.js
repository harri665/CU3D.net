// InstagramGrid.js
import React, { useState, useEffect } from 'react';

const InstagramGrid = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
    fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=YOUR_ACCESS_TOKEN`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="instagram-grid bg-dark-space text-white py-16">
      <h2 className="text-4xl text-center mb-8">Recent Instagram Posts</h2>
      <div className="max-w-6xl mx-auto px-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <a href={post.permalink} target="_blank" rel="noopener noreferrer" key={post.id} className="instagram-post">
            <img src={post.media_url} alt={`Instagram Post ${post.id}`} className="w-full h-48 object-cover rounded-md hover:opacity-80 transition-opacity duration-300" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default InstagramGrid;
