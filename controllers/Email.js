var Usuario = require("../models/Usuario");

var bcrypt = require('bcrypt-nodejs');

var estructura_email = require('./Estructura_Email');

exports.activacion = function(req, res, next) {
    console.log('llego a activacion');
    //ruta de activacion que se envia en el correo de activacion

    var key = req.params.activation;
    var email = req.params.email;

    // Validacion servidor
    req.assert('activation', 'La Activacion es requerida.').notEmpty();
    req.assert('activation', 'Activacion no cumple con la cantidad de caracteres.').len(32, 32);
    req.assert('email', 'El Email es requerido.').notEmpty();
    req.assert('email', 'Email no valido.').isEmail();
    req.assert('email', 'El email no cumple con la cantidad de caracteres.').len(3, 60);

    var errors = req.validationErrors();

    console.log(errors);

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

    Usuario.findOne({
        activacion_key: key,
        email: email
    }, function(err, user) {
        if (err) {
            console.log(err);
        }
        else if (user != null) {
            console.log('usuario encontrado');
            user.validated = true;
            user.save(function(err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Updated', user);
                    //guardado de sesion
                    //sess.usuario = usuario.usuario;
                    //sess.id_usuario = usuario._id;
                    res.redirect('/'); // esto hay que cmabiar a perfil
                }
            });
        }
        else {
            console.log('Usuario no encontrado');
            //res.redirect('/');
            return res.render('index', {
                flash: {
                    clase: 'alert alert-danger',
                    mensaje: "Usuario no encontrado."
                }
            });
        }
    });
};

exports.contacto = function(req, res) {
    //post de formulario de contacto
    //envio de correo a dw32igsr@gmail.com
    console.log("contactar");

    var form_nombre = req.body.nombre_contacto;
    var form_asunto = req.body.asunto_contacto;
    var form_email = req.body.email_contacto;
    var form_mensaje_contacto = req.body.mensaje_contacto;

    // Validacion servidor
    req.assert('nombre_contacto', 'El nombre de contacto es requerido.').notEmpty();
    req.assert('nombre_contacto', 'El nombre de contacto no cumple con la cantidad de caracteres.').len(3, 30);
    req.assert('asunto_contacto', 'El asunto es requerido.').notEmpty();
    req.assert('asunto_contacto', 'El asunto no cumple con la cantidad de caracteres.').len(3, 50);
    req.assert('email_contacto', 'El Email es requerido.').notEmpty();
    req.assert('email_contacto', 'Email no valido.').isEmail();
    req.assert('email_contacto', 'El email no cumple con la cantidad de caracteres.').len(3, 60);
    req.assert('mensaje_contacto', 'El mensaje es requerido.').notEmpty();
    req.assert('mensaje_contacto', 'El mensaje no cumple con la cantidad de caracteres.').len(5, 400);

    var errors = req.validationErrors();

    console.log(errors);

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

    var nombre_remitente = form_nombre;
    var email_remitente = form_email;
    var nombre_destinatario = 'Sense-Rover';
    var email_destinatario = 'dw32igsr@gmail.com';
    var asunto = 'Formulario de contacto: asunto: ' + form_asunto;
    var mensaje = "mensaje de: " + form_nombre + "<br><br>mensaje:<br>" + form_mensaje_contacto + "<br>email de contacto: " + form_email;

    estructura_email.estructura_email(req, res, nombre_remitente, email_remitente, nombre_destinatario, email_destinatario, asunto, mensaje);

    /*
    aqui va la parte del menasje para la persona que relleno el formulario de contacto
    mensaje de mensaje enviado
    */

    nombre_remitente = 'Sense-Rover';
    email_remitente = 'dw32igsr@gmail.com';
    nombre_destinatario = form_nombre;
    email_destinatario = form_email;
    asunto = "Formulario de contacto sense-rover: " + form_asunto;
    mensaje = "mensaje de contacto enviado<br><br>con el asunto:" + form_asunto + "<br><br>le responderemos lo antes posible" + "<br><br><h3>No responda a este mensaje</h3>";

    estructura_email.estructura_email(req, res, nombre_remitente, email_remitente, nombre_destinatario, email_destinatario, asunto, mensaje);
    //fin de mensaje de respuesta
    //res.redirect('/');
    return res.render('index', {
        flash: {
            clase: 'alert alert-success',
            mensaje: "Formulario enviado correctamente."
        }
    });
};

