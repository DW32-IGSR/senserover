var express = require('express')
  , router = express.Router()
  , bcrypt = require('bcrypt')
  , session = require('express-session')
  /*, app = express()
  , bodyParser = require("body-parser")
  , methodOverride = require("method-override")*/

  //http://sense-rover-nohtrim.c9users.io
  //http://senserover-terrestre.rhcloud.com/

var Dato = require('../models/Dato')
var Usuario = require('../models/Usuario')
//var Usuario_dron = require('../models/Usuario_dron')
var Drones = require('../models/Drones')
var Productos = require('../models/Productos')

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))

//parametros para la sesion
router.use(session({resave: true, saveUninitialized: true, secret: 'rubenonrails'}))

router.get('/', function(req, res) {
  //ruta de pagina principal
  var sess = req.session;
  if(sess.usuario==""||sess.usuario==undefined){
    res.render('index') 
  }else {
    //
    //render de index con idicadores de sesion iniciada
    //
    res.render('index')
  }
})

router.get('/administracion', function(req, res) {
  //ruta a administracion
  //posible ruta /administracion/:id_dron
  
  //comprobar que hay sesion
  var sess = req.session;
  //console.log("sesion usuario: "+sess.usuario);
  if(sess.usuario==""||sess.usuario==undefined){
    res.redirect('/')  
  }else { //si no redireccion a pagina de inicio
  
    Drones.find({ 'id_usuario': sess.id_usuario }, function (err, drones_encontrados) {
      if(err){
        console.log(err)
      }else{
        //drones={drones:drones}
  		  var array_drones={drones:drones_encontrados}
  		  res.render('administracion', array_drones)
      }      
    });
    //res.render('administracion')
  }  
})

router.get('/tienda', function(req, res) {
  //ruta a la tienda
  //pendiente cargar la pagina con la informacion de un producto
  //mediante /tienda/:id_producto
  
  res.render('comprar')
})

router.get('/perfil', function(req, res) {
  //ruta a la pagina de perfil
  
  var sess = req.session;
  console.log(sess.usuario)
  if(sess.usuario==""||sess.usuario==undefined){
    res.redirect('/')  
  }else { //si no redireccion a pagina de inicio
  
    //pendiente
    //busqueda de dronde del usuario
    //sin comprobar
      Drones.find({ 'usuario': sess.usuario }, function (err, drones) {
        // dron es un array
        console.log(drones)
      });
    //sin comprobar  
    
    res.render('perfil')
  }    
})

router.post('/rangofecha', function(req, res) {
  var dato_form = req.body.dato
  var fecha_inicio = req.body.Rango_fecha_inicio
  var fecha_final = req.body.Rango_fecha_final
  
  console.log('Dato: ' + dato_form)
  console.log('Fecha inicio: ' + fecha_inicio) // 2015-12-11
  console.log('Fecha final: ' + fecha_final) //2016-01-08

  Dato.find({fecha: {$ne: [fecha_inicio, fecha_final]}}, function (err, dato) {
  //Dato.find({fecha: {$ne: [fecha_inicio, fecha_final]}}, {temperatura: 1, _id: 0}, function (err, dato) {
  //Dato.find({fecha: {$lte: fecha_final}}, {temperatura: 1}, function (err, dato) { // Solo muestra el campo temperatura
    if (err){
      console.log('prueba ruben: error occured in the database')
    }
      console.log('prueba ruben ' + dato)
      //console.log("prueba humedad: "+dato[0].humedad)
  })
})

router.get('/cerrar', function(req, res) {
  //borrar datos de sesion
  req.session.destroy(function(err){
    if(err){
      console.log(err)
    } else {
      console.log("sesion cerrrada")
      res.redirect('/')
    }
  });
})  

router.post('/login', function (req, res) {
  //post de formulario de login
  //redireccion a administracion
  
  var sess = req.session;
  
  var form_usuario = req.body.usuario
  var form_pass = req.body.contrasenya
  
  console.log("Usuario login: " + form_usuario)
  console.log("Pass login: " + form_pass)
  
  Usuario.findOne({ usuario: form_usuario }, function (err, usuario) {   
    if (err) {
        console.error(err)
    }
    
    if (usuario!=null) {
      console.log('Find one usuario:' + usuario.usuario)

      usuario.comparePassword(form_pass, function(err, isMatch) {
        if (err) throw err
        
        console.log('comprobacion: ' + form_pass, isMatch)
        
        if (isMatch) {
          if (usuario.validated) {
            
            console.log('usuario validado')
            
            //crear sesion/cookie
            sess.usuario=usuario.usuario;
            sess.id_usuario=usuario._id;
            
            console.log(" id de usuario "+sess.id_usuario+" usuario "+sess.usuario)
            
            //res.render('administracion')
            res.redirect('/administracion')
          } else {
            console.log('usuario no validado')
            res.redirect('/')
          }
        } else {
          console.log('contraseña incorrecta')
          res.redirect('/')
          
        }                     
      })
    } else {
      if (!usuario) {
            console.log("Prueba gorka")
            /*return done(null, false, {
                message: 'El usuario introducido no está registrado'
            });*/
      }
      /* res.render("index.handlebars", {layout: 'main.handlebars', action: 'login', error: req.flash('error')
                    });*/
      console.log('usuario no registrado')
      //res.redirect('/')
    }    
  })
})

