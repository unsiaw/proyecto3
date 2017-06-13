var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var passport = require('passport');

// Defining models
require('./server/models');
// So passport can use them later.
require('./server/auth/passport');

var routes = require('./server/routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// First, search on static/AngularJS files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));
// Initialize Passport
app.use(passport.initialize());
// Then, search for the rest of the routes.
app.use('/', routes);

// Connect to MongoDB
mongoose.connect(config.database);
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + config.database);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// Server starts listening
app.listen(config.port, config.hostname,  function() {
    console.log("Server listening at %s:%d", config.hostname, config.port);
});