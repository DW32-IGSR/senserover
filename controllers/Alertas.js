var mongoose = require('mongoose');
var Alertas  = mongoose.model('Alertas');

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
  var id_dron = req.body.id_dron_rango;
  var form_recibir_alertas = req.body.alertas_email;
  
  console.log('Id_dron: ' + id_dron);
  
  
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
  
  //errrores id_dron humedad
  
  /*var alerta = new Alertas({ id_dron: id_dron, temperatura: {min: form_tempMinima, max: form_tempMaxima}, humedad: {min: form_humMinima, max: form_humMaxima}, co2: {min: form_co2Minima, max: form_co2Maxima}, radiacion: {min: form_radMinima, max: form_radMaxima}, luminosidad: {min: form_luxMinima, max: form_luxMaxima}, bateria: {min: form_batMinima}})
  //guardar usuario en la base de datos
  alerta.save(function (err) {
    if (err) {
      console.log('save error', err)
    } else{
      console.log('rangos para '+id_dron+' guardados')
    }
  })*/
  



  res.redirect('/administracion');
};

exports.prueba = function(req, res) {
  //http://sense-rover-nohtrim.c9users.io/alertas/aa/tmin/1/tmax/2/hmin/3/hmax/4/cmin/5/cmax/6/rmin/7/rmax/8/lmin/9/lmax/10/bmin/11/bmax/12
  var id_dron = req.params.id_dron;
  var temperatura_min = req.params.tmin;
  var temperatura_max = req.params.tmax;
  var humedad_min = req.params.hmin;
  var humedad_max = req.params.hmax;
  var co2_min = req.params.cmin;
  var co2_max = req.params.cmax;
  var radiacion_min = req.params.rmin;
  var radiacion_max = req.params.rmax;
  var luminosidad_min = req.params.lmin;
  var luminosidad_max = req.params.lmax;
  var bateria_min = req.params.bmin;
  var bateria_max = req.params.bmax;
  
  console.log('Id_dron: ' + id_dron);
  console.log('Temperatura: ' + temperatura_min + ' ' + temperatura_max);
  console.log('Humedad: ' + humedad_min + ' ' + humedad_max);
  console.log('Co2: ' + co2_min + ' ' + co2_max);
  console.log('Radiación: ' + radiacion_min + ' ' + radiacion_max);
  console.log('Luminosidad: ' + luminosidad_min + ' ' + luminosidad_max);
  console.log('Bateria: ' + bateria_min + ' ' + bateria_max);
  
  //var alerta = new Alertas({ id_dron: id_dron, temperatura.min: temperatura_min, temperatura.max: temperatura_max, humedad.min: humedad_min, humedad.max: humedad_max, co2.min: co2_min, co2.max: co2_max, radiacion.min: radiacion_min, radiacion.max: radiacion_max, luminosidad.min: luminosidad_min, luminosidad.max: luminosidad_max, bateria.min: bateria_min, bateria.max: bateria_max })
  var alerta = new Alertas({ id_dron: id_dron, temperatura: {min: temperatura_min, max: temperatura_max}, humedad: {min: humedad_min, max: humedad_max}, co2: {min: co2_min, max: co2_max}, radiacion: {min: radiacion_min, max: radiacion_max}, luminosidad: {min: luminosidad_min, max: luminosidad_max}, bateria: {min: bateria_min, max: bateria_max}});
  //guardar usuario en la base de datos
  alerta.save(function (err) {
    if (err) {
      console.log('save error', err);
    } else{
      console.log('guardado');
    }
  });
};


exports.mensaje_alerta = function(dato, valor_actual, valor_minimo, valor_maximo) {
  
  var mensaje;
	mensaje = '<br>La ' + dato + ' está fuera del rango indicado';
	mensaje += '<br>La ' + dato + ' actual es de <span style="color:red">' + valor_actual + '</span> y el rango es de ' + valor_minimo + ' a ' + valor_maximo;
	
	return mensaje;
};