var Usuario = require("../models/Usuario");
var Producto = require("../models/Productos");

exports.tienda = function(req, res) {
  //ruta a la tienda
  var sess = req.session;
  var id_producto = req.params.id_producto;
  sess.id_producto = req.params.id_producto;
  
  console.log('ID USUARIO: '+sess.id_usuario);
  console.log('User MIO: '+req.user);
  console.log('param: '+req.params.id_producto);

  Producto.findOne({
    _id: id_producto
  }, function(err, datos_producto) {
    if (err) {
      console.log(err);
    } else {
      if (datos_producto != null || datos_producto != undefined) {
        //console.log("dron encontrado")
        //console.log(datos_producto)
        //console.log(datos_producto._doc.especificaciones[0].nombre)
        //console.log(datos_producto._doc.especificaciones[0].valor)
        //console.log(datos_producto._doc.opiniones[0].nombre)
        //console.log(datos_producto._doc.opiniones[1].opinion)
        
        if (req.user == "" || req.user == undefined){
          console.log('Entro al primero');
          console.log('ID USUARIO 2: '+sess);
          
            if (sess.usuario == "" || sess.usuario == undefined) {
              console.log('Entro al segundo');
                var array_tienda = {
                  datos_producto: datos_producto
                };
                //console.log("confirmacion 1"+array_tienda)
                res.render('comprar', array_tienda);
            } else { //si no redireccion a pagina de inicio
              console.log('entro a req.session');
              var sess = req.session;
              Usuario.findOne({
                  _id: sess.id_usuario
                }, function(err, datos_usuario) {
                  if (err) {
                    console.log(err);
                  }
                  else {
            
                    var array_tienda = {
                      datosUsuario: datos_usuario,
                      datos_producto: datos_producto,
                      nombre_usuario: sess.usuario
                    };
                    //console.log("confirmacion 2"+array_tienda)
                    res.render('comprar', array_tienda);
                }
              });
            }
        } else {
            var sess = req.user;
            Usuario.findOne({
              _id: sess.id
            }, function(err, datos_usuario) {
              if (err) {
                console.log(err);
              }
              else {
                var array_tienda = {
                  datosUsuario: datos_usuario,
                  datos_producto: datos_producto,
                  nombre_usuarioGoogle: sess.profile.name,
                  avatarGoogle: sess.profile.picture
                };
                //console.log("confirmacion 2"+array_tienda)
                res.render('comprar', array_tienda);
              }
            });
         }
        
      } else {
        console.log("El dron no existe");
      }
    }
  });
};