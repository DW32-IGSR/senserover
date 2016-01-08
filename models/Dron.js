'use strict';

var mongoose = require('mongoose');

var dronModel = function () {
    
    var dronSchema = new mongoose.Schema({
        nombre: String,
        descripcion: String,
        precio: String,
        bateria: String,
    },{collection : 'dron'});  
    
    return mongoose.model('Dron', dronSchema);
};

module.exports = new dronModel();