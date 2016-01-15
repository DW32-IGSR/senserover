var express = require('express')
  , router = express.Router()
  , bcrypt = require('bcrypt')
  , session = require('express-session')
  , flash = require('express-flash');

  //http://sense-rover-nohtrim.c9users.io
  //http://senserover-terrestre.rhcloud.com/

var Dato = require('../models/Dato')
var Usuario = require('../models/Usuario')
var Drones = require('../models/Drones')
var Productos = require('../models/Productos')

// Archivos de rutas
var DatosAPI = require('./DatosAPI')
var DronesAPI = require('./DronesAPI')
var LoginRegistro = require('./LoginRegistro')
var Administracion = require('./Administracion')
var Perfil = require('./Perfil')
var RangoFecha = require('./RangoFecha')
var ProductosCtrl = require('./Productos')
var Home = require('./Home')
var Tienda = require('./Tienda')
var Comprar = require('./Comprar')
var Email = require('./Email')

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))
router.use(flash());

//parametros para la sesion
router.use(session({resave: true, saveUninitialized: true, secret: 'rubenonrails'}))

// --- RUTAS ---

// Index
router.route('/')
  .get(Home.index)

// Página Administración
router.route('/administracion')
  .get(Administracion.admin)

// Tienda
router.route('/tienda')
  .get(Tienda.tienda)

// Perfil
router.route('/perfil')
  .get(Perfil.perfil)

// Rango_Fecha gráficas
router.route('/rangofecha')
  .post(RangoFecha.rangoFecha)

// Cerrar - destroySession
router.route('/cerrar')
  .get(Home.destroySession)

// Login
router.route('/login')
  .post(LoginRegistro.login)

// Registro
router.route('/register')
  .post(LoginRegistro.registro)

// Temporal para introducir productos
router.route('/productos')
  .get(ProductosCtrl.addProducto)
  
// Comprar
router.route('/comprar')
  .post(Comprar.comprar)

// Activación de email
router.route('/activate/:activation/:email')
  .get(Email.activacion)

// Activación de email
router.route('/contactar')
  .post(Email.contacto)

// ------ API ------
// BÚSQUEDAS
// Búsqueda de TODOS los datos
router.route('/datos')
  .get(DatosAPI.findDatos)

// Búsqueda de dron por ID_DRON
router.route('/drones/:id_dron')
  .get(DronesAPI.findDronesById)

// Búsqueda de datos por ID_DRON
router.route('/datos/:id_dron')
  .get(DatosAPI.findDatosById)

// INSERCIÓN
router.route('/datos/put/:id_dron/t/:temperatura/h/:humedad/co2/:co2/r/:radiacion/l/:luminosidad')
  .get(DatosAPI.addDato)

module.exports = router