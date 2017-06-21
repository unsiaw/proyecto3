var mongoose = require('mongoose');
var config = require('../../../config');

var commentSchemma = new mongoose.Schema({
    autor: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchemma);
