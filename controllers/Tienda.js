var Usuario = require("../models/Usuario");
var Producto = require("../models/Productos");

exports.tienda = function(req, res) {
  //ruta a la tienda
  var user = req.user;
  var id_producto = req.params.id_producto;
  //user.id_producto = req.params.id_producto;

  Producto.findOne({
    _id: id_producto
  }, function(err, datos_producto) {
    console.log(err);
    if (datos_producto != null || datos_producto != undefined) {
      //console.log("dron encontrado")
      //console.log(datos_producto)
      //console.log(datos_producto._doc.especificaciones[0].nombre)
      //console.log(datos_producto._doc.especificaciones[0].valor)
      //console.log(datos_producto._doc.opiniones[0].nombre)
      //console.log(datos_producto._doc.opiniones[1].opinion)
      if (user == "" || user == undefined) {
        console.log('entro')
        var array_tienda = {
          datos_producto: datos_producto
        };
        //console.log("confirmacion 1"+array_tienda)
        res.render('comprar', array_tienda);
      }
      else { //si no redireccion a pagina de inicio
         Usuario.findOne({
          _id: user.id
        }, function(err, datos_usuario) {
          if (err) {
            console.log(err);
          } else {
            var array_tienda = {
              datosUsuario: datos_usuario,
              datos_producto: datos_producto
            };
            //console.log("confirmacion 2"+array_tienda)
            res.render('comprar', array_tienda);
          }
        });
      }
    }
    else {
      console.log("El dron no existe");
      res.redirect('/');
    }
  });
};