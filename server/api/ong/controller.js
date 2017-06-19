var mongoose = require('mongoose');
var Ong = require('./model');

// TODO: Sanitizar para evitar inyecciones!
exports.list_all = function(req, res) {
    Ong.find({},function(err, ong) {
        if (err)
            res.send(err);
        res.json(ong);
    });
};

exports.list_one = function(req, res) {
    Ong.findById(req.params._id,function(err, ong) {
        if (err)
            res.send(err);
        res.json(ong);
    });
};

exports.create_ong = function(req, res) {
    var new_ong = new Ong({
        nombre: req.body.nombre,
        ubicacion: req.body.ubicacion,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        responsable: req.body.responsable,
        telefono: req.body.telefono
    });
    new_ong.save(function(err, ong) {
        if (err)
            res.send(err);
        res.json({id: ong._id, nombre: ong.nombre});
    });
};

exports.update_ong = function(req, res) {
    Ong.findOneAndUpdate(req.params.id, req.body, {new: true}, function(err, ong) {
        if (err)
            res.send(err);
        res.json(ong);
    });
};

exports.delete_ong = function(req, res) {
    Ong.remove({
        _id: req.params.id
    }, function(err, ong) {
        if (err)
            res.send(err);
        res.json({ message: 'Ong successfully deleted' });
    });
};
