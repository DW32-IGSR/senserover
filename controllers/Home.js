/*exports.index = function(req, res) {
    //ruta de pagina principal
    var sess = req.session;
    if (sess.usuario==""||sess.usuario==undefined) {
        res.render('index') 
    } else {
        //
        //render de index con idicadores de sesion iniciada
        //
        var usuario = {nombre_usuario: sess.usuario}
        res.render('index', usuario)
    }
};*/

exports.index = function(req, res) {
    //ruta de pagina principal
    var sess = req.session;
    if (sess.usuario==""||sess.usuario==undefined) {
        res.render('index', { expressFlash: req.flash('error'), sessionFlash: res.locals.sessionFlash });
    } else {
        //
        //render de index con idicadores de sesion iniciada
        //
        var usuario = {nombre_usuario: sess.usuario};
        res.render('index', usuario);
    }
};

exports.destroySession = function(req, res) {
    //borrar datos de sesion
    req.session.destroy(function(err){
        if(err){
          console.log(err);
        } else {
          console.log("sesion cerrada");
          res.redirect('/');
        }
    });
};