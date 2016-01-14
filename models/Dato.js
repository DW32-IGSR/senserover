'use strict';

var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var datoModel = function () {
    
    var datoSchema = new mongoose.Schema({
        id_dron: String,
        temperatura: String,
        humedad: String,
        co2: String,
        radiacion: String,
        luminosidad: String,
        fecha: String
    },{collection : 'datos'});
    
    /*
    {
        "_id": {
            "$oid": "566b17e8bc1973d60d8b4567"
        },
        "temperatura": "21.5",
        "humedad": "2",
        "co2": "5",
        "radiacion": "2",
        "luminosidad": "16",
        "fecha": "2015-12-11 18:37:28"
    }
    */

    /*userSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.pass, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };  
    
    datoSchema.methods.activarUsuario = function () {
        if(this.validated){
            //no hacer nada
            return 'esta validado';
        }else{
            //update de usuario no validado
            return 'no esta validado';
        }
    };
    
    datoSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.pass, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };*/  
    
    return mongoose.model('Dato', datoSchema);
};

module.exports = new datoModel();

/*

// https://carlosazaustre.es/blog/como-crear-una-api-rest-usando-node-js/
// https://github.com/carlosazaustre/node-api-rest-example/tree/feature-express4

// --- Para API (Sin comprobar) ---

exports = module.exports = function(app, mongoose) {

    var datoSchema = new mongoose.Schema({
        temperatura: { type: String },
        humedad: { type: String },
        co2: { type: String },
        radiacion: { type: String },
        luminosidad: { type: String },
        fecha: { type: String }
    }

	mongoose.model('Dato', datoSchema);

};

*/