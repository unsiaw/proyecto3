var mongoose = require('mongoose');
var config = require('../../../config');

var commentSchemma = new mongoose.Schema({
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    texto: {
        type: String,
        required: true
    },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchemma);
