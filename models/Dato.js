'use strict';

var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var datoModel = function() {

    var datoSchema = new mongoose.Schema({
        id_dron: String,
        temperatura: String,
        humedad: String,
        co2: String,
        radiacion: String,
        luminosidad: String,
        bateria: String,
        latitud: String,
        longitud: String,
        fecha: String,
        hora: String
    }, {
        collection: 'datos'
    });

    return mongoose.model('Dato', datoSchema);
};

module.exports = new datoModel();