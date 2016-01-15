var mongoose = require('mongoose')
var Drones  = mongoose.model('Drones')

exports.admin = function(req, res) {
    //ruta a administracion
    //posible ruta /administracion/:id_dron
    
    //comprobar que hay sesion
    var sess = req.session;
    //console.log("sesion usuario: "+sess.usuario);
    if(sess.usuario==""||sess.usuario==undefined) {
        res.redirect('/')  
    } else { //si no redireccion a pagina de inicio
    
        Drones.find({ 'id_usuario': sess.id_usuario }, function (err, drones_encontrados) {
          if(err){
            console.log(err)
          }else{
            //drones={drones:drones}
          	  var array_admin={drones:drones_encontrados, nombre_usuario: sess.usuario}
          	  //var nombre_usuario=sess.usuario
          	  //console.log('nombre miercoles '+sess.usuario)
          	  //res.render('administracion', { nombre_usuario: sess.usuario })
          	  res.render('administracion', array_admin)
          }      
        });
    }
};