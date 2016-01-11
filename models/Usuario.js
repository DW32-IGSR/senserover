'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userModel = function () {
    
    var userSchema = new mongoose.Schema({
        usuario: String,
        nombre: String,
        apellidos: String,
        dni: String,
        direccion: String,
        codigo_postal: String,
        pass: String,
        email: String,
        activacion_key: String,
        validated: Boolean
    },{collection : 'usuarios'});

    userSchema.methods.comp_validacion = function () {
        if(this.validated){
            return 'esta validado';
        }else{
            return 'no esta validado';
        }
    };
    
    userSchema.methods.activarUsuario = function () {
        if(this.validated){
            //no hacer nada
            return 'esta validado';
        }else{
            //update de usuario no validado
            return 'no esta validado';
        }
    };
    
    userSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.pass, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };    
    
    return mongoose.model('Usuario', userSchema);
};

module.exports = new userModel();