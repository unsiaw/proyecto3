var mongoose = require('mongoose');
var Ong = require('./model');
var utils = require('../../utils');

// TODO: Sanitizar para evitar inyecciones!
exports.list_all = function(req, res) {
    Ong.find({},' -comentarios',function(err, ong) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json(ong);
    });
};

exports.list_one = function(req, res) {
    Ong.findById(req.params.id).populate('comentarios').exec(function(err, ong) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json(ong);
    });
};

exports.create_ong = function(req, res) {
    if (!req.user.admin) {
        utils.sendJSONresponse(res, 401, {message: "No esta autorizado a hacer esta acción"});
        return ;
    }
    var new_ong = new Ong(req.body);
    new_ong.save(function(err, ong) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json({id: ong._id, nombre: ong.nombre});
    });
};

exports.update_ong = function(req, res) {
    if (!req.user.admin) {
        utils.sendJSONresponse(res, 401, {message: "No esta autorizado a hacer esta acción"});
        return ;
    }
    Ong.findByIdAndUpdate(req.body._id, req.body, {new: true}, function(err, ong) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json(ong);
    });
};

exports.delete_ong = function(req, res) {
    if (!req.user.admin) {
        utils.sendJSONresponse(res, 401, {message: "No esta autorizado a hacer esta acción"});
        return ;
    }
    Ong.remove({
        _id: req.params.id
    }, function(err, ong) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json({ message: 'Ong successfully deleted' });
    });
};
