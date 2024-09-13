const router = require('express').Router();
const userRoutes = require('./users');
const annoucementRoutes = require('./announcement')
const postRoutes = require('./posts')
const eventsRoutes = require('./events');
const embedRoutes = require('./embedRoutes');


router.use('/discord', embedRoutes);

router.use('/events', eventsRoutes);
router.use('/users', userRoutes);
router.use('/announcements',annoucementRoutes); 
router.use('/posts',postRoutes); 

module.exports = router;
