var express = require('express')
  , router = express.Router()
  , bcrypt = require('bcrypt')//pendiente mover
  , session = require('express-session')
  , flash = require('express-flash');
  //, expressValidator = require('express-validator')

  //http://sense-rover-nohtrim.c9users.io
  //http://senserover-terrestre.rhcloud.com/

//PENDIENTE MOVER 
var Dato = require('../models/Dato');
var Usuario = require('../models/Usuario');
var Drones = require('../models/Drones');
var Productos = require('../models/Productos');
var AlertasModel = require('../models/Alertas');
//pendiente mover

//var delicados = require('../delicados.js');

// Archivos de rutas
var DatosAPI = require('./DatosAPI');
var DronesAPI = require('./DronesAPI');
var LoginRegistro = require('./LoginRegistro');
var Administracion = require('./Administracion');
var Perfil = require('./Perfil');
var RangoFecha = require('./RangoFecha');
var ProductosCtrl = require('./Productos');
var Home = require('./Home');
var Tienda = require('./Tienda');
var Comprar = require('./Comprar');
var Email = require('./Email');
var Alertas = require('./Alertas');
var Pronosticos = require('./Pronosticos');
var error404 = require('./error404');

//router.use('/comments', require('./comments'))
//router.use('/users', require('./users'))
router.use(flash());

//parametros para la sesion
router.use(session({resave: true, saveUninitialized: true, secret: 'rubenonrails'}));

// --- RUTAS ---

// Index
router.route('/')
  .get(Home.index);

// Login
router.route('/login')
  .post(LoginRegistro.login);

// Registro
router.route('/register')
  .post(LoginRegistro.registro);

// Página Administración
router.route('/administracion')
  .get(Administracion.admin);

// Perfil
router.route('/perfil')
  .get(Perfil.perfil);

// Perfil - Datos Personales
router.route('/perfil/datos')
  .post(Perfil.datosPerfil);

// Perfil - Cambiar contraseña
router.route('/perfil/changePassword')
  .post(Perfil.changePassword);

// Formulario contacto
router.route('/contactar')
  .post(Email.contacto);

// Tienda //deprecated
router.route('/tienda')
  .get(Tienda.tienda);

// Tienda
router.route('/tienda/:id_producto')
  .get(Tienda.tienda);

// Comprar
router.route('/comprar')
  .post(Comprar.comprar);

// Rango_Fecha gráficas
router.route('/rangofecha')
  .post(RangoFecha.rangoFecha);

// Activación de email
router.route('/activate/:activation/:email')
  .get(Email.activacion);

// Forget contraseña
router.route('/forgetPassword')
  .post(Email.forgetPassword);

// Recover contraseña
router.route('/recoverPassword/:key/:email')
  .get(Email.recoverPassword);

// New contraseña
router.route('/newPassword')
  .post(Email.newPassword);
  
//formulario de alertas //en  marcha
router.route('/alertas/update')
  .post(Alertas.update);

// prueba ruben
/*router.route('/alertas/:id_dron/tmin/:tmin/tmax/:tmax/hmin/:hmin/hmax/:hmax/cmin/:cmin/cmax/:cmax/rmin/:rmin/rmax/:rmax/lmin/:lmin/lmax/:lmax/bmin/:bmin/bmax/:bmax')
  .get(Alertas.prueba)*/

// Temporal para introducir productos
/*router.route('/addProductos')
  .get(ProductosCtrl.addProducto)*/

// Cerrar - destroySession
router.route('/cerrar')
  .get(Home.destroySession);

// Error 404 - Para las APIs
router.route('/404')
  .get(error404.error);  


// ------ API ------
// BÚSQUEDAS
// Búsqueda de todos los productos
router.route('/productos')
  .get(DatosAPI.findProductos);

// Búsqueda de producto por ID_PRODUCTO
router.route('/productos/:id_producto')
  .get(DatosAPI.findProductosById);

// Búsqueda de TODOS los datos
router.route('/datos')
  .get(DatosAPI.findDatos);

// Búsqueda de dron por ID_DRON
router.route('/drones/:id_dron')
  .get(DronesAPI.findDronesById);

// Búsqueda de dron por ID_USUARIO
router.route('/drones/usuario/:id_usuario')
  .get(DronesAPI.findDronesUsuarioById);

// Búsqueda de datos por ID_DRON
router.route('/datos/:id_dron')
  .get(DatosAPI.findDatosById);

// Búsqueda de datos por ID_DRON
router.route('/drones/producto/:id_dron')
  .get(DronesAPI.datosProductoPorIdDron);  

// --- Por un dato concreto ---
// Búsqueda de datos de temperatura por ID_DRON
router.route('/datos/:id_dron/temperatura')
  .get(DatosAPI.findDatosTempById);

// Búsqueda de datos de humedad por ID_DRON
router.route('/datos/:id_dron/humedad')
  .get(DatosAPI.findDatosHumById);

// Búsqueda de datos de co2 por ID_DRON
router.route('/datos/:id_dron/co2')
  .get(DatosAPI.findDatosCo2ById);

// Búsqueda de datos de radiación por ID_DRON
router.route('/datos/:id_dron/radiacion')
  .get(DatosAPI.findDatosRadById);

// Búsqueda de datos de luminosidad por ID_DRON
router.route('/datos/:id_dron/luminosidad')
  .get(DatosAPI.findDatosLumById);

// Búsqueda de rango de alertas
router.route('/alertas/rango/:id_dron')
  .get(DatosAPI.findMinMaxDronId);

// --- Por un dato concreto ---
// Búsqueda de rango de alertas de temperatura
router.route('/alertas/rango/temp/:id_dron')
  .get(DatosAPI.findMinMaxTempDronId);

// Búsqueda de rango de alertas de humedad
router.route('/alertas/rango/hum/:id_dron')
  .get(DatosAPI.findMinMaxHumDronId);

// Búsqueda de rango de alertas de co2
router.route('/alertas/rango/co2/:id_dron')
  .get(DatosAPI.findMinMaxCo2DronId);

// Búsqueda de rango de alertas de radiacion
router.route('/alertas/rango/rad/:id_dron')
  .get(DatosAPI.findMinMaxRadDronId);

// Búsqueda de rango de alertas de luminosidad
router.route('/alertas/rango/lum/:id_dron')
  .get(DatosAPI.findMinMaxLumDronId);

// Búsqueda de rango de alertas de bateria
router.route('/alertas/rango/bat/:id_dron')
  .get(DatosAPI.findMinMaxBatDronId);

// INSERCIÓN
router.route('/datos/put/:id_dron/t/:temperatura/h/:humedad/co2/:co2/r/:radiacion/l/:luminosidad/b/:bateria')
  .get(DatosAPI.addDato);
  
router.route('/pronostico')
  .get(Pronosticos.get);  

router.use("*", function(req,res){
  res.redirect('/');
});

module.exports = router;