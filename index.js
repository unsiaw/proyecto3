var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var routes = require('./server/routes');
//var xFrameOptions = require('x-frame-options');
//var helmet = require('helmet');

var app = express();

// TODO: Some Middlewares to avoid headers exploits.
/*
app.use(xFrameOptions());
app.use(helmet());

app.get('/', function (req, res, next) {
    res.get('X-Frame-Options');
    next();
});
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// First, search on static/angularJS files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));
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