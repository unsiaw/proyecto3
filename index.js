var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var routes = require('./server/routes');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/home', function(req, res){
    res.send('hello world');
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