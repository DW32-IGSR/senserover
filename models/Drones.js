'use strict';

var mongoose = require('mongoose');

var dronesModel = function () {
    
    var dronSchema = new mongoose.Schema({
        _id: String,
        id_producto: String,
        id_usuario: String,
        nombre: String
    },{collection : 'drones'});  
    
    return mongoose.model('Drones', dronSchema);
};

module.exports = new dronesModel();