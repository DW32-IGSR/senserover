var mongoose = require('mongoose');
var Usuario  = mongoose.model('Usuario');
var Productos  = mongoose.model('Productos');
var Drones  = mongoose.model('Drones');

exports.comprar = function(req, res) {
    //post del formulario de compra
    //insert en la bd el usuario y el dron que compro
    
    var sess = req.session;
    console.log('entro');
    
    if (sess.usuario==""||sess.usuario==undefined) {
        //algun mensaje de usuario no conectado
        //res.redirect('/')
        console.log("No estas logeado");
    } else { 
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
        req.assert('nombre_compra', 'Nombre usa al menos 3 a 20 caracteres.').len(3,20);
        req.assert('apellidos_compra', 'Los apellidos son requeridos.').notEmpty();
        req.assert('apellidos_compra', 'Apellidos usa al menos 3 a 20 caracteres.').len(3,20);
        req.assert('dni_compra', 'El DNI es requerido.').notEmpty();
        req.assert('dni_compra', 'El DNI usa al menos 9 caracteres.').len(9,9);
        req.assert('direccion_compra', 'La direccion es requerido.').notEmpty();
        req.assert('direccion_compra', 'La direccion usa al menos 3 a 50 caracteres.').len(3,50);
        req.assert('cp_compra', 'El CP es requerido.').notEmpty();
        req.assert('cp_compra', 'El CP usa al menos 5 caracteres.').len(5,5);
        req.assert('cp_compra', 'El CP tiene que ser numerico.').isInt();
        req.assert('email_compra', 'El email es requerido.').notEmpty();
        req.assert('email_compra', 'Email no valido.').isEmail();
        req.assert('producto_compra', 'El producto es requeridos.').notEmpty();
        req.assert('producto_compra', 'El producto usa al menos 3 a 20 caracteres.').len(3,20);
        req.assert('id_producto_compra', 'Tiene que ser un ID de mongodb valido.').isMongoId();
        
        var errors = req.validationErrors();
        
        console.log(errors)
        
        if (errors) {
          //req.flash('error', errors);
          return res.redirect('/');
        }
            
        // prueba ruben
        console.log('Nombre: ' + form_nombre)
        console.log('nombre pre compra: ' + form_nombre_producto)
        
        Usuario.findOneAndUpdate({ _id: sess.id_usuario }, { nombre: form_nombre, apellidos : form_apellidos, dni: form_dni, direccion : form_direccion, codigo_postal : form_cp }, function(err, user) {
            if (err) {
                console.error(err)
            } else {
                Productos.findOne({ _id: form_id_producto }, function (err, producto) {   
                    if (err) {
                        console.error(err)
                    } else {
                    
                        var form_nombre_final = form_nombre_producto
                        
                        buscar()
                        
                        function buscar(){
                            console.log(" busqueda ")
                            //console.log("¿nombre duplicado? "+form_nombre_final)
                            Drones.find({ nombre: form_nombre_final, 'id_usuario': sess.id_usuario }, function (err, resultados) {   
                                if (err) {
                                    console.error(err)
                                } else {        
                                    //console.log('ID Producto: ' + producto.id)
                                    var duplicados = resultados.length
                                    //console.log('Comprobación de duplicados: ' + duplicados)
                                    if(duplicados!=0){
                                        form_nombre_final+="*"
                                        //console.log('Form nombre producto: ' + form_nombre_final)
                                        buscar()
                                    } else {
                                        //console.log("no hay duplicados")
                                        //console.log("nombre final"+form_nombre_final)
                                        
                                        var fecha = new Date();
                                		var fecha = fecha.setHours(fecha.getHours()+1);
                                		//console.log("fecha en milisegundos " + fecha)
                                		var fecha=new Date(fecha);
                                		//console.log("fecha +1 "+ fecha);
                                		
                                		var fecha_caducidad;
                                		
                                		if (form_tipo_sub == 'basico') {
                                		    // básico
                                    		fecha_caducidad = fecha.getFullYear()+"-"+fecha.getMonth()+2+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
                                    		//console.log("fecha_caducidad1:"+fecha_caducidad)
                                		} else if (form_tipo_sub == 'estandar') {
                                		    // estandar
                                    		fecha_caducidad = fecha.getFullYear()+"-"+fecha.getMonth()+7+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
                                    		//console.log("fecha_caducidad1:"+fecha_caducidad)
                                		} else if (form_tipo_sub == 'profesional') {
                                		    //profesional
                                    		fecha_caducidad = fecha.getFullYear()+1+"-"+fecha.getMonth()+1+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
                                    		//console.log("fecha_caducidad2:"+fecha_caducidad)
                                		}
                                		
                                		// fecha_compra
                                		var fecha_compra = fecha.getFullYear()+"-"+fecha.getMonth()+1+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
                                		//console.log("fecha2:"+fecha_compra)
                                		
                                        var dron = new Drones ({ id_usuario : sess.id_usuario, id_producto : producto.id, nombre: form_nombre_final, tipo_subscripcion: form_tipo_sub, fecha_compra: fecha_compra, fecha_caducidad: fecha_caducidad, activo: true});
                                        dron.save(function (err) {
                                            if (err) {
                                              console.log('save error', err)
                                            }else {
                                                console.log('Compra realizada')
                                                //res.redirect('/perfil')
                                            }
                                        })
                                    }
                                }
                            }) // find
                        } //funcion buscar
                    } //else error
                }) //findone
            } //else error
        })//find update
        
        //despues de realizar la compra pasamos a perfil
        //donde vera que en la tabla de drones se añadio uno nuevo
        
        //en administracion no tiene datos ni alertas configuradas
        //res.redirect('/perfil')
    }
}