exports.estructura_email = function(req, res, nombre_remitente, email_remitente, nombre_destinatario, email_destinatario, asunto, msg) {
    var api_key = 'key-116da3f3cd011ad01d454a632a599587';
    var domain = 'sandboxe7f47692877a4fd6b2115e79c3ce660d.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    var mensaje = msg;
    
    console.log('Nombre remitente: ' + nombre_remitente);
    console.log('Email remitente: ' + email_remitente);
    
    console.log('Nombre destinatario: ' + nombre_destinatario);
    console.log('Email destinatario: ' + email_destinatario);
    
    console.log('Asunto: ' + asunto);
    console.log('Mensaje: ' + msg);
    
    var data = {
        from: nombre_remitente + ' <' + email_remitente + '>',
        to: email_destinatario,
        subject: asunto,
        html: mensaje
    };
    
    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
};