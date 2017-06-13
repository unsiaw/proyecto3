const express = require('express');
const router = express.Router();


//router.use('/auth', require('./auth/auth.route'));
router.use('/api', require('./api/routes'));

module.exports = router;
