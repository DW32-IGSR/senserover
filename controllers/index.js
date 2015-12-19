var express = require('express')
  , router = express.Router()
//var w = require('handlebars');  


//var Dato = require('../models/Dato')

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))

router.get('/', function(req, res) {

  /*Dato.find({}, function (err, dato) {
    if (err){
      console.log('error occured in the database')
    }
      //console.log(dato)
      console.log("prueba humedad: "+dato[0].humedad)
  })*/
  /*
    var res = null;
    Ninja.find({},'name skill',function(err,docs){
        if (err)
            console.log('error occured in the database');
        console.log(docs);
    });     
    return res;  
  */
  //res.render('index')
  res.render('administracion')
})

module.exports = router