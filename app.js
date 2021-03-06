/**
 * Module dependencies.
 */
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
//, port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var session = require('express-session');
var flash = require('express-flash');
var moment = require('moment');

var passport = require('passport');
var multer = require('multer');

/**
 * path: .env
 */
if (process.env.MONGODB == null) {
  dotenv.load({
    path: './.env'
  });
}

if (process.env.MAILGUN_USER == null) {
  dotenv.load({
    path: './.env'
  });
}

if (process.env.MAILGUN_PASSWORD == null) {
  dotenv.load({
    path: './.env'
  });
}

if (process.env.KEY_CHAR == null) {
  dotenv.load({
    path: './.env'
  });
}

if (process.env.GOOGLE_ID == null && process.env.GOOGLE_SECRET) {
  dotenv.load({
    path: './.env'
  });
}

if (process.env.PAYPAL_ID == null && process.env.PAYPAL_SECRET) {
  dotenv.load({
    path: './.env'
  });
}

/**
 * Configuracion handlebars
 */
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//app.set('view engine', 'views')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());
//app.use(require('./controllers'));

app.use(flash());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());


/**
 * Controladores
 */
var homeController = require('./controllers/Home');
var adminController = require('./controllers/Admin');
var administracionController = require('./controllers/Administracion');
var alertasController = require('./controllers/Alertas');
var comprarController = require('./controllers/Comprar');
var datosApiController = require('./controllers/DatosAPI');
var dronesApiController = require('./controllers/DronesAPI');
var emailController = require('./controllers/Email');
var error404Controller = require('./controllers/error404');
var loginRegistroController = require('./controllers/LoginRegistro');
var perfilController = require('./controllers/Perfil');
//error
var productosController = require('./controllers/Productos');
//ruta addProducto sin crear
var pronosticosController = require('./controllers/Pronosticos');
var rangoFechaController = require('./controllers/RangoFecha');
var tiendaController = require('./controllers/Tienda');
var uploadImageController = require('./controllers/UploadImage');
//var homeController = require('./controllers/validadarAPI');
//var homeController = require('./controllers/Estructura_Email');

/**
 * API keys and Passport configuration.
 */
var passportConf = require('./config/passport');

/**
 * Rutas principales
 */
app.get('/', homeController.index);
app.get('/cerrar', homeController.destroySession);
app.post('/login', loginRegistroController.postLogin);
app.post('/register', loginRegistroController.postSignup);
app.get('/administracion', administracionController.admin);
app.post('/update/nameDron', administracionController.updateName);
app.get('/perfil', perfilController.perfil);
app.post('/perfil/datos', perfilController.datosPerfil);
app.post('/perfil/changePassword', perfilController.changePassword);
app.post('/contactar', emailController.contacto);
app.get('/tienda/:id_producto', tiendaController.tienda);
app.post('/comprar', comprarController.comprar);
app.post('/renovar/subscripcion', comprarController.renovarSubscripcion);
app.post('/rangofecha', rangoFechaController.rangoFecha);
app.get('/activate/:activation/:email', emailController.activacion);
app.post('/forgetPassword', emailController.forgetPassword);
app.get('/recoverPassword/:key/:email', emailController.recoverPassword);
app.post('/newPassword', emailController.newPassword);
app.post('/alertas/update', alertasController.update);
app.get('/404', error404Controller.error);
app.get('/admin', adminController.admin);


/**
 * MULTER - IMÁGENES
 */
