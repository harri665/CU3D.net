const express = require('express');
const router = express.Router();
// const Announcement = require('../models/Announcement');
const Announcement = require('../../models/Announcement')

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

module.exports = router;
