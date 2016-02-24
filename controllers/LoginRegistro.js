var Usuario = require("../models/Usuario");
var Drones = require("../models/Drones");
var email= require('./Estructura_Email');

var moment = require('moment');
//var express = require('express');
//var validator = require('validator');
var passport = require('passport');

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = function(req, res, next) {

  // Validacion servidor
  req.assert('email', 'El email es requerido.').notEmpty();
  req.assert('email', 'Email no válido').isEmail();
  req.assert('password', 'La contraseña es requerida.').notEmpty();
  req.assert('password', 'Usa al menos 8 caracteres.').len(8, 20); //Hay que cambiar el valor 2 por 3
  
  //console.log(req);

  var errors = req.validationErrors();

  console.log('errores validacion: ' + errors);

  if (errors) {
    //req.flash('error', errors);
    //return res.redirect('/');
    
    return res.render('index', {
      flash: {
        clase: 'alert alert-danger',
        mensaje: "Ha ocurrido un error."
      }
    });
  }
  passport.authenticate('local', function(err, user, info) {
    //console.log('entro al passport');
    if (err) {
      //console.log('error de passport');
      return next(err);
    }
    if (!user) {
      //req.flash('errors', { msg: info.message });
      //console.log('distinto a user');
      //return res.redirect('/');
      return res.render('index', {
      flash: {
          clase: 'alert alert-danger',
          mensaje: "No existe ese correo."
        }
      });
    }
    req.logIn(user, function(err) {
      //console.log('entro a logIn');
      if (err) {
        console.log('error logIn');
        //return next(err);
        //return res.redirect('/');
        return res.render('index', {
        flash: {
            clase: 'alert alert-danger',
            mensaje: "Error al logearte."
          }
        });
      }
      //console.log('ruben: ' + user.usuario + " " + user.validated);
      //console.log('entro a logIn 2');

      Drones.find({
            'id_usuario': user.id
      }, function(err, drones_encontrados) {
          if (err) {
              console.log(err);
          }
          else {
              
              Drones.count({id_usuario: user.id}, function(err, dronesCant) {
                 
                 if (err) {
                      console.log(err);
                  }
                  
                  for (var i = 0; i < dronesCant; i++) {
                    
                      var fechaHoy = moment().format("YYYY-MM-DD");
                      
                      if (drones_encontrados[i].fecha_caducidad < fechaHoy) {
              		    Drones.findOneAndUpdate({ _id: drones_encontrados[i]._id }, { activo: false }, function(err, dron_cad) {
              		        if(err){
              		            console.log(err);
              		        }
              		        console.log("dron caducado");
              		    });
                  	}
                  }
              });
          }
      });
      //console.log('LLego');
      res.redirect(req.session.returnTo || req.get('referer'));
    });
  })(req, res, next);
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('usuario', 'Usuario es requerido.').notEmpty();
  req.assert('usuario', 'Usuario is not valid').len(3, 20);
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('password2', 'Passwords do not match').equals(req.body.password);

  console.log('Entro a registro');

  var errors = req.validationErrors();

  if (errors) {
    //req.flash('errors', errors);
    console.log('Error registro 1');
    //return res.redirect('/');
   return res.render('index', {
      flash: {
        clase: 'alert alert-danger',
        mensaje: "Ha ocurrido un error."
      }
    });
  }
    var chars = process.env.KEY_CHAR;
    var new_key = "";
    for (var i = 0; i < 32; i++) {
      new_key += chars[Math.floor(Math.random() * 35)];
    }
  
  var user = new Usuario({
    email: req.body.email,
    password: req.body.password,
    usuario: req.body.usuario,
    activacion_key: new_key
  });
  
  //console.log(user);
  
  Usuario.findOne({ $or: [{usuario: req.body.usuario}, {email: req.body.email}]}, function(err, existingUser) {
    if (existingUser) {
      //req.flash('errors', { msg: 'Account with that email address already exists.' });
     return res.render('index', {
      flash: {
          clase: 'alert alert-danger',
          mensaje: "Ese usuario ya existe."
        }
      });
      //return res.redirect('/');
    }
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      var nombre_remitente = 'Sense-Rover';
      var email_remitente = 'dw32igsr@gmail.com';
      var nombre_destinatario = req.body.usuario;
      var email_destinatario = req.body.email;
      var asunto = 'Registro en sense-rover';
      //var mensaje = "<h1>Hola " + nombre_destinatario + "!</h1><br><p>Gracias por registrarse en nuestro sitio.<br>Su cuenta ha sido creada, y debe ser activada antes de poder ser utilizada.<br>Para activar la cuenta, haga click en el siguiente enlace:</p><br><a href='http://senserover-terrestre.rhcloud.com/activate/" + new_key + "/" + email_destinatario + "'>Activar la cuenta</a>";
      var mensaje = "<h1>Hola " + nombre_destinatario + "!</h1><br><p>Gracias por registrarse en nuestro sitio.<br>Su cuenta ha sido creada, y debe ser activada antes de poder ser utilizada.<br>Para activar la cuenta, haga click en el siguiente enlace:</p><br><a href='http://" + req.headers.host + "/activate/" + new_key + "/" + email_destinatario + "'>Activar la cuenta</a>";

      email.estructura_email(req, res, nombre_remitente, email_remitente, nombre_destinatario, email_destinatario, asunto, mensaje);
      // Con esto se logea al registrarse directamente
      /*req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });*/
      res.render('index', {
        flash: {
          clase: 'alert alert-success',
          mensaje: "Te has registrado correctamente, ACTIVELO con el correo que ha recibido."
        }
      });
    });
  });
};