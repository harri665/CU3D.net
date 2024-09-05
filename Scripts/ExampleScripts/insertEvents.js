const mongoose = require('mongoose');
const Event = require('../../models/Event');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mst';

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

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return Event.insertMany(events);
  })
  .then(() => {
    console.log('Events inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting events:', err);
  });


    // node Scripts/ExampleScripts/insertEvents.js