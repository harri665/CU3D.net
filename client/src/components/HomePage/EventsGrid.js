import React, { useState, useEffect } from 'react';

const EventsGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data); // Assuming the API returns an array of event objects
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="events-grid bg-dark-space text-white py-16">
      <h2 className="text-4xl text-center mb-8">Upcoming Events</h2>
      <div className="max-w-6xl mx-auto px-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-2xl mb-2">{event.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{event.date}</p>
              <p className="text-base">{event.description}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-white">No upcoming events</div>
        )}
      </div>
    </div>
  );
};

export default EventsGrid;
