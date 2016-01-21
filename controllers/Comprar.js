var mongoose = require('mongoose')
var Usuario  = mongoose.model('Usuario')
var Productos  = mongoose.model('Productos')
var Drones  = mongoose.model('Drones')

exports.comprar = function(req, res) {
    //post del formulario de compra
    //insert en la bd el usuario y el dron que compro
    
    var sess = req.session
    console.log('entro')
    
    if (sess.usuario==""||sess.usuario==undefined) {
        //algun mensaje de usuario no conectado
        //res.redirect('/')
        console.log("No estas logeado")
    } else { 
        console.log("comprar")
        
        //variables de formulario
        //los importantes usuario, direccion y producto
        var form_nombre = req.body.nombre_compra
        var form_apellidos = req.body.apellidos_compra
        var form_dni = req.body.dni_compra
        var form_direccion = req.body.direccion_compra
        var form_cp = req.body.cp_compra
        var form_email = req.body.email_compra
        var form_nombre_producto = req.body.producto_compra
        var form_id_producto = req.body.id_producto_compra
        //pendiente tipo de subscripcion
        //var form_sub = req.body.subscripcion  
        
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
                                        var dron = new Drones ({ id_usuario : sess.id_usuario, id_producto : producto.id, nombre: form_nombre_final });
                                        dron.save(function (err) {
                                            if (err) {
                                              console.log('save error', err)
                                            }else {
                                                console.log('Compra realizada')
                                                //Aqui viene flash de success
                                            }
                                        })
                                    }
                                }
                            }) // find
                        } //funcion buscar
                    } //else error
                }) //findone
            } //else error
        });//find update
        
        //despues de realizar la compra pasamos a perfil
        //donde vera que en la tabla de drones se añadio uno nuevo
        
        //en administracion no tiene datos ni alertas configuradas
        res.redirect('/perfil')
    }
};