function colorearEstado(){
    console.log("coloreando :D");
    function colorear(id,color){
        $(id).removeClass("bg-green");
        $(id).removeClass("bg-red");
        $(id).removeClass("bg-orange");
        $(id).addClass(color);
    }
    $.ajax({
        type: "GET",
        //https://senserover-terrestre.rhcloud.com/alertas/rango/56939648e4b0166e3b6a60f6
        //https://sense-rover-nohtrim.c9users.io/alertas/rango/56939648e4b0166e3b6a60f6
        url: "http://sense-rover-nohtrim.c9users.io/alertas/rango/"+$("#dron_seleccionado").html(),
        dataType: "json",
        success: function(data) {
            var t_max = data[0].temperatura.max;
            var t_min = data[0].temperatura.min;
            var h_max = data[0].humedad.max;
            var h_min = data[0].humedad.min;
            var c_max = data[0].co2.max;
            var c_min = data[0].co2.min;
            var r_max = data[0].radiacion.max;
            var r_min = data[0].radiacion.min;
            var l_max = data[0].luminosidad.max;
            var l_min = data[0].luminosidad.min;
            
            if(datosTemp[datosTemp.length-1]>t_max||datosTemp[datosTemp.length-1]<t_min){
                colorear("#estado_tem","bg-red");
            }else if(datosTemp[datosTemp.length-1]>t_max+t_max*0.1||datosTemp[datosTemp.length-1]<t_min+t_max*0.1){
                colorear("#estado_tem","bg-orange");
            }else{
                colorear("#estado_tem","bg-green");
            }
            
            if(datosHum[datosHum.length-1]>h_max||datosHum[datosHum.length-1]<h_min){
                colorear("#estado_hum","bg-red");
            }else if(datosHum[datosHum.length-1]>h_max+h_max*0.1||datosHum[datosHum.length-1]<h_min+h_max*0.1){
                colorear("#estado_hum","bg-orange");
            }else{
                colorear("#estado_hum","bg-green");
            }
            
            if(datosCO2[datosCO2.length-1]>c_max||datosCO2[datosCO2.length-1]<c_min){
                colorear("#estado_co2","bg-red");
            }else if(datosCO2[datosCO2.length-1]>c_max+c_max*0.1||datosCO2[datosCO2.length-1]<c_min+c_max*0.1){
                colorear("#estado_co2","bg-orange");
            }else{
                colorear("#estado_co2","bg-green");
            }
            
            if(datosRad[datosRad.length-1]>r_max||datosRad[datosRad.length-1]<r_min){
                colorear("#estado_rad","bg-red");
            }else if(datosRad[datosRad.length-1]>r_max+r_max*0.1||datosRad[datosRad.length-1]<r_min+r_max*0.1){
                colorear("#estado_rad","bg-orange");
            }else{
                colorear("#estado_rad","bg-green");
            }
            
            if(datosLum[datosLum.length-1]>l_max||datosLum[datosLum.length-1] <l_min){
                colorear("#estado_lum","bg-red");
            }else if(datosLum[datosLum.length-1]>l_max+l_max*0.1||datosLum[datosLum.length-1]<l_min+l_max*0.1){
                colorear("#estado_lum","bg-orange");
            }else{
                colorear("#estado_lum","bg-green");
            }
            
            if(datosBat[datosBat.length-1]<data[0].bateria.min){
                colorear("#estado_bat","bg-red");
            }else if(datosBat[datosBat.length-1]<15){
                colorear("#estado_bat","bg-orange");
            }else{
                colorear("#estado_bat","bg-green");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert("Status: " + textStatus); alert("Error: " + errorThrown);
            console.log(XMLHttpRequest.responseText);
        }
    });
}