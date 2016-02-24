var fechas = [];
var datosTemp = [];
var datosHum = [];
var datosCO2 = [];
var datosRad = [];
var datosLum = [];
var datosBat = [];
var datosLat = [];
var datosLon = [];

function mandarCookie(nombre_cookie, valor_cookie) {
    if (valor_cookie != "selecciona" && valor_cookie != "") {
        var cookie = $.cookie(nombre_cookie, valor_cookie, {
            expires: 10,
            path: '/administracion'
        });
        //alert("mandarCookie")
        cargaDron(cookie);
    }
}

var c_url = "";
if (location.hostname == "sense-rover-nohtrim.c9users.io") {
    c_url = "";
}
else if (window.location.protocol == "http:") {
    c_url = "ws://" + location.hostname + ":8000";
}
else {
    c_url = "wss://" + location.hostname + ":8443";
}

//console.log("c_url "+c_url);
var socket = io(c_url);
socket.on('updatechat', function(temp, hum, co2, rad, lum, bat, lat, lon) {
    datosTemp.push(parseFloat(temp));
    datosHum.push(parseInt(hum, 10));
    datosCO2.push(parseFloat(co2));
    datosRad.push(parseFloat(rad));
    datosLum.push(parseFloat(lum));
    datosBat.push(parseFloat(bat));
    datosLat.push(parseFloat(lat));
    datosLon.push(parseFloat(lon));
    $("#temp-ultimo").html(temp);
    $("#hum-ultimo").html(hum);
    $("#co2-ultimo").html(co2);
    $("#rad-ultimo").html(rad);
    $("#lum-ultimo").html(lum);
    $("#bat-ultimo").html(bat);
    dibujargrafica2();
    colorearEstado();
    //reinicio de mapa
    iniciarMapa2(datosLat, datosLon);
});

function switchRoom(room) {
    socket.emit('switchRoom', room);
}

function cargaDron(id_dron) {
    //se cambian las graficas y se cambian los valores en la seccion de estado
    
    //subscripcion mqtt
    $("#dron_log").html("");
    client.subscribe(id_dron);
    //"56939648e4b0166e3b6a60f6"
    
    document.getElementById("seleccionador").options[0].disabled = true;
    $("#alertas").show();
    $("#graficas").show();
    $("#panel-estado").show();
    $("#ruta_dron").show();
    var c_url = window.location.href;
    c_url = c_url.replace("administracion", "datos/" + id_dron);
    //https://sense-rover-nohtrim.c9users.io/datos/56939648e4b0166e3b6a60f6
    //console.log(c_url);
    $("#id_dron_rango").val(id_dron);
    $('#id_dron_alertas').attr('value', id_dron);
    $("#dron_seleccionado").html(id_dron);
    $('#id_dron_update').attr('value', id_dron);
    var seleccionador = document.getElementById('seleccionador');
    var nombre_dron = seleccionador.options[seleccionador.selectedIndex].text;
    $("#name_dron").val(nombre_dron);
    $.ajax({
        type: "GET",
        url: c_url,
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                //inconsistencia de base de datos revision de la ruta
                fechas.push(data[i].fecha);
                datosTemp.push(parseFloat(data[i].temperatura));
                datosHum.push(parseInt(data[i].humedad, 10));
                datosCO2.push(parseFloat(data[i].co2));
                datosRad.push(parseFloat(data[i].radiacion));
                datosLum.push(parseFloat(data[i].luminosidad));
                datosBat.push(parseFloat(data[i].bateria));
                //en desarrollo
                datosLat.push(parseFloat(data[i].latitud));
                datosLon.push(parseFloat(data[i].longitud));
            }
            switchRoom(id_dron);
            $("#temp-ultimo").html(datosTemp[datosTemp.length - 1]);
            $("#hum-ultimo").html(datosHum[datosHum.length - 1]);
            $("#co2-ultimo").html(datosCO2[datosCO2.length - 1]);
            $("#rad-ultimo").html(datosRad[datosRad.length - 1]);
            $("#lum-ultimo").html(datosLum[datosLum.length - 1]);
            $("#bat-ultimo").html(datosBat[datosBat.length - 1]);
            dibujargrafica2();
            colorearEstado();
            describir();
            //reiniciar mapas
            //iniciarMapa1(datosLat[datosLat.length - 1], datosLon[datosLon.length - 1]);
            if(datosLat!="" && datosLon!=""){
                iniciarMapa2(datosLat, datosLon);
            }else{
                //console.log("coordenadas indefinidas");
            }
        },
        //error a revisar
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("status"+textStatus);
            console.log("error"+errorThrown);
        }
    }); //ajax   

    //mostrar todas las secciones ocultas
}

