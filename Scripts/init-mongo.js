// MongoDB Initialization Script for CU3D Application
// This script runs when MongoDB container starts for the first time

// Switch to the application database
db = db.getSiblingDB('mst');

// Create application user with appropriate permissions
db.createUser({
  user: 'cu3d_app',
  pwd: 'cu3d_password', // Change this in production
  roles: [
    {
      role: 'readWrite',
      db: 'mst'
    }
  ]
});

// Create collections with initial data structure
db.createCollection('events');
db.createCollection('announcements');
db.createCollection('posts');
db.createCollection('spacemouses');
db.createCollection('users');

// Insert sample data (optional - remove in production)
db.announcements.insertMany([
  { 
    message: 'Welcome to CU3D!',
    createdAt: new Date(),
    active: true
  },
  { 
    message: 'Check out our latest 3D printing projects!',
    createdAt: new Date(),
    active: true
  }
]);

db.events.insertMany([
  {
    title: 'Weekly 3D Printing Workshop',
    description: 'Join us for hands-on 3D printing experience',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
    location: 'CU3D Lab',
    image: '/logo.png',
    rsvps: [],
    createdAt: new Date()
  }
]);

print('CU3D Database initialized successfully!');
