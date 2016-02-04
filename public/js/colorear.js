function colorearEstado() {
    console.log("coloreando :D");

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
        //console.log("texto: "+id_texto+" mensaje: "+mensaje);
        $(id_texto).html(mensaje);
    }

    //url: "https://senserover-terrestre.rhcloud.com/alertas/rango/"+$("#dron_seleccionado").html(),
    //url: "https://sense-rover-nohtrim.c9users.io/alertas/rango/" + $("#dron_seleccionado").html(),
    var c_url = document.location.href; //"https://sense-rover-nohtrim.c9users.io/administracion"
    c_url = c_url.replace("administracion", "alertas/rango/" + $("#dron_seleccionado").html());
    //console.log("colorear " + c_url);
    //"https://sense-rover-nohtrim.c9users.io/alertas/rango/" + $("#dron_seleccionado").html()    
    $.ajax({
        type: "GET",
        //https://senserover-terrestre.rhcloud.com/alertas/rango/56939648e4b0166e3b6a60f6
        //https://sense-rover-nohtrim.c9users.io/alertas/rango/56939648e4b0166e3b6a60f6
        url: c_url,
        dataType: "json",
        success: function(data) {
            var recibir_alertas = data[0].recibir_alertas;

            if (data[0].temperatura != undefined) {
                var t_max = parseFloat(data[0].temperatura.max);
                var t_min = parseFloat(data[0].temperatura.min);
            }
            else {
                var t_max = 0;
                var t_min = 0;
            }

            if (data[0].humedad != undefined) {
                var h_max = parseFloat(data[0].humedad.max);
                var h_min = parseFloat(data[0].humedad.min);
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
            //alert("Status: " + textStatus); alert("Error: " + errorThrown);
            console.log(XMLHttpRequest.responseText);
        }
    });
}

//https://senserover-terrestre.rhcloud.com/datos/56af4d51764ae2a8c2618218

//https://senserover-terrestre.rhcloud.com/api/datos/56af4d51764ae2a8c2618218/t/25/h/25/co2/25/r/25/l/25/b/25