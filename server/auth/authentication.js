var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {

    if(!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
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
        sendJSONresponse(res, 400, {
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
