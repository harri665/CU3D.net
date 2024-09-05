import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnnouncementBar = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [visible, setVisible] = useState(true);

  // Fetch announcements from the backend API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('/api/announcements');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Rotate announcements every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (announcements.length > 0) {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements]);

  // Handle scroll visibility of the announcement bar
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY === 0);
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
      <p className="animate-fadeIn">
        {announcements.length > 0
          ? announcements[currentAnnouncement].message
          : 'Loading announcements...'}
      </p>
    </div>
  );
};

export default AnnouncementBar;
