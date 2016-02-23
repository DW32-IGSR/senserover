var Drones = require("../models/Drones");
var Usuario = require("../models/Usuario");
var Productos = require("../models/Productos");

exports.admin = function(req, res) {
     var user = req.user;
    //console.log(user.usuario);
    if (user == "" || user == undefined) {
        res.redirect('/');
    }
    else {
        Usuario.findOne({_id: user.id}, function(err, datos_usuario) {
            if (err) {
                console.log(err);
            }
            else {
                if (datos_usuario.admin) {
                    Productos.find({}, function(err, productos_encontrados) {
                        if (err) {
                            console.log(err);
                        } else {
                            //console.log('admin entro a productos');
                            Drones.find({}, function(err, drones_encontrados) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    //console.log('admin entro a drones');
                                    Usuario.find({}, function(err, usuarios_encontrados) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            /*
                                            for usuario {
                                            usuario=[]
                                            usuario.push(usuario.nombre)
                                              for drones{
                                                if dron.id_usuario==usuario._id
                                                usuario.push(dron)
                                              }
                                              usuarios.push(usuario)
                                            }
                                            */
                                            //for
                                            
                                            console.log('admin entro a usuarios');
                                            var arrays = {
                                                productos: productos_encontrados,
                                                drones: drones_encontrados,
                                                datosUsuarioTodos: usuarios_encontrados,
                                                datosUsuario: datos_usuario
                                            };
                                            //console.log('arrays: ' + arrays);
                                            res.render('admin', arrays);
                                        }
                                    });
                                }
                            });
                        } // find productos
                    });
                } else {
                    res.redirect('/');
                }
            } // find usuario by id
        });
    }
};