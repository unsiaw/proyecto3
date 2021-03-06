var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var passport = require('passport');
var seeder = require('mongoose-seed');
var seedingData = require('./data');


// Defining models
require('./server/models');
// So passport can use them later.
require('./server/auth/passport');

var routes = require('./server/routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize Passport
app.use(passport.initialize());


// First, search on static/AngularJS files
app.use(express.static(path.join(__dirname, 'public')));
// Then, search for the rest of the routes.
app.use('/', routes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: "Invalid token"});
    }
});


// Connect to MongoDB via Mongoose
seeder.connect(config.database, function() {
    console.log('Seeding DB');
    // Load Mongoose models
    seeder.loadModels([
        'server/api/ong/model.js',
        'server/api/comment/model.js',
        'server/api/user/model.js'
    ]);

    // Clear specified collections
    seeder.clearModels(['Ong', 'Comment', 'User'], function() {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(seedingData, function() {
            console.log('Seeding ready');
        });

    });
});

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