'use strict';

var mongoose = require('mongoose');

var opinionesProductoModel = function () {
    
    var opinionesproductoSchema = new mongoose.Schema({
        id_producto: String,
        opinion: String
    },{collection : 'opiniones'});  
    
    return mongoose.model('Opiniones_producto', opinionesproductoSchema);
};

module.exports = new opinionesProductoModel();