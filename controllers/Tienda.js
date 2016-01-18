var mongoose = require('mongoose')
var Usuario  = mongoose.model('Usuario')

exports.tienda = function(req, res) {
  //ruta a la tienda
  //pendiente cargar la pagina con la informacion de un producto
  //mediante /tienda/:id_producto
  
  var sess = req.session;
  console.log(sess.usuario)
  if(sess.usuario==""||sess.usuario==undefined) {
    res.render('comprar')
  } else { //si no redireccion a pagina de inicio

    Usuario.findOne({ _id : sess.id_usuario }, function (err, datos_usuario) {
        if(err) {
            console.log(err)
        } else {
            var array_datos_usuario = { datosUsuario:datos_usuario, nombre_usuario: sess.usuario }
            res.render('comprar', array_datos_usuario)
        }
    })
  }
};