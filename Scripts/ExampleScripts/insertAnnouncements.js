const mongoose = require('mongoose');
const Announcement = require('../../models/Announcement'); // Make sure the path is correct for your model

// MongoDB URI (update this to match your environment)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mst';

// Example announcement data
const announcements = [
  { message: 'Announcement 1: Welcome to our website!' },
  { message: 'Announcement 2: New products are available now.' },
  { message: 'Announcement 3: Check out our latest blog post!' },
  { message: 'Announcement 4: Sale ends this weekend!' },
];

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Insert example announcements
    return Announcement.insertMany(announcements);
  })
  .then(() => {
    console.log('Example announcements inserted successfully');
  })
  .catch((err) => {
    console.error('Error inserting announcements:', err);
  })
  .finally(() => {
    // Close the connection to the database
    mongoose.connection.close();
  });


  // node Scripts/ExampleScripts/insertAnnouncements.js
