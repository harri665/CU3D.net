import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimatedCube from './AnimatedCube';
import EventsGrid from './TimelineGrid';
import AnnouncementBar from './AnnouncementBar';
import RecentPosts from './RecentPosts';

function Homepage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="homepage">
      <AnimatedCube />
      <RecentPosts posts={posts} />
      <EventsGrid />
      <AnnouncementBar />
      <div className='h-screen'></div>
    </div>
  );
}

export default Homepage;
