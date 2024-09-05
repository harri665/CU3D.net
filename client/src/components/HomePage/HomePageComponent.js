import React from 'react';
import AnimatedCube from './AnimatedCube';
import EventsGrid from './TimelineGrid';
import AnnouncementBar from './AnnouncementBar';
import RecentPosts from './RecentPosts';



function Homepage() {
  const samplePosts = [
    {
      title: 'Post 1',
      excerpt: 'This is the excerpt for post 1',
      imageUrl: 'https://via.placeholder.com/150',
      content: 'Full content of post 1...',
      images: [
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300/0000FF/808080',
        'https://via.placeholder.com/300/FF0000/FFFFFF'
      ]
    },
    {
      title: 'Post 1',
      excerpt: 'This is the excerpt for post 1',
      imageUrl: 'https://via.placeholder.com/150',
      content: 'Full content of post 1...',
      images: [
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300/0000FF/808080',
        'https://via.placeholder.com/300/FF0000/FFFFFF'
      ]
    },
    {
      title: 'Post 1',
      excerpt: 'This is the excerpt for post 1',
      imageUrl: 'https://via.placeholder.com/150',
      content: 'Full content of post 1...',
      images: [
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300/0000FF/808080',
        'https://via.placeholder.com/300/FF0000/FFFFFF'
      ]
    },
    // more posts...
  ];


  return (
    <div className="homepage">
      <AnimatedCube />
      <RecentPosts posts={samplePosts} />

      <EventsGrid />
      <AnnouncementBar />
      <div className='h-screen'></div>
    </div>
  );
}

export default Homepage;
