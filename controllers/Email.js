var mongoose = require('mongoose')
var Usuario  = mongoose.model('Usuario')

exports.activacion = function(req, res) {
    //ruta de activacion que se envia en el correo de activacion
    
    var key = req.params.activation
    var email = req.params.email
    
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
                }
            })
        } else {
            console.log('Usuario no encontrado')
        }
    })
    
    res.redirect('/')
};

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
    };
    
    mailgun.messages().send(data, function (error, body) {
        console.log(body)
    });
    
    
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
    };
    
    mailgun.messages().send(data, function (error, body) {
        console.log(body)
    });  
    //fin de mensaje de respuesta
    
    res.redirect('/');
};