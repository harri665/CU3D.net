const express = require('express');
const cors = require('cors');
const server = express();
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');

server.use(cors()); // Enable CORS

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
}



server.use(routes); // Use routes
server.use('/api', routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mst', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(
    `Server is listening at: ${PORT} - Click Here => http://localhost:${PORT}`
  );
});
