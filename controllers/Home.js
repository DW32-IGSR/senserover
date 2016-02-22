exports.index = function(req, res) {
    
    var user = req.user;
    //console.log('user: ' + user);
    
    if (user == "" || user == undefined) {
        res.render('index');
    } else {
        var usuario = {
            datosUsuario: user
        };
        res.render('index', usuario);
    }
};

exports.destroySession = function(req, res) {
    //borrar datos de sesion
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("sesion cerrada");
            res.clearCookie('senseRover_id', { path: '/administracion' }); 
            res.redirect('/');
        }
    });
};