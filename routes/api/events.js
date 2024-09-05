const express = require('express');
const router = express.Router();
const Event = require('../../models/Event');

// Fetch all events
router.get('/', async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });
  
  module.exports = router;
// RSVP to an event
// RSVP to an event
router.post('/:id/rsvp', async (req, res) => {
    const { name, discordUsername } = req.body;
  
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Store the RSVP information
      const rsvpData = { name, discordUsername };
  
      // Add the RSVP data if not already added
      if (!event.rsvps.some(rsvp => rsvp.discordUsername === discordUsername)) {
        event.rsvps.push(rsvpData); // Push the RSVP object with name and discordUsername
        await event.save();
        return res.json({ message: 'RSVP successful', event });
      } else {
        return res.status(400).json({ message: 'User already RSVP\'d' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error processing RSVP' });
    }
  });

module.exports = router;
