var express = require('express')
  , router = express.Router()
//var w = require('handlebars');  
var bcrypt = require('bcrypt');


//var Dato = require('../models/Dato')
var Usuario = require('../models/Usuario')

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))

router.get('/', function(req, res) {

  /*Dato.find({}, function (err, dato) {
    if (err){
      console.log('error occured in the database')
    }
      //console.log(dato)
      console.log("prueba humedad: "+dato[0].humedad)
  })*/
  /*
    var res = null;
    Ninja.find({},'name skill',function(err,docs){
        if (err)
            console.log('error occured in the database');
        console.log(docs);
    });     
    return res;  
  */
  
  //si hay sesion o cookie a administracion
  //si no hay a la pagina principal
  
  res.render('indexRuben')
  //res.render('administracion')
})

router.get('/cerrar', function(req, res) {
  
  //pendiente
  //borrar datos de sesion
  
  res.redirect('/')
})  


// Login usuario --- SIN COMPROBAR ---
// Hay que poner el html en handlebars

//indexruben 30
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
            //res.redirect('/home')
            console.log('usuario validado')
            
            //importante
            //pendiente crear sesion/cookie
            
            res.render('administracion')
          } else {
            console.log('usuario no validado')
            //res.redirect('/')
          }
        } else {
          console.log('contraseña incorrecta')
          //res.redirect('/')
        }                     
      })
    } else {
      console.log('usuario no registrado')
      //res.redirect('/')
    }    
  })
})

//indexruben 57
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
  
  //pendiente de adaptar  
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
    
    var mensaje = "<h1>Hola " + form_usuario + "!</h1><br><p>Gracias por registrarse en nuestro sitio.<br>Su cuenta ha sido creada, y debe ser activada antes de poder ser utilizada.<br>Para activar la cuenta, haga click en el siguiente enlace o copielo en la barra de direcciones del navegador:</p><br><a href='http://sense-rover-nohtrim.c9users.io/activate/"+new_key+"/"+form_email+"'>Activar la cuenta</a>";
    
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
//pendiente de adaptar  
  
})  

//sin comprobar
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
//sin comprobar

module.exports = router


/*

// https://carlosazaustre.es/blog/como-crear-una-api-rest-usando-node-js/
// https://github.com/carlosazaustre/node-api-rest-example/tree/feature-express4

// --- Para API (Sin comprobar) En el ejemplo está en app.js ---

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/Dato')(app, mongoose);
var DatoCtrl = require('./controllers/Datos');

// API routes
var datos = express.Router();

datos.route('/datos')
  .get(DatoCtrl.findAllDatos)
  .post(DatoCtrl.addDato);

datos.route('/datos/:id')
  .get(DatoCtrl.findById)
  .put(DatoCtrl.updateDato)
  .delete(DatoCtrl.deleteDato);

app.use('/api', datos);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});

*/