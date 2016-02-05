var Drones = require("../models/Drones");
var Usuario = require("../models/Usuario");

var bcrypt = require('bcrypt');
var moment = require('moment');

exports.perfil = function(req, res) {
    //ruta a la pagina de perfil

    var sess = req.session;
    console.log(sess.usuario);
    if (sess.usuario == "" || sess.usuario == undefined) {
        res.redirect('/');
    }
    else { //si no redireccion a pagina de inicio

        Usuario.findOne({
            _id: sess.id_usuario
        }, function(err, datos_usuario) {
            if (err) {
                console.log(err);
            }
            else {
                Drones.find({
                    'id_usuario': sess.id_usuario
                }, function(err, drones_encontrados) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        /*
                        var unDia = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                        
                        var fechaActual = new Date();
                        fechaActual.setHours(fechaActual.getUTCHours()+1);
                        var dateFormat = require('dateformat');
                        dateFormat(fechaActual, "Y-n-j");
                        
                        
                        console.log(fechaActual);
                        console.log(drones_encontrados);
                        var fechaCaducidad = drones_encontrados[1].fecha_caducidad;
                        
                        console.log(fechaCaducidad);
                        
                        var diffDias = Math.round(Math.abs((fechaActual.getTime() - fechaCaducidad.getTime()) / (unDia)));
                        
                        var fechaCaducidad = drones_encontrados[1].fecha_caducidad;
                        console.log(fechaCaducidad);
                        var fechaActual = moment().format("Y-MM-DD");
                        var fechaCaducidad2 = moment([fechaCaducidad]).format("Y-M-D");
                        //console.log("Es esto: "+now);
                        console.log("Es esto: "+fechaCaducidad2);
                        
                        //console.log(moment().format("Y-MM-DD"));
                        var a = moment([2016, 2, 04]);
                        var b = moment([2016, 2, 06]);
                        var result = b.diff(a, 'days')
                        console.log(result);               
                        */

                        //var array_perfil = { drones_perfil:drones_encontrados, nombre_usuario: sess.usuario };
                        //var array_perfil_datos = { datos_perfil:datos_usuario };
                        var arrays = {
                            drones_perfil: drones_encontrados,
                            datos_perfil: datos_usuario,
                            nombre_usuario: sess.usuario
                        };
                        //var arrays = {array_perfil, array_perfil_datos} // No funciona
                        res.render('perfil', arrays);
                    }
                });
            }
        });
    }
};

exports.datosPerfil = function(req, res) {
    //ruta a la pagina de perfil

    var sess = req.session;
    console.log(sess.usuario);
    if (sess.usuario == "" || sess.usuario == undefined) {
        res.redirect('/');
    }
    else { //si no redireccion a pagina de inicio

        var form_nombre = req.body.nombre;
        var form_apellidos = req.body.apellidos;
        var form_dni = req.body.dni;
        var form_direccion = req.body.direccion;
        var form_cp = req.body.cp;
        var form_email = req.body.email;

        console.log('Nombre: ' + form_nombre);
        console.log('Apellidos: ' + form_apellidos);
        console.log('DNI: ' + form_dni);
        console.log('Dirección: ' + form_direccion);
        console.log('Código Postal: ' + form_cp);
        console.log('Email: ' + form_email);

        // Validacion servidor
        req.assert('nombre', 'El nombre es requerido.').notEmpty();
        req.assert('nombre', 'Nombre usa al menos 3 a 20 caracteres.').len(3, 20);
        req.assert('apellidos', 'Los apellidos son requeridos.').notEmpty();
        req.assert('apellidos', 'Apellidos usa al menos 3 a 20 caracteres.').len(3, 20);
        req.assert('dni', 'El DNI es requerido.').notEmpty();
        req.assert('dni', 'El DNI usa al menos 9 caracteres.').len(9, 9);
        req.assert('direccion', 'La direccion es requerido.').notEmpty();
        req.assert('direccion', 'La direccion usa al menos 3 a 50 caracteres.').len(3, 50);
        req.assert('cp', 'El CP es requerido.').notEmpty();
        req.assert('cp', 'El CP usa al menos 5 caracteres.').len(5, 5);
        req.assert('cp', 'El CP tiene que ser numerico.').isInt();
        req.assert('email', 'El email es requerido.').notEmpty();
        req.assert('email', 'Email no valido.').isEmail();

        var errors = req.validationErrors();

        console.log(errors);

        if (errors) {
            return res.redirect('/');
        }
        else {
            Usuario.findOneAndUpdate({
                _id: sess.id_usuario
            }, {
                nombre: form_nombre,
                apellidos: form_apellidos,
                dni: form_dni,
                direccion: form_direccion,
                codigo_postal: form_cp,
                email: form_email
            }, function(err, user) {
                if (err) {
                    console.error(err);
                }
                else {
                    user.save(function(err) {
                        if (err) {
                            console.log('save error', err);
                        }
                    });
                    res.redirect('/perfil');
                } //else error
            }); //find update
        }
    }
};

exports.changePassword = function(req, res) {
    var pass_actual = req.body.pass_actual;
    var pass_nueva = req.body.pass_nueva;
    var pass_nueva_conf = req.body.pass_nueva_conf;
    var id_usuario = req.body.id_usuario;

    var salt = bcrypt.genSaltSync(10);
    //pendiente revisar
    var pass_coded_actual = bcrypt.hashSync(pass_actual, salt);
    var pass_coded_nueva = bcrypt.hashSync(pass_nueva, salt);

    Usuario.findOne({
        _id: id_usuario
    }, function(err, usuario) {
        if (err) {
            console.error(err);
        }
        else {
            if (usuario != null) {

                usuario.comparePassword(pass_actual, function(err, isMatch) {
                    if (err) throw err;

                    if (isMatch) {
                        console.log('bien');
                        if (bcrypt.compareSync(pass_nueva_conf, pass_coded_nueva)) {
                            Usuario.findOneAndUpdate({
                                _id: id_usuario
                            }, {
                                pass: pass_coded_nueva
                            }, function(err, user) {
                                if (err) {
                                    console.error(err);
                                }
                                else {
                                    console.log('La contraseña ha sido cambiada correctamente');
                                }
                            });
                        }
                        else {
                            console.log('Las contraseñas no coinciden');
                        }

                    }
                    else {
                        console.log('No coincide la contraseña actual');
                    }
                });
            }
            else {
                console.log('No se puede cambiar la contraseña de ese usuario');
            }
        }
    });
};