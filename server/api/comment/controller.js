var Comment = require('./model');
var utils = require('../../utils');
var Ong = require('../ong/model');
var constants = require('../../constants');

// TODO: Sanitizar para evitar inyecciones!
exports.list_all = function(req, res) {
    Comment.find({},function(err, comentarios) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: constants.CANNOT_PROCESS_REQ});
            return ;
        }
        res.json(comentarios);
    });
};

exports.list_one = function(req, res) {
    Comment.findById(req.params.id,function(err, comentario) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: constants.CANNOT_PROCESS_REQ});
            return ;
        }
        res.json(comentario);
    });
};

exports.create_comment = function(req, res) {
    var comentario = { autor: req.body.autor, texto: req.body.texto };
    Ong.findOneAndUpdate({_id:req.params.id},{$push: { comentarios: comentario }},{new:true},function(err, ong) {
        if (err) {
            utils.sendJSONresponse(res, 400, {message: constants.CANNOT_PROCESS_REQ});
            return;
        }
        res.json(ong);
    });
};

