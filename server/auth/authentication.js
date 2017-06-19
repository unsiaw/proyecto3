var passport = require('passport');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var User = mongoose.model('User');
var utils = require('../utils');

module.exports.me_from_token = function (req, res) {

    let token = req.body.token;
    if(!req.body.token) {
        utils.sendJSONresponse(res, 400, { message: "No se recibió token" });
        return;
    }

    jwt.verify(token, config.session.secret_key, function(err, user) {
        if (err) {
            utils.sendJSONresponse(res, 400, { message: "Token expirado" });
            return;
        }

        User.findOne({ _id: user._id },'-hash -salt', function (err, user) {
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        });
    })
};

module.exports.register = function(req, res) {

    if(!req.body.name || !req.body.email || !req.body.password) {
        utils.sendJSONresponse(res, 400, {
            message: "Faltan completar campos"
        });
        return;
    }

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token" : token
        });
    });

};

module.exports.login = function(req, res) {

    if(!req.body.email || !req.body.password) {
        utils.sendJSONresponse(res, 400, {
            message: "Faltan completar campos"
        });
        return;
    }

    passport.authenticate('local', function(err, user, info){
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json({
                message: "Ocurrió un error inesperado"
            });
            return;
        }

        // If User was found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            // If user wasn't found
            res.status(401).json({
                message: "Usuario no existe o contraseña incorrecta"
            });
        }
    })(req, res);
};

module.exports.load_profile = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User.findById(req.payload._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });
    }

};
