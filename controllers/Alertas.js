exports.update = function(req, res) {
  //post de formulario de registro
  //envio de correo de activacion
  console.log("actualizacion de alertas")
  
  var sess = req.session;
  
  var form_tempMinima = req.body.tempMinima
  var form_tempMaxima = req.body.tempMaxima
  
  var form_humMinima = req.body.humMinima
  var form_humMaxima = req.body.humMaxima  
  
  var form_co2Minima = req.body.co2Minima
  var form_co2Maxima = req.body.co2Maxima
  
  var form_radMinima = req.body.radMinima
  var form_radMaxima = req.body.radMaxima
  
  var form_luxMinima = req.body.luxMinima
  var form_luxMaxima = req.body.luxMaxima  
  
  var form_batMinima = req.body.batMinima
  
  
  console.log("Usuario: " + sess.usuario +" cambiando alertas")
  
  //sin hacer  
  /*
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
          var usuario = new Usuario({ usuario : form_usuario,nombre: null, apellidos : null, dni: null, direccion : null, codigo_postal : null, pass : pass_coded, email : form_email, activacion_key : new_key, validated : 0, ultima_conexion: null})
          
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
        //console.log('el usuario ya existe')
        console.log('el usuario ya existe')
        req.flash('error', ' El usuario ya existe.');
        res.render('index', { expressFlash: req.flash('error'), sessionFlash: res.locals.sessionFlash });
      }
    }  
  })
  //res.render("index.handlebars", {layout: 'index.handlebars', action: 'Register', error: req.flash('error'),});
  res.render("index.handlebars", {layout: 'main.handlebars', action: 'Register', error: req.flash('error')});
*/
  res.redirect('/administracion')
}