var storage = multer.diskStorage({
  //limits: {fileSize: 1, files:1},
  destination: function (req, file, cb) {
    cb(null, './public/avatar/'); // Directirio donde se guardaran los archivos.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  }
});

var upload = multer({storage: storage, fileFilter: fileFilter     
  
  //Esto funciona pero abria que controlar el error que general y no queda tiempo
  /*limits: {
    fieldNameSize: 50,
    files: 1,
    fields: 5,
    fileSize: 1024 * 1024
  }*/
  }
);

app.post('/upload/image', upload.single('imagen'), uploadImageController.upload);

function fileFilter (req, file, cb){
  console.log('Entro al filter');
  var type = file.mimetype;
  //var typeArray = type.split("/");
  if (type == "image/jpg" || type == "image/jpeg" || type == "image/png") {
    cb(null, true);
  }else {
    cb(null, false);
  }
}


/**
 * Rutas API
 */
app.get('/productos', datosApiController.findProductos);
app.get('/productos/:id_producto', datosApiController.findProductosById);
app.get('/datos', datosApiController.findDatos);
app.get('/drones/:id_dron', dronesApiController.findDronesById);
app.get('/drones/usuario/:id_usuario', dronesApiController.findDronesUsuarioById);
//put a revisar
app.put('/drones/update/:id_dron', dronesApiController.updateDronName);
app.get('/datos/:id_dron', datosApiController.findDatosById);
app.get('/drones/producto/:id_dron', dronesApiController.datosProductoPorIdDron);
app.get('/datos/:id_dron/temperatura', datosApiController.findDatosTempById);
app.get('/datos/:id_dron/humedad', datosApiController.findDatosHumById);
app.get('/datos/:id_dron/co2', datosApiController.findDatosCo2ById);
app.get('/datos/:id_dron/radiacion', datosApiController.findDatosRadById);
app.get('/datos/:id_dron/luminosidad', datosApiController.findDatosLumById);
app.get('/alertas/rango/:id_dron', datosApiController.findMinMaxDronId);
app.get('/alertas/rango/temp/:id_dron', datosApiController.findMinMaxTempDronId);
app.get('/alertas/rango/hum/:id_dron', datosApiController.findMinMaxHumDronId);
app.get('/alertas/rango/co2/:id_dron', datosApiController.findMinMaxCo2DronId);
app.get('/alertas/rango/rad/:id_dron', datosApiController.findMinMaxRadDronId);
app.get('/alertas/rango/lum/:id_dron', datosApiController.findMinMaxLumDronId);
app.get('/alertas/rango/bat/:id_dron', datosApiController.findMinMaxBatDronId);
app.get('/api/datos/:id_dron/t/:temperatura/h/:humedad/co2/:co2/r/:radiacion/l/:luminosidad/b/:bateria/lat/:latitud/long/:longitud', datosApiController.addDato);
app.post('/datos/put', datosApiController.addDatoPost);
app.get('/pronostico', pronosticosController.get);
app.get('/apiDatos/log/:id_dron/:mensaje', datosApiController.logDron);


/**
 * OAuth authentication routes. (Sign in)
 */

app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});

/**
 * Ruta por defecto
 */

app.use("*", function(req, res) {
  res.redirect('/');
});

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});


var server = require('http').Server(app);
app.io = require('socket.io')(server);

//var rooms = ['56939648e4b0166e3b6a60f6', '56992dd0c8bdac92101a7766', '56a1dbef16d8dfdb5562113d'];
//busqueda de drones
var rooms = [];
var Drones = require("./models/Drones");
Drones.find({}, function(err, drones) {
  if(err){
    console.log(err);
  }
  //console.log("tamaño "+drones.length);
  for (var i = 0; i < drones.length; i++) {
    rooms.push(drones[i].id);
  }
  //console.log(rooms);
});

app.io.sockets.on('connection', function(socket) {
  /*socket.on('adduser', function(username) {
    socket.username = username;
    socket.room = 'Lobby';
    usernames[username] = username;
    socket.join('Lobby');
    socket.emit('updatechat', 'SERVER', 'you have connected to Lobby');
    socket.broadcast.to('Lobby').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'Lobby');
  });*/

  //cuando se compra un dron se emite el create
  /*socket.on('create', function(room) {
    console.log("room creada " + room);
    rooms.push(room);
    //se puede usar para rellenar el select
    //socket.emit('updaterooms', rooms, socket.room);
  });*/

  /*socket.on('sendchat', function(data) {
    app.io.sockets["in"](socket.room).emit('updatechat', socket.username, data);
  });*/

  //cuando se selecciona dron se cambia de room
  socket.on('switchRoom', function(newroom) {
    //var oldroom;
    //oldroom = socket.room;
    console.log("cambio de room " + socket.room + " nuevo room " + newroom);
    socket.leave(socket.room);
    console.log("comprovacion index of: "+rooms.indexOf(newroom));
    if (rooms.indexOf(newroom) == -1) {
      console.log("if create rooms:"+newroom);
      rooms.push(newroom);
      socket.join(newroom);
    }else{
      socket.join(newroom);
    }
    //socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
    //socket.broadcast.to(oldroom).emit('updatechat', 'SERVER', socket.username + ' has left this room');
    socket.room = newroom;
    //socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
    //socket.emit('updaterooms', rooms, newroom);
  });

  //cuando se cierra se sesion sale de room
  /*socket.on('disconnect', function() {
    delete usernames[socket.username];
    app.io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });*/
});

/**
 * Start Express server.
 */
var server_port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8000;
//var server_port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8443;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1';

server.listen(server_port, server_ip_address, function() {
  console.log("Listening on " + server_ip_address + ", server_port " + server_port);

  //console.log("intento de conexion")
  mongoose.connect(process.env.MONGODB);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: :( '));
  db.once('open', function callback() {
    console.log('db connection open');
  });
});
//https://senserover-terrestre.rhcloud.com/
//https://sense-rover-nohtrim.c9users.io/
//dw32igsr@gmail.com