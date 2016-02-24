var lineas=[];

/*function iniciarMapa1(latitud, longitud) {
    //console.log("iniciar mapa1: lat:" + latitud + " lon:" + longitud);
    var centro = new google.maps.LatLng(latitud, longitud);
    var mapa1 = new google.maps.Map(document.getElementById('mapa1'), {
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: centro
    });
    var marker = new google.maps.Marker({
        position: centro,
        map: mapa1,
        title: 'Ultima posicion del dron'
    });
}*/

function iniciarMapa2(latitudes, longitudes) {
    var ultimapos = new google.maps.LatLng(latitudes[latitudes.length - 1], longitudes[longitudes.length - 1]);
    //console.log("ultima posicion "+ultimapos);
    var mapa2 = new google.maps.Map(document.getElementById('mapa2'), {
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: ultimapos
    });
    //array_push($markers, $lat, $lng, $titulo);
    var ruta = [];

    for (var i = 0; i < latitudes.length; i++) {
        //console.log("bucle pos:" + i);
        var marker = new google.maps.Marker({
            position: {
                lat: latitudes[i],
                lng: longitudes[i]
            },
            map: mapa2,
            //animation:google.maps.Animation.DROP,
            draggable: false,
        });
        ruta.push({
            lat: latitudes[i],
            lng: longitudes[i]
        });
    }

    var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
    };
    
    var linea = new google.maps.Polyline({
        path: ruta,
        map: mapa2,
        strokeColor: '#222000',
        strokeWeight: 4,
        strokeOpacity: 0.6,
        clickable: false,
        icons: [{
            icon: lineSymbol,
            offset: '100%',
            repeat: '30px'
        }]        
    });
    lineas.push(linea);
    animate();
}

function animate() {
    var count = 0;
    offsetId = window.setInterval(function() {
        count = (count + 1) % 2000;
        for (var i = 0; i < lineas.length; i++) {
            var icons = lineas[i].get('icons');
            icons[0].offset = (count / 2) + '%';
            lineas[i].set('icons', icons);
        }
    }, 500);
} // end of animate function 