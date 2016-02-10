var Drones = require("../models/Drones");
var Usuario = require("../models/Usuario");

var bcrypt = require('bcrypt');
var moment = require('moment');

exports.perfil = function(req, res) {
    //ruta a la pagina de perfil

    if (req.user == "" || req.user == undefined) {
        //console.log('Cumplo la primera condición ');
        if (req.session == "" || req.session == undefined) {
            //console.log('Cumplo la segunda condición ');
            res.render('/');
        }
        else {
            //console.log('Entro return 1 ');
            var sess = req.session;

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

                            Drones.count({
                                id_usuario: sess.id_usuario
                            }, function(err, dronesCant) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('Tiene ' + dronesCant + ' Drones');

                                var arrays = {
                                    drones_perfil: drones_encontrados,
                                    datos_perfil: datos_usuario,
                                    nombre_usuario: sess.usuario,
                                };
                                var prueba = [];
                                for (var i = 0; i < dronesCant; i++) {

                                    var a = moment().format("Y-MM-DD");
                                    var b = moment(drones_encontrados[i].fecha_caducidad, 'Y-MM-DD');
                                    var days = b.diff(a, 'days');

                                    console.log('Fecha ' + i + 'Dias que faltan: ' + days);

                                    prueba.push({
                                        days
                                    });

                                    //console.log('Resultado array ' + diasRestantes.days);
                                }

                                /*var prueba = [
                                    {variable:"contenido 1"},
                                    {variable:"contenido 2"},
                                    {variable:"contenido 3"}
                                ];*/


                                //console.log(arrays);
                                //var arrays = {array_perfil, array_perfil_datos} // No funciona
                                res.render('perfil', arrays);


                            });

                            /* var fechaActual = moment().format("Y-MM-DD");
                             var fechaCaducidad = moment(drones_encontrados.fecha_caducidad);
                             fechaActual.diff(fechaCaducidad, 'days');*/

                            /*
                            var hoy = moment(new Date());//todays date
                            var final = moment("2016-06-1"); // another date
                            var duration = moment.duration(final.diff(hoy));
                            var dias = duration.asDays();
                            console.log('dias: ' + dias);
                            
                                var now = moment(new Date()); //todays date
                                var end = moment("2016-12-1"); // another date
                                var duration = moment.duration(now.diff(end));
                                var days = duration.asDays();
                                console.log(days)
                            */

                            /*
                                // Funciona
                                var a = moment('2016-02-04', 'Y-MM-DD');
                                var b = moment('2016-02-06', 'Y-MM-DD');
                                var days = b.diff(a, 'days');
                                
                                console.log('ruben fecha: ' + days);
                            */

                            /* EL QUE FUNCIONA
                            var a = moment().format("Y-MM-DD");
                            var b = moment('2016-02-07', 'Y-MM-DD');
                            var days = b.diff(a, 'days');
                            
                            console.log('Dias que faltan: ' + days); */

                        }
                    });
                }
            });
        }

    }
    else {
        //console.log('Entro return 2 ');
        var sess = req.user;
        console.log(sess.id);

        Usuario.findOne({
            _id: sess.id
        }, function(err, datos_usuario) {
            if (err) {
                console.log(err);
            }
            else {
                Drones.find({
                    'id_usuario': sess.id
                }, function(err, drones_encontrados) {
                    if (err) {
                        console.log(err);
                    }
                    else {

                        Drones.count({
                            id_usuario: sess.id
                        }, function(err, dronesCant) {
                            console.log('Tiene ' + dronesCant + ' Drones');

                            var arrays = {
                                drones_perfil: drones_encontrados,
                                datos_perfil: datos_usuario,
                                nombre_usuarioGoogle: sess.profile.name,
                                avatarGoogle: sess.profile.picture
                            };
                            console.log(arrays);
                            var prueba = [];
                            for (var i = 0; i < dronesCant; i++) {

                                var a = moment().format("Y-MM-DD");
                                var b = moment(drones_encontrados[i].fecha_caducidad, 'Y-MM-DD');
                                var days = b.diff(a, 'days');

                                console.log('Fecha ' + i + 'Dias que faltan: ' + days);

                                prueba.push({
                                    days
                                });

                                //console.log('Resultado array ' + diasRestantes.days);
                            }
                            res.render('perfil', arrays);

                        });
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
    //console.log(req.user);
    if (sess.usuario == "" || sess.usuario == undefined) {
        console.log('Cumplo la primera condición ');
        if (req.user == "" || req.user == undefined) {
            console.log('Cumplo la segunda condición ');
            res.redirect('/');
        }
        else {
            console.log('Entro en UPDATE ');
            var sess = req.user;
            console.log(sess.id);
            console.log(sess.nombre);


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
                    _id: sess.id
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