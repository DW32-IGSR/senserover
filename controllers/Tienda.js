var mongoose = require('mongoose')
var Usuario  = mongoose.model('Usuario')
var Producto  = mongoose.model('Productos')

exports.tienda = function(req, res) {
  //ruta a la tienda
  //pendiente cargar la pagina con la informacion de un producto
  //mediante /tienda/:id_producto
  
  var sess = req.session;
  var id_producto = req.params.id_producto
  sess.id_producto = req.params.id_producto
  
  console.log(sess.usuario)
  if(sess.usuario==""||sess.usuario==undefined) {
    res.render('comprar')
  } else { //si no redireccion a pagina de inicio

    Usuario.findOne({ _id : sess.id_usuario }, function (err, datos_usuario) {
      if(err) {
          console.log(err)
      } else {
        Producto.findOne({ _id : id_producto }, function (err, datos_producto) {
          if(datos_producto!=null || datos_producto != undefined){
            var array_tienda = { datosUsuario:datos_usuario, datos_producto: datos_producto, nombre_usuario: sess.usuario }
            res.render('comprar', array_tienda)
          } else {
            console.log("El dron no existe")
          }
          /*var array_datos_usuario = { datosUsuario:datos_usuario, nombre_usuario: sess.usuario }
          res.render('comprar', {layout: 'main.handlebars'}, array_datos_usuario)*/
        })
      }
    })
  }
};