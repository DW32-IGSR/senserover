var Drones = require("../models/Drones");

exports.admin = function(req, res) {
  //ruta a administracion
  //posible ruta /administracion/:id_dron

  //comprobar que hay sesion
  var user = req.user;
  //console.log("sesion usuario: "+sess.usuario);
  if (user == "" || user == undefined) {
    res.redirect('/');
  }
  else { //si no redireccion a pagina de inicio

    Drones.find({
      'id_usuario': user.id
    }, function(err, drones_encontrados) {
      if (err) {
        console.log(err);
      }
      else {
        
        var array_admin = {
          drones: drones_encontrados,
          datosUsuario: user
        };
        //var nombre_usuario=sess.usuario
        //console.log('nombre miercoles '+sess.usuario)
        //res.render('administracion', { nombre_usuario: sess.usuario })
        res.render('administracion', array_admin);
      }
    });
  }
};