function describir() {
    var c_url = window.location.href;
    c_url = c_url.replace("administracion", "drones/producto/" + $("#dron_seleccionado").html());
    //https://sense-rover-nohtrim.c9users.io/drones/producto/56939648e4b0166e3b6a60f6
    //console.log("datos de producto: "+c_url);
    $.ajax({
        type: "GET",
        url: c_url,
        dataType: "json",
        success: function(data) {
            $("#desc_nombre").html(data[0].nombre);
            $("#desc_desc").html(data[0].descripcion);
            $("#imagen_producto").attr('src', data[0].imagenes[0].url_img);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}

function colorearEstado() {
    function colorear(id, color, id_texto) {
        $(id).removeClass("bg-green");
        $(id).removeClass("bg-red");
        $(id).removeClass("bg-orange");
        $(id).addClass(color);
        var mensaje;
        if (color == "bg-red") {
            mensaje = "El valor supera el rango establecido";
        }
        else if (color == "bg-orange") {
            mensaje = "El valor esta al limite del rango establecido";
        }
        else {
            mensaje = "El valor es optimo";
        }
        $(id_texto).html(mensaje);
    }
    var c_url = window.location.href;
    c_url = c_url.replace("administracion", "alertas/rango/" + $("#dron_seleccionado").html());
    $.ajax({
        type: "GET",
        url: c_url,
        dataType: "json",
        success: function(data) {
            if(data[0]==undefined){
                var t_min=0;
                var t_max=0;
                var h_min=0;
                var h_max=0;
                var c_min=0;
                var c_max=0;
                var r_min=0;
                var r_max=0;
                var l_min=0;
                var l_max=0;
                var b_min=0;
                var recibir_alertas=false;               
            }
            else{
                if (data[0].recibir_alertas == undefined) {
                    var recibir_alertas = false;
                }else{
                    var recibir_alertas = data[0].recibir_alertas;
                }
                if (data[0].temperatura != undefined) {
                    var t_max = parseFloat(data[0].temperatura.max);
                    var t_min = parseFloat(data[0].temperatura.min);
                }
                else {
                    var t_max = 0;
                    var t_min = 0;
                }
                if (data[0].humedad != undefined) {
                    var h_max = parseInt(data[0].humedad.max, 10);
                    var h_min = parseInt(data[0].humedad.min, 10);
                }
                else {
                    var h_max = 0;
                    var h_min = 0;
                }
                if (data[0].co2 != undefined) {
                    var c_max = parseFloat(data[0].co2.max);
                    var c_min = parseFloat(data[0].co2.min);
                }
                else {
                    var c_max = 0;
                    var c_min = 0;
                }
                if (data[0].radiacion != undefined) {
                    var r_max = parseFloat(data[0].radiacion.max);
                    var r_min = parseFloat(data[0].radiacion.min);
                }
                else {
                    var r_max = 0;
                    var r_min = 0;
                }
                if (data[0].luminosidad != undefined) {
                    var l_max = parseFloat(data[0].luminosidad.max);
                    var l_min = parseFloat(data[0].luminosidad.min);
                }
                else {
                    var l_max = 0;
                    var l_min = 0;
                }
                if (data[0].bateria != undefined) {
                    var b_min = parseFloat(data[0].bateria.min);
                }
                else {
                    var b_min = 0;
                }
            }    
            // cargar configuracion de alertas 
            $("#tempMinima").val(t_min);
            $("#tempMaxima").val(t_max);
            $("#humMinima").val(h_min);
            $("#humMaxima").val(h_max);
            $("#co2Minima").val(c_min);
            $("#co2Maxima").val(c_max);
            $("#radMinima").val(r_min);
            $("#radMaxima").val(r_max);
            $("#luxMinima").val(l_min);
            $("#luxMaxima").val(l_max);
            $("#batMinima").val(b_min);
            $("#alertas_email").attr('checked', recibir_alertas);
            var t_ultimo = $("#temp-ultimo").html();
            var h_ultimo = $("#hum-ultimo").html();
            var c_ultimo = $("#co2-ultimo").html();
            var r_ultimo = $("#rad-ultimo").html();
            var l_ultimo = $("#lum-ultimo").html();
            var b_ultimo = $("#bat-ultimo").html();
            if (t_ultimo > t_max || t_ultimo < t_min) {
                colorear("#estado_tem", "bg-red", "#tempText");
            }
            else if (t_ultimo > t_max - t_max * 0.1 || t_ultimo < t_min + t_max * 0.1) {
                colorear("#estado_tem", "bg-orange", "#tempText");
            }
            else {
                colorear("#estado_tem", "bg-green", "#tempText");
            }
            if (h_ultimo > h_max || h_ultimo < h_min) {
                colorear("#estado_hum", "bg-red", "#humText");
            }
            else if (h_ultimo > h_max - h_max * 0.1 || h_ultimo < h_min + h_max * 0.1) {
                colorear("#estado_hum", "bg-orange", "#humText");
            }
            else {
                colorear("#estado_hum", "bg-green", "#humText");
            }

            if (c_ultimo > c_max || c_ultimo < c_min) {
                colorear("#estado_co2", "bg-red", "#co2Text");
            }
            else if (c_ultimo > c_max - c_max * 0.1 || c_ultimo < c_min + c_max * 0.1) {
                colorear("#estado_co2", "bg-orange", "#co2Text");
            }
            else {
                colorear("#estado_co2", "bg-green", "#co2Text");
            }

            if (r_ultimo > r_max || r_ultimo < r_min) {
                colorear("#estado_rad", "bg-red", "#radText");
            }
            else if (r_ultimo > r_max - r_max * 0.1 || r_ultimo < r_min + r_max * 0.1) {
                colorear("#estado_rad", "bg-orange", "#radText");
            }
            else {
                colorear("#estado_rad", "bg-green", "#radText");
            }

            if (l_ultimo > l_max || l_ultimo < l_min) {
                colorear("#estado_lum", "bg-red", "#lumText");
            }
            else if (l_ultimo > l_max - l_max * 0.1 || l_ultimo < l_min + l_max * 0.1) {
                colorear("#estado_lum", "bg-orange", "#lumText");
            }
            else {
                colorear("#estado_lum", "bg-green", "#lumText");
            }
            if (b_ultimo < b_min) {
                colorear("#estado_bat", "bg-red", "#batText");
            }
            else if (b_ultimo < 15) {
                colorear("#estado_bat", "bg-orange", "#batText");
            }
            else {
                colorear("#estado_bat", "bg-green", "#batText");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
        }
    });
}
$(document).ready(function() {
    $("#seleccionador").change(function() {
        mandarCookie("senseRover_id", this.value);
        cargaDron(this.value);
    }); //selected (funcion(){    
})