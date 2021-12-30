const router = require('express').Router();

router.use('/user', require('./userRoutes.js'));
router.use('/post', require('./postRoutes.js'));
router.use('/comment', require('./commentRoutes.js'));

module.exports = router;

