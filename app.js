var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 3000
var mongoose = require('mongoose')
var exphbs  = require('express-handlebars')

//configuracion jade
//app.set('views', __dirname + '/views')
//app.engine('jade', require('jade').__express)
//app.set('view engine', 'jade')

//configuracion handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
//app.set('view engine', 'views')


app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('./controllers'))

/*app.listen(port, function() {
  console.log('Listening on port ' + port)
})*/

var server_port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
  
  mongoose.connect('mongodb://nodeadmin:zubiri@ds037215.mongolab.com:37215/sense-rover')
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function callback() {
    console.log('db connection open')
  })
})

//http://senserover-terrestre.rhcloud.com/
//http://sense-rover-nohtrim.c9users.io/
//dw32igsr@gmail.com