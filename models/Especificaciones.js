'use strict';

var mongoose = require('mongoose');

var especificacionesDronModel = function() {

    var especificacionesdronSchema = new mongoose.Schema({
        id_producto: String,
        especificacion: String
    }, {
        collection: 'especificaciones'
    });

    return mongoose.model('Especificaciones_productos', especificacionesdronSchema);
};

module.exports = new especificacionesDronModel();