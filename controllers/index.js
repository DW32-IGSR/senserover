var express = require('express')
  , router = express.Router()
  , bcrypt = require('bcrypt')

    //http://sense-rover-nohtrim.c9users.io
    //http://senserover-terrestre.rhcloud.com/

var Dato = require('../models/Dato')
var Usuario = require('../models/Usuario')

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))

router.get('/', function(req, res) {

  //si hay sesion o cookie poner usuario logueado
  
  res.render('index')
})

router.get('/administracion', function(req, res) {
  //comprobar que hay sesion
  //si no redireccion a pagina de inicio
  res.render('administracion')
})

router.get('/comprar', function(req, res) {
  res.render('comprar')
})

router.get('/perfil', function(req, res) {
  //comprobar que hay sesion
  //si no redireccion a pagina de inicio  
  res.render('perfil')
})

router.get('/pruebaruben', function(req, res) {
  var inicio = '2015-12-11'
  var final = '2016-01-08'
  Dato.find({fecha: {$lt: inicio,$gte: final}}, function (err, dato) {
    //{ fecha: { $lt: 60, $gte: 50 } }
    if (err){
      console.log('prueba ruben: error occured in the database')
    }
      console.log('prueba ruben' + dato)
      //console.log("prueba humedad: "+dato[0].humedad)
  })
})

router.get('/cerrar', function(req, res) {
  
  //pendiente
  //borrar datos de sesion
  
  res.redirect('/')
})  


router.post('/login', function (req, res) {
  
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
            console.log(usuario.id)
            
            //importante
            //pendiente crear sesion/cookie
            
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
      console.log('usuario no registrado')
      //res.redirect('/')
    }    
  })
})

router.post('/register', function (req, res) {
  
  console.log("registro")
  
  var form_usuario = req.body.usuario
  var form_email = req.body.email  
  var form_pass = req.body.contrasenya
  var form_pass2 = req.body.contrasenya2
  
  console.log("Usuario registro: " + form_usuario)
  console.log("email registro: " + form_email)
  console.log("Pass 1: " + form_pass)
  console.log("Pass 2: " + form_pass2)
  
  var salt = bcrypt.genSaltSync(10);
  var pass_coded = bcrypt.hashSync(form_pass, salt);
  console.log(bcrypt.compareSync(form_pass2, pass_coded));
  console.log(pass_coded);
        
  if (bcrypt.compareSync(form_pass2, pass_coded)){
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    var new_key = "";
    for (var i = 0; i < 32; i++) {
        new_key += chars[Math.floor(Math.random()*35)];
    }
     
    // Mailgun
    var api_key = 'key-116da3f3cd011ad01d454a632a599587';
    var domain = 'sandboxe7f47692877a4fd6b2115e79c3ce660d.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    
    var mensaje = "<h1>Hola " + form_usuario + "!</h1><br><p>Gracias por registrarse en nuestro sitio.<br>Su cuenta ha sido creada, y debe ser activada antes de poder ser utilizada.<br>Para activar la cuenta, haga click en el siguiente enlace:</p><br><a href='http://senserover-terrestre.rhcloud.com/activate/"+new_key+"/"+form_email+"'>Activar la cuenta</a>";
    

    
    var data = {
      from: 'sense-rover <postmaster@sandboxe7f47692877a4fd6b2115e79c3ce660d.mailgun.org>',
      to: form_email,
      subject: 'Registro en sense-rover',
      html: mensaje
    };
    
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });

    //creacion de usuario
    var usuario = new Usuario({ usuario : form_usuario, pass : pass_coded, email : form_email, activacion_key : new_key, validated : 0});
    
    //guardar usuario en la base de datos
    usuario.save(function (err) {
      if (err) {
          console.log('save error', err);
      }
    });
    
  } else {
      console.log('Las pass no es la misma');
  }  
  
})  

router.get('/activate/:activation/:email', function (req, res) {
    
  var key = req.params.activation;
  var email = req.params.email;
  console.log("activacion de usuario");
  console.log("key: " + key);
  console.log("Email: " + email);
  
  Usuario.findOne({activacion_key: key, email: email}, function (err, usuario) {
      if (err) {
          console.log(err);
      } else if (usuario!=null) {
          //update de usuario
          console.log("busqueda de usuario en activacion");
          console.log(usuario.usuario);
          console.log(usuario.email);
          console.log(usuario.activacion_key);
          console.log(usuario.validated);
          console.log(usuario.comp_validacion());
          
          //en proceso
          usuario.validated = true;
          usuario.save(function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log('Updated', usuario);
              }
          });
      } else {
          console.log('Usuario no encontrado');
      }
  });
  
  res.redirect('/');

});    

module.exports = router