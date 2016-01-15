var mongoose = require('mongoose')
var Drones  = mongoose.model('Drones')

exports.perfil = function(req, res) {
    //ruta a la pagina de perfil
    
    var sess = req.session;
    console.log(sess.usuario)
    if(sess.usuario==""||sess.usuario==undefined) {
        res.redirect('/')  
    } else { //si no redireccion a pagina de inicio
    
        //pendiente
        //busqueda de dronde del usuario
        //sin comprobar
        Drones.find({ 'usuario': sess.usuario }, function (err, drones) {
            // dron es un array
            console.log(drones)
        });
        //sin comprobar  
        var array_perfil={nombre_usuario: sess.usuario}
        res.render('perfil', array_perfil)
    }
};