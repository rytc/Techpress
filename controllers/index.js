const router = require("express").Router();

router.use('/', require('./homeRoutes.js'))

module.exports = router