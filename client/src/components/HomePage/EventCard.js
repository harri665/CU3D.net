import React, { useState } from 'react';
import axios from 'axios';

const EventCard = ({ event }) => {
    const [showForm, setShowForm] = useState(false); // To show/hide the RSVP form
    const [name, setName] = useState('');
    const [discordUsername, setDiscordUsername] = useState('');
    const [isRsvped, setIsRsvped] = useState(false);

    const handleRSVP = async () => {
        try {
            const response = await axios.post(`/api/events/${event._id}/rsvp`, {
                name,
                discordUsername,
            });
            if (response.status === 200) {
                setIsRsvped(true); // RSVP success
                setShowForm(false); // Hide form after successful RSVP
            }
        } catch (error) {
            console.error('Error RSVPing:', error);
        }
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <img src={event.image} alt={event.title} className="w-full h-32 object-cover" />
            <div className="p-4">
                <div className="text-green-700 text-sm font-bold">{event.date}</div>
                <div className="font-semibold text-lg">{event.title}</div>
                <div className="text-gray-600 text-sm">{event.location}</div>

                <button
                    onClick={() => setShowForm(true)}
                    disabled={isRsvped}
                    className={`mt-4 py-2 px-4 rounded transition-colors ${
                        isRsvped
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    {isRsvped ? 'RSVPed' : 'RSVP'}
                </button>

                {/* RSVP Form (shown when the RSVP button is clicked) */}
                {showForm && (
                    <div className="mt-4 p-4 border rounded shadow">
                        <div>
                            <label className="block mb-2">Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border p-2 w-full"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2">Discord Username:</label>
                            <input
                                type="text"
                                value={discordUsername}
                                onChange={(e) => setDiscordUsername(e.target.value)}
                                className="border p-2 w-full"
                                placeholder="Enter your Discord username"
                            />
                        </div>
                        <button
                            onClick={handleRSVP}
                            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Submit RSVP
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCard;
