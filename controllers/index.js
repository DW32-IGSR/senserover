var express = require('express')
  , router = express.Router()
var mongoose = require('mongoose');  

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))

router.get('/', function(req, res) {
  mongoose.connect("mongodb://nodeadmin:zubiri@ds057204.mongolab.com:57204/prueba_node")
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function callback() {
    console.log('db connection open')
  })  
  res.render('index')
})

module.exports = router