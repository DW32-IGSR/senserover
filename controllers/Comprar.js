var Drones = require("../models/Drones");
var Usuario = require("../models/Usuario");
var Productos = require("../models/Productos");
var Alertas = require("../models/Alertas");
var HistorialPedidos  = require("../models/HistorialPedidos");

var estructura_email = require('./Estructura_Email');
var moment = require('moment');

exports.comprar = function(req, res) {
    //post del formulario de compra
    //insert en la bd el usuario y el dron que compro

    var sess = req.session;
    console.log('entro');

    if (sess.usuario == "" || sess.usuario == undefined) {
        //algun mensaje de usuario no conectado
        //res.redirect('/')
        console.log("No estas logeado");
    }
    else {
        console.log("comprar");

        //variables de formulario
        //los importantes usuario, direccion y producto
        var form_nombre = req.body.nombre_compra;
        var form_apellidos = req.body.apellidos_compra;
        var form_dni = req.body.dni_compra;
        var form_direccion = req.body.direccion_compra;
        var form_cp = req.body.cp_compra;
        //posible error revisar
        var form_email = req.body.email_compra;
        var form_nombre_producto = req.body.producto_compra;
        var form_id_producto = req.body.id_producto_compra;
        var form_tipo_sub = req.body.tipo_subscripcion;

        // basico --> 1mes
        // estandar --> 6meses
        // profesional --> 12meses

        // Validacion servidor
        req.assert('nombre_compra', 'El nombre es requerido.').notEmpty();
        req.assert('nombre_compra', 'Nombre usa al menos 3 a 20 caracteres.').len(3, 20);
        req.assert('apellidos_compra', 'Los apellidos son requeridos.').notEmpty();
        req.assert('apellidos_compra', 'Apellidos usa al menos 3 a 20 caracteres.').len(3, 20);
        req.assert('dni_compra', 'El DNI es requerido.').notEmpty();
        req.assert('dni_compra', 'El DNI usa al menos 9 caracteres.').len(9, 9);
        req.assert('direccion_compra', 'La direccion es requerido.').notEmpty();
        req.assert('direccion_compra', 'La direccion usa al menos 3 a 50 caracteres.').len(3, 50);
        req.assert('cp_compra', 'El CP es requerido.').notEmpty();
        req.assert('cp_compra', 'El CP usa al menos 5 caracteres.').len(5, 5);
        req.assert('cp_compra', 'El CP tiene que ser numerico.').isInt();
        req.assert('email_compra', 'El email es requerido.').notEmpty();
        req.assert('email_compra', 'Email no valido.').isEmail();
        req.assert('producto_compra', 'El producto es requeridos.').notEmpty();
        req.assert('producto_compra', 'El producto usa al menos 3 a 20 caracteres.').len(3, 20);
        req.assert('id_producto_compra', 'Tiene que ser un ID de mongodb valido.').isMongoId();

        var errors = req.validationErrors();

        console.log(errors);

        if (errors) {
            return res.redirect('/');
        }
        else {

            // prueba ruben
            console.log('Nombre: ' + form_nombre);
            console.log('nombre pre compra: ' + form_nombre_producto);

            Usuario.findOneAndUpdate({
                _id: sess.id_usuario
            }, {
                nombre: form_nombre,
                apellidos: form_apellidos,
                dni: form_dni,
                direccion: form_direccion,
                codigo_postal: form_cp
            }, function(err, user) {
                if (err) {
                    console.error(err);
                }
                else {
                    Productos.findOne({
                        _id: form_id_producto
                    }, function(err, producto) {
                        if (err) {
                            console.error(err);
                        }
                        else {

                            var form_nombre_final = form_nombre_producto;

                            buscar();

                            function buscar() {
                                //console.log(" busqueda ");
                                //console.log("¿nombre duplicado? "+form_nombre_final)
                                Drones.find({
                                    nombre: form_nombre_final,
                                    'id_usuario': sess.id_usuario
                                }, function(err, resultados) {
                                    if (err) {
                                        console.error(err);
                                    }
                                    else {
                                        //console.log('ID Producto: ' + producto.id)
                                        var duplicados = resultados.length;
                                        //console.log('Comprobación de duplicados: ' + duplicados)
                                        if (duplicados != 0) {
                                            form_nombre_final += "*";
                                            //console.log('Form nombre producto: ' + form_nombre_final)
                                            buscar();
                                        }
                                        else {
                                            //console.log("no hay duplicados")
                                            //console.log("nombre final"+form_nombre_final)
                                            
                                            var fecha_compra = moment().format("Y-MM-DD");
                                            var hora_compra = moment().utcOffset("+0100").format("HH:mm:ss");

                                            var fecha_caducidad;

                                            if (form_tipo_sub == 'basico') {
                                                // básico
                                                //fecha_caducidad = fecha.getFullYear() + "-" + (fecha.getMonth() + 2) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                                                //console.log("fecha_caducidad1:"+fecha_caducidad)
                                                fecha_caducidad =  moment(fecha_compra).add(1, 'months').format('Y-MM-DD');
                                            }
                                            else if (form_tipo_sub == 'estandar') {
                                                // estandar
                                                //fecha_caducidad = fecha.getFullYear() + "-" + (fecha.getMonth() + 7) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                                                //console.log("fecha_caducidad1:"+fecha_caducidad)
                                                fecha_caducidad =  moment(fecha_compra).add(7, 'months').format('Y-MM-DD');
                                            }
                                            else if (form_tipo_sub == 'profesional') {
                                                //profesional
                                                //fecha_caducidad = fecha.getFullYear() + 1 + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
                                                //console.log("fecha_caducidad2:"+fecha_caducidad)
                                                fecha_caducidad =  moment(fecha_compra).add(1, 'months').add(1, 'year').format('Y-MM-DD');
                                            }

                                            var dron = new Drones({
                                                id_usuario: sess.id_usuario,
                                                id_producto: producto.id,
                                                nombre: form_nombre_final,
                                                tipo_subscripcion: form_tipo_sub,
                                                fecha_compra: fecha_compra,
                                                fecha_caducidad: fecha_caducidad,
                                                hora_compra: hora_compra,
                                                activo: true
                                            });
                                            dron.save(function(err) {
                                                if (err) {
                                                    console.log('save error', err);
                                                }
                                                else {
                                                    console.log('Compra realizada');
                                                    
                                                    var regAccion = new HistorialPedidos ({ id_dron : dron._id, id_usuario: user._id, accion: 'comprar', fecha_accion: fecha_compra, hora_accion: hora_compra, tipo_subscripcion_viejo: null, tipo_subscripcion_nuevo: form_tipo_sub, fecha_caducidad: fecha_caducidad});
                                                    regAccion.save(function (err) {
                                                        if (err) {
                                                          console.log('save error', err);
                                                        }else {
                                                        }
                                                    });
                                                    
                                                    //en pruebas
                                                    console.log("pre intento crear room "+dron._id);
                                                	//var io = req.app.io;
                                                	//socket.emit('create', roomname);
                                                    //io.sockets.emit('create', dron._id);
                                                    req.app.io.emit('create', dron._id);
                                                    console.log("post create");
                                                    //en pruebas

                                                    var nombre_remitente = 'Sense-Rover';
                                                    var email_remitente = 'dw32igsr@gmail.com';
                                                    var nombre_destinatario = user.usuario;
                                                    var email_destinatario = user.email;
                                                    var asunto = 'Compra del dron ' + dron.nombre;
                                                    var mensaje = "<h1>Hola " + nombre_destinatario + "!</h1><br><p>Acabas de comprar el producto " + producto.nombre + " con el nombre " + dron.nombre + " con el tipo de subscripción " + form_tipo_sub + "</p>";

                                                    estructura_email.estructura_email(req, res, nombre_remitente, email_remitente, nombre_destinatario, email_destinatario, asunto, mensaje);

                                                    var alertas = new Alertas({
                                                        id_dron: dron._id,
                                                        recibir_alertas: false
                                                    });

                                                    alertas.save(function(err) {
                                                        if (err) {
                                                            console.log('save error', err);
                                                        }
                                                        else {
                                                            console.log('Alerta configurada');
                                                            //res.redirect('/perfil')
                                                        }

                                                    });
                                                    //res.redirect('/perfil')
                                                }
                                            });
                                        }
                                    }
                                }); // find
                            } //funcion buscar
                        } //else error
                    }); //findone
                } //else error
            }); //find update

            //despues de realizar la compra pasamos a perfil
            //donde vera que en la tabla de drones se añadio uno nuevo

            //en administracion no tiene datos ni alertas configuradas
            //res.redirect('/perfil')
        }
    }
};

