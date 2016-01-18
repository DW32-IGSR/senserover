var mongoose = require('mongoose')
var Usuario  = mongoose.model('Usuario')
var bcrypt = require('bcrypt')

exports.activacion = function(req, res) {
    //ruta de activacion que se envia en el correo de activacion
    
    var key = req.params.activation
    var email = req.params.email
    var sess = req.session;
    
    Usuario.findOne({activacion_key: key, email: email}, function (err, usuario) {
        if (err) {
            console.log(err)
        } else if (usuario!=null) {
            usuario.validated = true
            usuario.save(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Updated', usuario)
                    //guardado de sesion
                    sess.usuario=usuario.usuario;
                    sess.id_usuario=usuario._id;
                    res.redirect('/perfil')
                }
            })
        } else {
            console.log('Usuario no encontrado')
            res.redirect('/')
        }
    })
}

exports.contacto = function(req, res) {
    //post de formulario de contacto
    //envio de correo a dw32igsr@gmail.com
    console.log("contactar")
    
    var form_nombre = req.body.nombre_contacto
    var form_asunto = req.body.asunto_contacto
    var form_email = req.body.email_contacto
    var form_mensaje_contacto = req.body.mensaje_contacto
    
    // Mailgun
    var api_key = 'key-116da3f3cd011ad01d454a632a599587'
    var domain = 'sandboxe7f47692877a4fd6b2115e79c3ce660d.mailgun.org'
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
    var mensaje = "mensaje de: "+form_nombre+"<br><br>mensaje:<br>"+form_mensaje_contacto+"<br>email de contacto: "+form_email
    
    var data = {
        from: form_nombre + ' <' + form_email + '>',
        to: "dw32igsr@gmail.com",
        subject: "Formulario de contacto: asunto:"+form_asunto,
        html: mensaje
    }
    
    mailgun.messages().send(data, function (error, body) {
        console.log(body)
    })
    
    
    /*
    aqui va la parte del menasje para la persona que relleno el formulario de contacto
    mensaje de mensaje enviado
    */
    
    var mensaje = "mensaje de contacto enviado<br><br>con el asunto:"
                    +form_asunto+"<br><br>le responderemos lo antes posible"
                    +"<br><br><h3>No responda a este mensaje</h3>"
    
    var data = {
        from: 'sense-rover <dw32igsr@gmail.com>',
        to: form_email,
        subject: "Formulario de contacto sense-rover: "+form_asunto,
        html: mensaje
    }
    
    mailgun.messages().send(data, function (error, body) {
        console.log(body)
    }) 
    //fin de mensaje de respuesta
    res.redirect('/');
}

exports.forgetPassword = function(req, res) {

    var email = req.body.email
    
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    var new_key = ""
    for (var i = 0; i < 32; i++) {
        new_key += chars[Math.floor(Math.random()*35)]
    }
    
    Usuario.findOneAndUpdate({email: email}, {activacion_key: new_key}, function (err, usuario) {
        if (err) {
            console.log(err)
        } else if (usuario!=null) {
            
            // Mailgun
            var api_key = 'key-116da3f3cd011ad01d454a632a599587'
            var domain = 'sandboxe7f47692877a4fd6b2115e79c3ce660d.mailgun.org'
            var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
            var mensaje = "<h2>Hola "+usuario.usuario+"!</h2>"+
                        "<p>Recientemente se ha enviado una solicitud de reinicio de tu contraseña para nuestra área de miembros.<br>"+
                        "Si no solicitaste esto, por favor ignora este correo.<br>"+
                        "Para reiniciar tu contraseña, por favor haga click en el siguiente enlance:</p><br>"+
                        "<a href='http://senserover-terrestre.rhcloud.com/recoverPassword/"+new_key+"/"+email+"'>Restablecer contraseña</a>"
            
            var data = {
                from: 'sense-rover <dw32igsr@gmail.com>',
                to: email,
                subject: "Reinicio de contraseña",
                html: mensaje
            };
            
            mailgun.messages().send(data, function (error, body) {
                console.log(body)
            });
        } else {
            console.log('Email no encontrado')
            req.flash('error', ' El correo no existe.');
            res.render('index', { expressFlash: req.flash('error'), sessionFlash: res.locals.sessionFlash });
        }
    })
};

exports.recoverPassword = function(req, res) {
    //ruta de activacion que se envia en el correo de activacion
    
    var key = req.params.key
    var email = req.params.email
    
    Usuario.findOne({activacion_key: key, email: email}, function (err, usuario) {
        if (err) {
            console.log(err)
        } else if (usuario!=null) {
            var datos = {user: usuario}
            res.render('recoverPassword', datos);
        } else {
            console.log('Error. No puedes recuperar la contraseña de ese correo')
            req.flash('error', '<strong>¡Error!</strong> No puedes recuperar la contraseña de ese correo.');
            res.render('index', { expressFlash: req.flash('error'), sessionFlash: res.locals.sessionFlash });
        }
    })
};

exports.newPassword = function(req, res) {
    
    var key = req.body.key
    var email = req.body.email
    var nueva_pass = req.body.pass_nueva
    var nueva_pass_conf = req.body.pass_nueva_conf
    
    if (nueva_pass != nueva_pass_conf) {
        console.log('Las contraseñas no coinciden')
    } else {
        var salt = bcrypt.genSaltSync(10);
        var pass_coded = bcrypt.hashSync(nueva_pass, salt);
              
        if (bcrypt.compareSync(nueva_pass_conf, pass_coded)) {
            Usuario.findOneAndUpdate({ activacion_key: key, email: email }, { pass: pass_coded }, function(err, user) {
                if (err) {
                    console.error(err)
                } else {
                    console.log('Se ha restablecido la contraseña correctamente')
                    res.redirect('/')
                }
            })
        } else {
            console.log('Las contraseñas no coinciden')
        }
    }
};