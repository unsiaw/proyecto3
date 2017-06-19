var mongoose = require('mongoose');
var User = require('./model');

// TODO: Sanitizar para evitar inyecciones!
exports.list_all = function(req, res) {
    User.find({},'-salt -hash',function(err, user) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json(user);
    });
};

exports.list_one = function(req, res) {
    User.findById(req.params._id, '-salt -hash',function(err, user) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json(user);
    });
};

exports.create_user = function(req, res) {
    var new_user = new User({name: req.body.name, email: req.body.email, admin: false});
    new_user.setPassword(req.body.password);
    new_user.save(function(err, user) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json({id: user._id, name: user.name, email: user.email, admin: user.admin});
    });
};

exports.update_user = function(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, {new: true}, function(err, user) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json(user);
    });
};

exports.delete_user = function(req, res) {
    User.remove({
        _id: req.params.id
    }, function(err, user) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json({ message: 'User successfully deleted' });
    });
};
