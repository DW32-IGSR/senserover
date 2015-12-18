var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 3000
var mongoose = require('mongoose')

app.set('views', __dirname + '/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

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
  mongoose.connect("mongodb://nodeadmin:zubiri@ds057204.mongolab.com:57204/prueba_node")
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function callback() {
    console.log('db connection open')
  })  
});

//http://senserover-terrestre.rhcloud.com/
//dw32igsr@gmail.com