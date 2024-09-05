import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

const EventsGrid = () => {
    const [events, setEvents] = useState([]);
    const user = 'user@example.com'; // Hardcoded user, in real app you get this from authentication

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events: </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event, index) => (
                    <EventCard key={index} event={event} user={user} />
                ))}
            </div>
        </div>
    );
};

export default EventsGrid;
