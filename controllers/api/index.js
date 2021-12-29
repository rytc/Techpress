const router = require('express').Router();

router.use('/user', require('./userRoutes.js'));

module.exports = router;

