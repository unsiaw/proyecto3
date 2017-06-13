var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../../config');
var auth = jwt({
    secret: config.session.secret_key,
    userProperty: 'payload'
});

var AuthController = require('./authentication');

// profile
router.get('/profile', auth, AuthController.load_profile);

// authentication
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;