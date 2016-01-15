exports.index = function(req, res) {
    //ruta de pagina principal
    var sess = req.session;
    if (sess.usuario==""||sess.usuario==undefined) {
        res.render('index') 
    } else {
        //
        //render de index con idicadores de sesion iniciada
        //
        res.render('index')
    }
};

exports.destroySession = function(req, res) {
    //borrar datos de sesion
    req.session.destroy(function(err){
        if(err){
          console.log(err)
        } else {
          console.log("sesion cerrada")
          res.redirect('/')
        }
    });
};