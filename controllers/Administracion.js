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

exports.updateName = function(req, res) {
  
  // Validacion servidor
  req.assert('id_dron_update', 'El nombre es requerido.').isMongoId();
  req.assert('name_dron', 'El nombre del dron es requerido.').notEmpty();
  req.assert('name_dron', 'Nombre usa al menos de 1 a 20 caracteres.').len(1, 20);

  var errors = req.validationErrors();
  
  if (errors) {
    //return res.redirect('/');
    return res.render('index', {
      flash: {
          clase: 'alert alert-danger',
          mensaje: "Ha ocurrido un error."
      }
    });
  }
  else {
    Drones.findOneAndUpdate({ _id: req.body.id_dron_update }, { nombre: req.body.name_dron }, function(err, dron_actualizado) {
      if(err){
          console.log(err);
      }
      console.log("Nombre del dron actualizado");
      res.redirect('/administracion');
    });
  }
};