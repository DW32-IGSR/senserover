'use strict';

var mongoose = require('mongoose');

var historialPedidosModel = function () {
    
    var historialPedidosSchema = new mongoose.Schema({
        id_dron: String,
        id_usuario: String,
        accion: String, // comprar || renovar
        fecha_accion: String,
        hora_accion: String,
        tipo_subscripcion_viejo: String,
        tipo_subscripcion_nuevo: String, // basico || estandar || profesional
        fecha_caducidad: String
    },{collection : 'historialPedidos'});  
    
    return mongoose.model('historialPedidos', historialPedidosSchema);
};

module.exports = new historialPedidosModel();