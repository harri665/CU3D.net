import React from 'react';

const events = [
    {
        date: 'May 09',
        title: 'Red Bull Music Festival',
        location: 'Wiener Prater - Praterstern',
        image: 'path_to_image_1',
    },
    {
        date: 'May 10',
        title: 'Neymar Jr’s Five',
        location: 'Cornaredo Stadium',
        image: 'path_to_image_2',
    },
    {
        date: 'May 12',
        title: 'Red Bull 400 Competition',
        location: 'COPPER PEAK - N13870',
        image: 'path_to_image_3',
    },
    {
        date: 'May 12',
        title: 'Neymar Jr’s Five',
        location: 'Chula Vista Elite Athlete',
        image: 'path_to_image_4',
    },
    {
        date: 'May 12',
        title: 'Neymar Jr’s Five',
        location: 'Phoenix Rising Soccer Complex',
        image: 'path_to_image_5',
    },
    {
        date: 'May 12',
        title: 'Neymar Jr’s Five',
        location: 'Mellysport Futsal',
        image: 'path_to_image_6',
    },
];

const EventCard = ({ event }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <img src={event.image} alt={event.title} className="w-full h-32 object-cover"/>
            <div className="p-4">
                <div className="text-green-700 text-sm font-bold">{event.date}</div>
                <div className="font-semibold text-lg">{event.title}</div>
                <div className="text-gray-600 text-sm">{event.location}</div>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                    RSVP
                </button>
            </div>
        </div>
    );
};

const EventsGrid = () => {
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events: </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventsGrid;
