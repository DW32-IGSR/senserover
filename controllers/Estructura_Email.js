exports.estructura_email = function(req, res, nombre_remitente, email_remitente, nombre_destinatario, email_destinatario, asunto, msg) {
    var api_key = process.env.MAILGUN_PASSWORD;
    var domain = process.env.MAILGUN_USER;
    var mailgun = require('mailgun-js')({
        apiKey: api_key,
        domain: domain
    });
    var mensaje = msg;

    var data = {
        from: nombre_remitente + ' <' + email_remitente + '>',
        to: email_destinatario,
        subject: asunto,
        html: mensaje
    };

    mailgun.messages().send(data, function(error, body) {
        console.log(body);
    });
};