router.post('/register', function (req, res) {
  //post de formulario de registro
  //envio de correo de activacion
  console.log("registro")
  
  var form_usuario = req.body.usuario
  var form_email = req.body.email  
  var form_pass = req.body.contrasenya
  var form_pass2 = req.body.contrasenya2
  
  console.log("Usuario registro: " + form_usuario)
  //console.log("email registro: " + form_email)
  //console.log("Pass 1: " + form_pass)
  //console.log("Pass 2: " + form_pass2)
  
  Usuario.findOne({usuario: form_usuario}, function (err, usuario) {   
    if (err) {
        console.error(err)
    } else {
      
      if(usuario==null){
        console.log('el usuario no existe')
        
        var salt = bcrypt.genSaltSync(10);
        var pass_coded = bcrypt.hashSync(form_pass, salt);
        console.log(bcrypt.compareSync(form_pass2, pass_coded))
        console.log(pass_coded)
              
        if (bcrypt.compareSync(form_pass2, pass_coded)){
          var chars = "abcdefghijklmnopqrstuvwxyz0123456789"
          var new_key = ""
          for (var i = 0; i < 32; i++) {
              new_key += chars[Math.floor(Math.random()*35)]
          }
           
          // Mailgun
          var api_key = 'key-116da3f3cd011ad01d454a632a599587'
          var domain = 'sandboxe7f47692877a4fd6b2115e79c3ce660d.mailgun.org'
          var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
          
          var mensaje = "<h1>Hola " + form_usuario + "!</h1><br><p>Gracias por registrarse en nuestro sitio.<br>Su cuenta ha sido creada, y debe ser activada antes de poder ser utilizada.<br>Para activar la cuenta, haga click en el siguiente enlace:</p><br><a href='http://senserover-terrestre.rhcloud.com/activate/"+new_key+"/"+form_email+"'>Activar la cuenta</a>"
          
          var data = {
            from: 'sense-rover <postmaster@sandboxe7f47692877a4fd6b2115e79c3ce660d.mailgun.org>',
            to: form_email,
            subject: 'Registro en sense-rover',
            html: mensaje
          }
      
          //creacion de usuario
          //var usuario = new Usuario({usuario : form_usuario, pass : pass_coded, email : form_email, activacion_key : new_key, validated : 0})
          //var usuario = new Usuario({ _id: ,usuario : form_usuario, pass : pass_coded, email : form_email, activacion_key : new_key, validated : 0})
          var usuario = new Usuario({ usuario : form_usuario,nombre: null, apellidos : null, dni: null, direccion : null, codigo_postal : null, pass : pass_coded, email : form_email, activacion_key : new_key, validated : 0})
          
          //guardar usuario en la base de datos
          usuario.save(function (err) {
            if (err) {
              console.log('save error', err)
            } else{
              //envio de mensaje de activacion si no hay error
              mailgun.messages().send(data, function (error, body) {
                console.log(body)
              })
            }
          })
          
        } else {
            console.log('Las pass no es la misma')
        }
      } else {
        console.log('el usuario ya existe')
      }
    }  
  })
  //res.render("index.handlebars", {layout: 'index.handlebars', action: 'Register', error: req.flash('error'),});
  res.render("index.handlebars", {layout: 'main.handlebars', action: 'Register', error: req.flash('error')});
})  // /register

// Temporal para introducir productos
/*router.get('/productos', function (req, res) {
  var producto = new Productos ({ nombre : 'Producto 2', descripcion : 'Descripción producto 2', precio : '200' });
  
  //guardar usuario_dron en la base de datos
  producto.save(function (err) {
    if (err) {
        console.log('save error', err)
    }
  });
})*/
   
