const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

// Fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

module.exports = router;
