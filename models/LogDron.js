'use strict';

var mongoose = require('mongoose');

var logDronesModel = function() {

    var logDronesSchema = new mongoose.Schema({
        id_dron: String,
        mensaje: String,
        fecha: String,
        hora: String
    }, {
        collection: 'logDrones'
    });

    return mongoose.model('logDrones', logDronesSchema);
};

module.exports = new logDronesModel();