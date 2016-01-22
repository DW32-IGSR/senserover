'use strict';

var mongoose = require('mongoose');

var alertasModel = function () {
    
    var alertasSchema = new mongoose.Schema({
        id_dron: String,
        temperatura: {
             min: String,
             max: String
        },
        humedad: {
             min: String,
             max: String
        },
        co2: {
             min: String,
             max: String
        },
        radiacion: {
             min: String,
             max: String
        },
        luminosidad: {
             min: String,
             max: String
        },
        bateria: {
             min: String,
             max: String
        }
    },{collection : 'alertas'});  
    
    return mongoose.model('Alertas', alertasSchema);
};

module.exports = new alertasModel();