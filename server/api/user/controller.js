var mongoose = require('mongoose');
var User = require('./model');

exports.list_all = function(req, res) {
    // Habria que sacar el hash y la password. Info sensible.
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.list_one = function(req, res) {
    User.findById(req.params._id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_user = function(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_user = function(req, res) {
    User.remove({
        _id: req.params.id
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};