router.post('/comprar', function (req, res) {
  //post del formulario de compra
  //insert en la bd el usuario y el dron que compro
  
  var sess = req.session
  
  if(sess.usuario==""||sess.usuario==undefined){
    //algun mensaje de usuario no conectado
    //res.redirect('/')      
  }else { 
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
    
    //insercion en la bd modelo dron y usuario
    //var usuario = new Usuario({ usuario : form_usuario, pass : pass_coded, email : form_email, activacion_key : new_key, validated : 0});
    
    // prueba ruben
    //console.log('Valor sesión: ' + sess.usuario)
    //console.log('Prueba sesión id: ' + sess.id_usuario)
    console.log('Nombre: ' + form_nombre)
    //console.log('Apellidos: ' + form_apellidos)
    //console.log('DNI: ' + form_dni)
    //console.log('Dirección: ' + form_direccion)
    //console.log('Cógido Postal: ' + form_cp)
    //console.log('Email: ' + form_email)
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
            //var duplicados=1
            //var contador=0
            buscar()
            function buscar(){
              console.log(" busqueda ")
              //console.log("¿nombre duplicado? "+form_nombre_final)
              Drones.find({ nombre: form_nombre_final, 'id_usuario': sess.id_usuario }, function (err, resultados) {   
                if (err) {
                  console.error(err)
                } else {        
                  //console.log('ID Producto: ' + producto.id)
                  //var usuario_dron = new Usuario_dron({ id_usuario : sess.id_usuario, id_dron : form_producto });
                  var duplicados = resultados.length
                  //console.log('Comprobación de duplicados: ' + duplicados)
                  if(duplicados!=0){
                    form_nombre_final+="*"
                    //console.log('Form nombre producto: ' + form_nombre_final)
                    //console.log("contador "+contador)
                    buscar()
                  } else {
                    //console.log("no hay duplicados")
                    //console.log("nombre final"+form_nombre_final)
                    var dron = new Drones ({ id_usuario : sess.id_usuario, id_producto : producto.id, nombre: form_nombre_final });
                    dron.save(function (err) {
                      if (err) {
                          console.log('save error', err)
                      }
                    })
                    //console.log("cuenta final "+contador)
                  }
                }
                //contador++
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
})  // /comprar

router.get('/activate/:activation/:email', function (req, res) {
  //ruta de activacion que se envia en el correo de activacion
  
  var key = req.params.activation
  var email = req.params.email

  Usuario.findOne({activacion_key: key, email: email}, function (err, usuario) {
      if (err) {
          console.log(err)
      } else if (usuario!=null) {
          usuario.validated = true
          usuario.save(function (err) {
              if (err) {
                console.log(err)
              } else {
                console.log('Updated', usuario)
              }
          })
      } else {
          console.log('Usuario no encontrado')
      }
  })
  
  res.redirect('/')
})

router.post('/contactar', function (req, res) {
  //post de formulario de contacto
  //envio de correo a dw32igsr@gmail.com
  console.log("contactar")
  
  var form_nombre = req.body.nombre_contacto
  var form_asunto = req.body.asunto_contacto
  var form_email = req.body.email_contacto
  var form_mensaje_contacto = req.body.mensaje_contacto
    
  // Mailgun
  var api_key = 'key-116da3f3cd011ad01d454a632a599587'
  var domain = 'sandboxe7f47692877a4fd6b2115e79c3ce660d.mailgun.org'
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
  var mensaje = "mensaje de: "+form_nombre+"<br><br>mensaje:<br>"+form_mensaje_contacto+"<br>email de contacto: "+form_email
  
  var data = {
    from: form_nombre + ' <' + form_email + '>',
    to: "dw32igsr@gmail.com",
    subject: "Formulario de contacto: asunto:"+form_asunto,
    html: mensaje
  };
  
  mailgun.messages().send(data, function (error, body) {
    console.log(body)
  });
  /*
    aqui va la parte del menasje para la persona que relleno el formulario de contacto
    mensaje de mensaje enviado
  */
  
  var form_nombre = req.body.nombre_contacto
  var form_asunto = req.body.asunto_contacto
  var form_email = req.body.email_contacto
  var form_mensaje_contacto = req.body.mensaje_contacto
    
  // Mailgun
  var api_key = 'key-116da3f3cd011ad01d454a632a599587'
  var domain = 'sandboxe7f47692877a4fd6b2115e79c3ce660d.mailgun.org'
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
  var mensaje = "mensaje de contacto enviado<br><br>con el asunto:"
                +form_asunto+"<br><br>le responderemos lo antes posible"
                +"<br><br><h3>No responda a este mensaje</h3>"
  
  var data = {
    from: 'sense-rover <dw32igsr@gmail.com>',
    to: form_email,
    subject: "Formulario de contacto sense-rover: "+form_asunto,
    html: mensaje
  };
  
  mailgun.messages().send(data, function (error, body) {
    console.log(body)
  });  
  //fin de mensaje de respuesta
  
  res.redirect('/');
})  

module.exports = router