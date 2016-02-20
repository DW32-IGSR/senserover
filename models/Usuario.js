'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userModel = function() {

    var userSchema = new mongoose.Schema({
        email: { type: String, unique: true, lowercase: true },
        password: String,
        usuario: { type: String, unique: true},
        avatar: { type: String, default: '/dist/img/user2-160x160.jpg' },
        activacion_key: String,
        validated: { type: Boolean, default: 0 },
        ultima_conexion: { type: String , default: '' },
        
        nombre: String,
        apellidos: String,
        dni: String,
        direccion: String,
        codigo_postal: String,
        
        admin: { type: Boolean, default: 0 },
        
        google: String,
        tokens: Array
        
    }, {
        collection: 'usuarios'
    });

    userSchema.methods.comp_validacion = function() {
        if (this.validated) {
            return 'esta validado';
        }
        else {
            return 'no esta validado';
        }
    };

    userSchema.methods.activarUsuario = function() {
        if (this.validated) {
            //no hacer nada
            return 'esta validado';
        }
        else {
            //update de usuario no validado
            return 'no esta validado';
        }
    };
    
    /**
     * Password hash middleware. // Registro
     */
    userSchema.pre('save', function(next) {
      var user = this;
      if (!user.isModified('password')) {
        return next();
      }
      bcrypt.genSalt(10, function(err, salt) {
        
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, null, function(err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    });
    
    /**
     * Helper method for validating user's password.
     */
    userSchema.methods.comparePassword = function(candidatePassword, cb) {
      bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
          return cb(err);
        }
        cb(null, isMatch);
      });
    };

    return mongoose.model('Usuario', userSchema);
};

module.exports = new userModel();