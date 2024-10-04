import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { CalendarIcon } from '@heroicons/react/24/outline';
import remarkGfm from 'remark-gfm';

const EventsGrid = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
        setEvents(data);
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
    <div className="events-grid bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      <h2 className="text-5xl font-bold text-center mb-12 text-indigo-400">Upcoming Events</h2>
      <div className="max-w-7xl mx-auto px-4 grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.length > 0 ? (
          events.map((event) => (
            <motion.div
              key={event.id}
              className="event-card bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => setSelectedEvent(event)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                {/* Emphasized Date Badge */}
                <div className="absolute top-4 left-4 flex items-center bg-indigo-600 text-white px-3 py-1 rounded-full text-xs uppercase tracking-wide shadow-md">
                  <CalendarIcon className="h-5 w-5 mr-1 text-white" />
                  {format(new Date(event.date), 'MMM dd')}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-indigo-300">{event.title}</h3>
              {/* Emphasized Date Text */}
              <p className="text-lg text-indigo-400 font-medium flex items-center mb-4">
                <CalendarIcon className="h-6 w-6 mr-2 text-indigo-400" />
                {format(new Date(event.date), 'EEEE, MMMM do, yyyy h:mm a')}
              </p>
              <div className="text-base line-clamp-3 text-gray-300">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        className="text-indigo-400 hover:text-indigo-300 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                  }}
                >
                  {event.description}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-white">No upcoming events</div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white text-gray-900 rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-8">
                <h2 className="text-4xl font-bold mb-4 text-indigo-600">{selectedEvent.title}</h2>
                {/* Emphasized Date in Modal */}
                <p className="text-xl text-indigo-500 font-semibold flex items-center mb-6">
                  <CalendarIcon className="h-6 w-6 mr-2 text-indigo-500" />
                  {format(new Date(selectedEvent.date), 'EEEE, MMMM do, yyyy h:mm a')}
                </p>
                <div className="prose prose-lg max-w-none text-gray-800">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="text-indigo-600 hover:text-indigo-500 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  >
                    {selectedEvent.description}
                  </ReactMarkdown>
                </div>
                <button
                  className="mt-8 w-full bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-200"
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsGrid;
