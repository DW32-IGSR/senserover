'use strict';

var mongoose = require('mongoose');

var dronesModel = function () {
    
    var dronSchema = new mongoose.Schema({
        id_producto: String,
        id_usuario: String
    },{collection : 'drones'});  
    
    return mongoose.model('Drones', dronSchema);
};

module.exports = new dronesModel();