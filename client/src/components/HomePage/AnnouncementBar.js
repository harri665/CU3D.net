import React, { useState, useEffect } from 'react';

const AnnouncementBar = () => {
  const announcements = [
    'Announcement 1: Welcome to our website!',
    'Announcement 2: New products are available now.',
    'Announcement 3: Check out our latest blog post!',
    'Announcement 4: Sale ends this weekend!',
  ];

  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000); // Change the announcement every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [announcements.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-[25%] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 text-center w-full md:w-auto transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <p className="animate-fadeIn">{announcements[currentAnnouncement]}</p>
    </div>
  );
};

export default AnnouncementBar;
