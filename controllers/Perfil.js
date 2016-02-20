var Drones = require("../models/Drones");
var Usuario = require("../models/Usuario");
//var Productos = require("../models/Productos");

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

exports.perfil = function(req, res) {
    //ruta a la pagina de perfil

    var user = req.user;
    //console.log(user.usuario);
    if (user == "" || user == undefined) {
        res.redirect('/');
    }
    else { //si no redireccion a pagina de inicio

        Usuario.findOne({
            _id: user.id
        }, function(err, datos_usuario) {
            if (err) {
                console.log(err);
            }
            else {
                Drones.find({
                    'id_usuario': user.id
                }, function(err, drones_propios) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        Drones.count({
                            id_usuario: user.id
                        }, function(err, dronesCant) {

                            if (err) {
                                console.log(err);
                            }

                            var diasRestantesArray = [];
                            for (var i = 0; i < dronesCant; i++) {

                                var fechaHoy = moment().format("Y-MM-DD");
                                var fechaCaducidadDron = moment(drones_propios[i].fecha_caducidad, 'Y-MM-DD');
                                var days = fechaCaducidadDron.diff(fechaHoy, 'days');

                                diasRestantesArray.push(days);

                                /*if (drones_propios[i].fecha_caducidad < fechaHoy) {
                        		    Drones.findOneAndUpdate({ _id: drones_propios[i]._id }, { activo: false }, function(err, dron_cad) {
                        		        if(err){
                        		            console.log(err);
                        		        }
                        		        console.log("dron caducado");
                        		    });
                            	}*/
                            }

                            var arrays = {
                                drones_perfil: drones_propios,
                                datosUsuario: datos_usuario,
                                diasRestantes: diasRestantesArray
                            };

                            res.render('perfil', arrays);
                        });
                    }
                }); //drones find
            }
        });
    }
};

exports.datosPerfil = function(req, res) {
    //ruta a la pagina de perfil

    var user = req.user;
    //console.log(user.usuario);
    if (user == "" || user == undefined) {
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
                _id: user.id
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
                    /*res.render('perfil', {
                      flash: {
                        clase: 'alert alert-success',
                        mensaje: "Perfil actualizado correctamente."
                      }
                    });*/
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


    // Validacion servidor
    req.assert('pass_actual', 'La contraseña es requerida.').notEmpty();
    req.assert('pass_actual', 'La contraseña Usa al menos 8 caracteres.').len(8, 20); //Hay que cambiar el valor 2 por 3
    req.assert('pass_nueva', 'La contraseña es requerida.').notEmpty();
    req.assert('pass_nueva', 'La contraseña Usa al menos 8 caracteres.').len(8, 20); //Hay que cambiar el valor 2 por 3
    req.assert('pass_nueva_conf', 'La contraseña2 es requerida.').notEmpty();
    req.assert('pass_nueva_conf', 'La contraseña Usa al menos 8 caracteres.').len(8, 20); //Hay que cambiar el valor 2 por 3
    req.assert('pass_nueva_conf', 'Passwords do not match').equals(req.body.pass_nueva);
    req.assert('id_usuario', 'La ID usuario no es de MONGO.').isMongoId();

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
                        console.log('isMatch');
                        bcrypt.genSalt(10, function(err, salt) {
                            if (err) {
                                return (err);
                            }
                            bcrypt.hash(pass_nueva_conf, salt, null, function(err, hash) {
                                if (err) {
                                    return (err);
                                }
                                Usuario.findOneAndUpdate({
                                    _id: id_usuario
                                }, {
                                    password: hash
                                }, function(err, user) {
                                    if (err) {
                                        console.error(err);
                                    }
                                    else {
                                        console.log('La contraseña se ha restablecido correctamente');
                                        res.redirect('/perfil');
                                    }
                                });

                            });
                        });
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