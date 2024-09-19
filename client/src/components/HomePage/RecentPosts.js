import React, { useState } from 'react';
import PostCard from './PostCard';
import PostDetailModal from './PostDetailModal';

const RecentPosts = ({ posts = [] }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="relative">
      {/* Scrolling container */}
      <div className="flex justify-center overflow-x-auto space-x-4 scrollbar-hide pb-4">
        <div className="flex space-x-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <PostCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                imageUrl={post.imageUrl}
                onClick={() => setSelectedPost(post)}
              />
            ))
          ) : (
            <p className="text-gray-500">No recent posts available.</p>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default RecentPosts;
  