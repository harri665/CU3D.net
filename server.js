const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes'); // Existing routes

const server = express();
const PORT = process.env.PORT || 3001;

server.use(cors()); // Enable CORS
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
}

// Health check endpoint for Docker/Portainer (define before other routes)
server.get('/api/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'CU3D Backend is healthy',
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    status: 'ok'
  };
  
  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = 'Health check failed';
    healthcheck.status = 'error';
    res.status(503).json(healthcheck);
  }
});

// Simple health check without API prefix
server.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

server.use(routes); // Use existing routes
server.use('/api', routes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mst', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Start the server
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is listening at: ${PORT} - Click Here => http://localhost:${PORT}`);
});
