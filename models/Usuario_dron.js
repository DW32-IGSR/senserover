'use strict';

var mongoose = require('mongoose');

var userDronModel = function () {
    
    var userdronSchema = new mongoose.Schema({
        id_usuario: String,
        id_dron: String
    },{collection : 'dron'});  
    
    return mongoose.model('User_dron', userdronSchema);
};

module.exports = new userDronModel();// Export some model methods