exports.forgetPassword = function(req, res) {

    var email = req.body.email;

    // Validacion servidor
    req.assert('email', 'El Email es requerido.').notEmpty();
    req.assert('email', 'Email no valido.').isEmail();
    req.assert('email', 'El email no cumple con la cantidad de caracteres.').len(3, 60);

    var errors = req.validationErrors();

    console.log(errors);

    if (errors) {
        //req.flash('error', errors);
        return res.redirect('/');
    }

    var chars = process.env.KEY_CHAR;
    var new_key = "";
    for (var i = 0; i < 32; i++) {
        new_key += chars[Math.floor(Math.random() * 35)];
    }

    Usuario.findOneAndUpdate({
        email: email
    }, {
        activacion_key: new_key
    }, function(err, usuario) {
        if (err) {
            console.log(err);
        }
        else if (usuario != null) {

            var nombre_remitente = 'Sense-Rover';
            var email_remitente = 'dw32igsr@gmail.com';
            var nombre_destinatario = usuario.usuario;
            var email_destinatario = email;
            var asunto = 'Reinicio de contraseña';
            var mensaje = "<h2>Hola " + usuario.usuario + "!</h2>" +
                "<p>Recientemente se ha enviado una solicitud de reinicio de tu contraseña para nuestra área de miembros.<br>" +
                "Si no solicitaste esto, por favor ignora este correo.<br>" +
                "Para reiniciar tu contraseña, por favor haga click en el siguiente enlance:</p><br>" +
                "<a href='http://" + req.headers.host + "/recoverPassword/" + new_key + "/" + email + "'>Restablecer contraseña</a>";

            estructura_email.estructura_email(req, res, nombre_remitente, email_remitente, nombre_destinatario, email_destinatario, asunto, mensaje);
            //res.redirect('/');
            res.render('index', {
                flash: {
                  clase: 'alert alert-success',
                  mensaje: "Revise el correo para restablecer la contraseña"
                }
            });
        }
        else {
            console.log('Email no encontrado');
            res.render('index', {
                flash: {
                  clase: 'alert alert-danger',
                  mensaje: "El correo no existe"
                }
            });
            /*req.flash('error', ' El correo no existe.');
            res.render('index', {
                expressFlash: req.flash('error'),
                sessionFlash: res.locals.sessionFlash
            });*/
        }
    });
};

exports.recoverPassword = function(req, res) {
    //ruta de activacion que se envia en el correo de activacion

    var key = req.params.key;
    var email = req.params.email;

    // Validacion servidor
    req.checkParams('key', 'La Key es requerida.').notEmpty();
    req.checkParams('key', 'Key no cumple con la cantidad de caracteres.').len(32, 32);
    req.checkParams('email', 'El Email es requerido.').notEmpty();
    req.checkParams('email', 'Email no valido.').isEmail();
    req.checkParams('email', 'El email no cumple con la cantidad de caracteres.').len(3, 60);

    var errors = req.validationErrors();

    console.log(errors);

    if (errors) {
        //req.flash('error', errors);
        return res.redirect('/');
    }

    Usuario.findOne({
        activacion_key: key,
        email: email
    }, function(err, usuario) {
        if (err) {
            console.log(err);
        }
        else if (usuario != null) {
            var datos = {
                user: usuario
            };
            res.render('recoverPassword', datos);
        }
        else {
            console.log('Error. No puedes recuperar la contraseña de ese correo.');
            res.redirect('/');
            /*res.render('index', {
                flash: {
                    clase: 'alert alert-danger',
                    mensaje: "No se puede recuperar la contraseña de ese correo"
                }
            });*/ // Se ve mal el menú y tapa el mensaje
        }
    });
};

exports.newPassword = function(req, res) {

    var key = req.body.key;
    var email = req.body.email;
    var nueva_pass = req.body.pass_nueva;
    var nueva_pass_conf = req.body.pass_nueva_conf;

    // Validacion servidor
    req.assert('key', 'La Key es requerida.').notEmpty();
    req.assert('key', 'Key no cumple con la cantidad de caracteres.').len(32, 32);
    req.assert('email', 'El Email es requerido.').notEmpty();
    req.assert('email', 'Email no valido.').isEmail();
    req.assert('email', 'El email no cumple con la cantidad de caracteres.').len(3, 60);
    req.assert('pass_nueva', 'La contraseña es requerida.').notEmpty();
    req.assert('pass_nueva', 'La contraseña Usa al menos 8 caracteres.').len(8, 20); //Hay que cambiar el valor 2 por 3
    req.assert('pass_nueva_conf', 'La contraseña2 es requerida.').notEmpty();
    req.assert('pass_nueva_conf', 'La contraseña Usa al menos 8 caracteres.').len(8, 20); //Hay que cambiar el valor 2 por 3
    req.assert('pass_nueva_conf', 'Passwords do not match').equals(req.body.pass_nueva);

    var errors = req.validationErrors();

    //console.log(errors);
    console.log('entro a new password');

    if (errors) {
        //req.flash('error', errors);
        return res.redirect('/');
    }

    if (nueva_pass != nueva_pass_conf) {
        console.log('Las contraseñas no coinciden');
    }
    else {
        console.log('else');
        bcrypt.genSalt(10, function(err, salt) {
            console.log('bcrypt');
            if (err) {
              return (err);
            }
            bcrypt.hash(nueva_pass_conf, salt, null, function(err, hash) {
                console.log('bcrypt hash');
                if (err) {
                    return (err);
                }
                Usuario.findOneAndUpdate({
                    activacion_key: key,
                    email: email
                }, {
                    password: hash
                }, function(err, user) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log('Se ha restablecido la contraseña correctamente');
                        //res.redirect('/');
                        res.render('index', {
                            flash: {
                              clase: 'alert alert-success',
                              mensaje: "Contraseña restablecida correctamente"
                            }
                        });
                    }
                });
            });
        });
    }
};