exports.renovarSubscripcion = function(req, res) {
    var sess = req.session;
    //console.log('entro');

    if (sess.usuario == "" || sess.usuario == undefined) {
        //algun mensaje de usuario no conectado
        //res.redirect('/')
        console.log("No estas logeado");
    }
    else {
        console.log("renovar");

        var id_dron = req.body.id_dron_renovar;

        Drones.findOne({
            _id: id_dron
        }, function(err, dron_encontrado) {
            //pendiente tratamiento de error
            console.log(err);

            var fecha_caducidad_antigua = dron_encontrado.fecha_caducidad;

            Usuario.findOne({
                _id: dron_encontrado.id_usuario
            }, function(err, usuario) {
                //pendiente tratamiento de error
                
                console.log(err);
                var nombre_remitente = 'Sense-Rover';
                var email_remitente = 'dw32igsr@gmail.com';
                var nombre_destinatario = usuario.usuario;
                var email_destinatario = usuario.email;
                var asunto = 'Renovación del dron ' + dron_encontrado.nombre;
                
                var fecha_renovar = moment().format("Y-MM-DD");
                var hora_renovar = moment().utcOffset("+0100").format("HH:mm:ss");

                if (req.body.hasOwnProperty("btn_form_renovar_estandar")) {

                    var fecha = moment(fecha_caducidad_antigua).format("Y-MM-DD");
                    console.log("Fecha caducidad antigua: "+fecha);
                    
                    var fecha_final =  moment(fecha).add(6, 'months').format('Y-MM-DD');
                    
                    console.log("Fecha final: "+fecha_final);


                    Drones.findOneAndUpdate({
                        _id: id_dron
                    }, {
                        tipo_subscripcion: 'estandar',
                        fecha_caducidad: fecha_final
                    }, function(err, dron_actualizado) {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            console.log('Renovación realizada');
                            
                            /*fecha = fecha.setHours(fecha.getHours()+1);
                    		//console.log("fecha en milisegundos " + fecha)
                    		fecha = new Date(fecha);
                            var fecha_accion = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();*/
                            //var fecha_caducidad = fecha.getFullYear()+"-"+(fecha.getMonth()+7)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
                            
                            var regAccion = new HistorialPedidos ({ id_dron : id_dron, id_usuario: usuario._id, accion: 'renovar', fecha_accion: fecha_renovar, hora_accion: hora_renovar, tipo_subscripcion_viejo: dron_encontrado.tipo_subscripcion, tipo_subscripcion_nuevo: 'estandar', fecha_caducidad: fecha_final});
                            regAccion.save(function (err) {
                                if (err) {
                                  console.log('save error', err);
                                }else {
                                }
                            });
                            
                            // Crear mensaje de renovación
                            var mensaje = "<h1>Hola " + nombre_destinatario + "!</h1><br><p>Has renovado durante seis meses más la subscripción estándar del dron " + dron_encontrado.nombre + "<br>La nueva fecha de caducidad es: " + fecha_final + "</p>";

                            estructura_email.estructura_email(req, res, nombre_remitente, email_remitente, nombre_destinatario, email_destinatario, asunto, mensaje);
                        }
                    });
                }

                if (req.body.hasOwnProperty("btn_form_renovar_profesional")) {

                    
                    var fecha = moment(fecha_caducidad_antigua).format("Y-MM-DD");
                    console.log("Fecha caducidad antigua: "+fecha);
                    
                    var fecha_caducidad_nueva =  moment(fecha).add(1, 'year').format('Y-MM-DD');
                    
                    console.log("Fecha final: "+fecha_caducidad_nueva);

                    Drones.findOneAndUpdate({
                        _id: id_dron
                    }, {
                        tipo_subscripcion: 'profesional',
                        fecha_caducidad: fecha_caducidad_nueva
                    }, function(err, dron_actualizado) {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            console.log('Renovación realizada');
                            
                            /*fecha = fecha.setHours(fecha.getHours()+1);
                    		//console.log("fecha en milisegundos " + fecha)
                    		fecha = new Date(fecha);
                            var fecha_accion = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();*/
                            //var fecha_caducidad = fecha.getFullYear()+1+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
                            
                            var regAccion = new HistorialPedidos ({ id_dron : id_dron, id_usuario: usuario._id, accion: 'renovar', fecha_accion: fecha_renovar, hora_accion: hora_renovar, tipo_subscripcion_viejo: dron_encontrado.tipo_subscripcion, tipo_subscripcion_nuevo: 'profesional', fecha_caducidad: fecha_caducidad_nueva});
                            regAccion.save(function (err) {
                                if (err) {
                                  console.log('save error', err);
                                }else {
                                }
                            });
                            
                            // Crear mensaje de renovaciónombre_destinatario
                            var mensaje = "<h1>Hola " + nombre_destinatario + "!</h1><br><p>Has renovado durante un año más la subscripción profesional del dron " + dron_encontrado.nombre + "<br>La nueva fecha de caducidad es: " + fecha_caducidad_nueva + "</p>";
                            estructura_email.estructura_email(req, res, nombre_remitente, email_remitente, nombre_destinatario, email_destinatario, asunto, mensaje);
                        }
                    });
                }
            });
        });
    }
};