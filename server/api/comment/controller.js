var mongoose = require('mongoose');
var Comment = require('./model');
var utils = require('../../utils');

var Ong = require('../ong/model');

// TODO: Sanitizar para evitar inyecciones!
exports.list_all = function(req, res) {
    Comment.find({},function(err, comentarios) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json(comentarios);
    });
};

exports.list_one = function(req, res) {
    Comment.findById(req.params.id,function(err, comentario) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        res.json(comentario);
    });
};

exports.create_comment = function(req, res) {
    console.log(req.body);
    console.log(req.params);
    var comentario = { texto: req.body.texto };
    Ong.findOneAndUpdate({_id:req.params.id},{$push: { comentarios: comentario }},{new:true},function(err, ong) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return;
        }
        console.log(ong);
        res.json(ong);
    });
    /*
    Ong.findOne({_id:req.params.id}, function(err, ong){
        if (err) {
            utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
            return ;
        }
        var new_comment = new Comment(req.body);
        ong.comentarios.push(new_comment);
        ong.save(function(err, ongWithComment) {
            if (err) {
                utils.sendJSONresponse(res, 400, {message: "No se pudo procesar la solicitud"});
                return ;
            }
            res.json(ongWithComment);
        });
    });*/
};

