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
var Alertas = require('./Alertas')

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))
router.use(flash());

//parametros para la sesion
router.use(session({resave: true, saveUninitialized: true, secret: 'rubenonrails'}))

// --- RUTAS ---

// Index
router.route('/')
  .get(Home.index)

// Login
router.route('/login')
  .post(LoginRegistro.login)

// Registro
router.route('/register')
  .post(LoginRegistro.registro)

// Página Administración
router.route('/administracion')
  .get(Administracion.admin)

// Perfil
router.route('/perfil')
  .get(Perfil.perfil)

// Perfil - Datos Personales
router.route('/perfil/datos')
  .post(Perfil.datosPerfil)

// Perfil - Cambiar contraseña
router.route('/perfil/changePassword')
  .post(Perfil.changePassword)

// Formulario contacto
router.route('/contactar')
  .post(Email.contacto)

// Tienda //deprecated
router.route('/tienda')
  .get(Tienda.tienda)

// Tienda
router.route('/tienda/:id_producto')
  .get(Tienda.tienda)

// Comprar
router.route('/comprar')
  .post(Comprar.comprar)

// Rango_Fecha gráficas
router.route('/rangofecha')
  .post(RangoFecha.rangoFecha)

// Activación de email
router.route('/activate/:activation/:email')
  .get(Email.activacion)

// Forget contraseña
router.route('/forgetPassword')
  .post(Email.forgetPassword)

// Recover contraseña
router.route('/recoverPassword/:key/:email')
  .get(Email.recoverPassword)

// New contraseña
router.route('/newPassword')
  .post(Email.newPassword)
  
//formulario de alertas //en  marcha
router.route('/alertas/update')
  .post(Alertas.update)

// Temporal para introducir productos
/*router.route('/addProductos')
  .get(ProductosCtrl.addProducto)*/

// Cerrar - destroySession
router.route('/cerrar')
  .get(Home.destroySession)


// ------ API ------
// BÚSQUEDAS
// Búsqueda de todos los productos
router.route('/productos')
  .get(DatosAPI.findProductos)

// Búsqueda de producto por ID_PRODUCTO
router.route('/productos/:id_producto')
  .get(DatosAPI.findProductosById)

// Búsqueda de TODOS los datos
router.route('/datos')
  .get(DatosAPI.findDatos)

// Búsqueda de dron por ID_DRON
router.route('/drones/:id_dron')
  .get(DronesAPI.findDronesById)

// Búsqueda de dron por ID_USUARIO
router.route('/drones/usuario/:id_usuario')
  .get(DronesAPI.findDronesUsuarioById)

// Búsqueda de datos por ID_DRON
router.route('/datos/:id_dron')
  .get(DatosAPI.findDatosById)

// Búsqueda de datos de temperatura por ID_DRON
router.route('/datos/:id_dron/temperatura')
  .get(DatosAPI.findDatosTempById)

// Búsqueda de datos de humedad por ID_DRON
router.route('/datos/:id_dron/humedad')
  .get(DatosAPI.findDatosHumById)

// Búsqueda de datos de co2 por ID_DRON
router.route('/datos/:id_dron/co2')
  .get(DatosAPI.findDatosCo2ById)

// Búsqueda de datos de radiación por ID_DRON
router.route('/datos/:id_dron/radiacion')
  .get(DatosAPI.findDatosRadById)

// Búsqueda de datos de luminosidad por ID_DRON
router.route('/datos/:id_dron/luminosidad')
  .get(DatosAPI.findDatosLumById)

// INSERCIÓN
router.route('/datos/put/:id_dron/t/:temperatura/h/:humedad/co2/:co2/r/:radiacion/l/:luminosidad/b/:bateria')
  .get(DatosAPI.addDato)
  
router.use("*", function(req,res){
  res.redirect('/')
})

module.exports = router