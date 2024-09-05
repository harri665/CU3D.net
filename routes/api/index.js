const router = require('express').Router();
const userRoutes = require('./users');
const annoucementRoutes = require('./announcement')

// Post Routes
router.use('/users', userRoutes);
router.use('/announcements',annoucementRoutes); 


module.exports = router;
