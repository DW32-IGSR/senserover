var Alertas  = require("../models/Alertas");

var validadarAPI = require('./validadarAPI');

exports.update = function(req, res) {
  //post de formulario de registro
  //envio de correo de activacion
  console.log("actualizacion de alertas");
  
  var sess = req.session;
  
  var form_tempMinima = req.body.tempMinima;
  var form_tempMaxima = req.body.tempMaxima;
  var form_humMinima = req.body.humMinima;
  var form_humMaxima = req.body.humMaxima; 
  var form_co2Minima = req.body.co2Minima;
  var form_co2Maxima = req.body.co2Maxima;
  var form_radMinima = req.body.radMinima;
  var form_radMaxima = req.body.radMaxima;
  var form_luxMinima = req.body.luxMinima;
  var form_luxMaxima = req.body.luxMaxima ; 
  var form_batMinima = req.body.batMinima;
  var id_dron = req.body.id_dron_alertas;
  var form_recibir_alertas = req.body.alertas_email;
  
  console.log('Id_dron: ' + req.body.id_dron_alertas);
  console.log('Id_dron: ' + id_dron);
  
	// Validacion por servidor
	var validado = validadarAPI.APIconfAlertas(req, res);
	if (validado) {
    console.log("Usuario: " + sess.usuario +" cambiando alertas");
    //console.log(recibir_alertas)
    // no = undefined
    // si = on
    
    if (form_recibir_alertas != undefined) {
      form_recibir_alertas = true;
    } else {
      form_recibir_alertas = false;
    }
  
    Alertas.findOneAndUpdate({ id_dron: id_dron }, { temperatura: {min: form_tempMinima, max: form_tempMaxima}, humedad: {min: form_humMinima, max: form_humMaxima}, co2: {min: form_co2Minima, max: form_co2Maxima}, radiacion: {min: form_radMinima, max: form_radMaxima}, luminosidad: {min: form_luxMinima, max: form_luxMaxima}, bateria: {min: form_batMinima}, recibir_alertas: form_recibir_alertas}, function(err, alerta) {
      if (err) {
          console.error(err);
        } else {
          if (alerta != undefined) {
            // Cuando ya ha configurado al menos una vez las alertas
            console.log('rangos para '+id_dron+' guardados');
          } else {
            // Cuando es la primera vez que configura las alertas
            var i_alerta = new Alertas({ id_dron: id_dron, temperatura: {min: form_tempMinima, max: form_tempMaxima}, humedad: {min: form_humMinima, max: form_humMaxima}, co2: {min: form_co2Minima, max: form_co2Maxima}, radiacion: {min: form_radMinima, max: form_radMaxima}, luminosidad: {min: form_luxMinima, max: form_luxMaxima}, bateria: {min: form_batMinima},recibir_alertas: form_recibir_alertas});
  
            i_alerta.save(function (err) {
              if (err) {
                console.log('save error', err);
              } else{
                console.log('rangos para '+id_dron+' guardados');
              }
            });
          }
        }
    });
    res.redirect('/administracion');
  	} else {
  		return res.redirect('/404');
  	}
};

exports.mensaje_alerta = function(dato, valor_actual, valor_minimo, valor_maximo) {
  
  var mensaje;
  console.log('dato: ' + dato)
  console.log('valor_actual: ' + valor_actual)
  console.log('valor_minimo: ' + valor_minimo)
  console.log('valor_maximo: ' + valor_maximo)
	mensaje = '<br>La ' + dato + ' está fuera del rango indicado';
	mensaje += '<br>La ' + dato + ' actual es de <span style="color:red">' + valor_actual + '</span> y el rango es de ' + valor_minimo + ' a ' + valor_maximo;
	
	return mensaje;
};