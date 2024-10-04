const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rsvps: [
    {
      name: { type: String, required: true },
      discordUsername: { type: String, required: true },
    }
  ]
});

module.exports = mongoose.model('Event', EventSchema);
