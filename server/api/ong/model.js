var mongoose = require('mongoose');
var config = require('../../../config');

var ongSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum : ['Niños y adolescentes','Ancianos', 'Familia', 'Comedores', 'Educación', 'Salud', 'Personas con discapacidad', 'Indigencia', 'Reinserción social', 'Medio ambiente', 'Animales', 'Otros'],
        default: 'Otros'
    },
    ubicacion: {
        type: String,
        required: true
    },
    latitud: {
        type: String
    },
    longitud: {
        type: String
    },
    responsable: {
        type: String
    },
    telefono: {
        type: String,
    }
});

module.exports = mongoose.model('Ong', ongSchema);
