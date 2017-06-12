var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var routes = require('./server/routes.js');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(config.port, config.hostname,  function() {
    console.log("Levantando el server en %s:%d", config.hostname, config.port);
});