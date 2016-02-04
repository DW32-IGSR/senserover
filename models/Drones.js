'use strict';

var mongoose = require('mongoose');

var dronesModel = function() {

    var dronSchema = new mongoose.Schema({
        //_id: String,
        id_producto: String,
        id_usuario: String,
        nombre: String,
        tipo_subscripcion: String,
        fecha_compra: String,
        fecha_caducidad: String,
        activo: Boolean

    }, {
        collection: 'drones'
    });

    return mongoose.model('Drones', dronSchema);
};

module.exports = new dronesModel();