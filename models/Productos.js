'use strict';

var mongoose = require('mongoose');

var productosModel = function () {
    
    var productosSchema = new mongoose.Schema({
        nombre: String,
        descripcion: String,
        precio: String
    },{collection : 'productos'});  
    
    return mongoose.model('Productos', productosSchema);
};

module.exports = new productosModel();