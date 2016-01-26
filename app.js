var express = require('express')
  , app = express()
  //, util = require('util')
  , bodyParser = require('body-parser')
  , validator = require('validator')
  , port = process.env.PORT || 3000
var mongoose = require('mongoose')
var exphbs  = require('express-handlebars')
var expressValidator = require('express-validator');
delicados = require('./delicados.js');

//configuracion handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
//app.set('view engine', 'views')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(require('./controllers'))

var server_port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
  
  //console.log("intento de conexion")
  mongoose.connect(delicados.url_mongo())
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error: :( '))
  db.once('open', function callback() {
    console.log('db connection open')
  })
})

//http://senserover-terrestre.rhcloud.com/
//http://sense-rover-nohtrim.c9users.io/
//dw32igsr@gmail.com