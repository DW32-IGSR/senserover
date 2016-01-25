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
  
  Producto.findOne({ _id : id_producto }, function (err, datos_producto) {
    if(datos_producto!=null || datos_producto != undefined){
      console.log("dron encontrado")
      console.log("lunes otra vez")
      //console.log(datos_producto)
      console.log(datos_producto._doc.especificaciones[0].nombre)
      console.log(datos_producto._doc.especificaciones[0].valor)
      console.log(datos_producto._doc.opiniones[0].nombre)
      console.log(datos_producto._doc.opiniones[1].opinion)
      console.log("lunes otra vez") 
      Usuario.findOne({ _id : sess.id_usuario }, function (err, datos_usuario) {
        if(err) {
            console.log(err)
        } else {
          if(sess.usuario==""||sess.usuario==undefined) {
            var array_tienda = { datos_producto: datos_producto }
            //console.log("confirmacion 1"+array_tienda)
            res.render('comprar', array_tienda)
          } else { //si no redireccion a pagina de inicio
            var array_tienda = { datosUsuario:datos_usuario, datos_producto: datos_producto, nombre_usuario: sess.usuario }
            //console.log("confirmacion 2"+array_tienda)
            res.render('comprar', array_tienda)
          }
        }
      })
    } else {
      console.log("El dron no existe")
    }      
  })
}