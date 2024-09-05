const mongoose = require('mongoose');
const Post = require('../../models/Post'); // Adjust path as necessary

// MongoDB URI (update this to match your environment)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mst';

// Example posts data
const posts = [
  {
    title: 'Post 1',
    excerpt: 'This is the excerpt for post 1',
    imageUrl: 'https://via.placeholder.com/150',
    content: 'Full content of post 1...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300/0000FF/808080',
      'https://via.placeholder.com/300/FF0000/FFFFFF'
    ]
  },
  {
    title: 'Post 2',
    excerpt: 'This is the excerpt for post 2',
    imageUrl: 'https://via.placeholder.com/150',
    content: 'Full content of post 2...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300/0000FF/808080',
      'https://via.placeholder.com/300/FF0000/FFFFFF'
    ]
  },
  {
    title: 'Post 3',
    excerpt: 'This is the excerpt for post 3',
    imageUrl: 'https://via.placeholder.com/150',
    content: 'Full content of post 3...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300/0000FF/808080',
      'https://via.placeholder.com/300/FF0000/FFFFFF'
    ]
  },
];

// Function to insert posts into MongoDB
async function insertPosts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Insert posts
    await Post.insertMany(posts);
    console.log('Example posts inserted successfully');
  } catch (err) {
    console.error('Error inserting posts:', err);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

// Call the insertPosts function
insertPosts();


  // node Scripts/ExampleScripts/insertPosts.js