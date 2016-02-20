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
                            console.log('admin entro a productos');
                            Drones.find({}, function(err, drones_encontrados) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('admin entro a drones');
                                    Usuario.find({}, function(err, usuarios_encontrados) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('admin entro a usuarios');
                                            var arrays = {
                                                productos: productos_encontrados,
                                                drones: drones_encontrados,
                                                datosUsuario: usuarios_encontrados
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
    /*
    if (datos_usuario.admin) {
                    //busqueda de drones y productos y usuarios
                    Productos.find({}, function(err, productos_encontrados) {
                        
                    })
                    /*
                        var arrays = {
                            productos: productos_encontrados,
                            drones_perfil_todos: drones_todos,
                            drones_perfil: drones_propios,
                            datosUsuario_todos: datos_usuario_todos,
                            datosUsuario: datos_usuario,
                            diasRestantes: diasRestantesArray
                        };                    
                    */
                    //render res.render('perfil', arrays);
                    

                /*}
    */
};