var mongoose = require('mongoose');
var Productos  = mongoose.model('Productos');

exports.addProducto = function(req, res) {
    var producto = new Productos ({ nombre : 'Producto 2', descripcion : 'Descripción producto 2', precio : '200' });
    
    //guardar usuario_dron en la base de datos
    producto.save(function (err) {
        if (err) {
            console.log('save error', err);
        }
    });
};