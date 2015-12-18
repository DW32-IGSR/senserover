var express = require('express')
  , router = express.Router()
var mongoose = require('mongoose')

var Dato = require('../models/Dato')

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))

router.get('/', function(req, res) {
  mongoose.connect("mongodb://nodeadmin:zubiri@ds057204.mongolab.com:57204/prueba_node")
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function callback() {
    console.log('db connection open')
  })  
  Dato.find({}, function (err, dato) {
    if (err){
      console.log('error occured in the database')
    }
      //console.log(dato)
      console.log("prueba humedad: "+dato[0].humedad)
  })
  /*
    var res = null;
    Ninja.find({},'name skill',function(err,docs){
        if (err)
            console.log('error occured in the database');
        console.log(docs);
    });     
    return res;  
  */
  res.render('index')
  //res.render('administracion')
})

module.exports = router