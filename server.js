const express = require('express');
const server = express();
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');

// Middleware to parse incoming requests
server.use(
  express.urlencoded({
    extended: true,
  })
);
server.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
}

// Add routes, both API and view
server.use(routes);

// Connect to the MongoDB
const dbURI = process.env.MONGODB_URI || 'mongodb://root:example@mongo:27017/mst?authSource=admin';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the API server
server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`Server is listening at: ${PORT} - Click Here => http://localhost:${PORT}`);
});
