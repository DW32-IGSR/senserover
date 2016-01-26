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
            if(datosTemp[datosTemp.length-1]>data[0].temperatura.max||datosTemp[datosTemp.length-1]<data[0].temperatura.min){
                colorear("#estado_tem","bg-red");
            }else{
                colorear("#estado_tem","bg-green");
            }
            
            if(datosHum[datosHum.length-1]>data[0].humedad.max||datosHum[datosHum.length-1]<data[0].humedad.min){
                colorear("#estado_hum","bg-red");
            }else{
                colorear("#estado_hum","bg-green");
            }
            
            if(datosCO2[datosCO2.length-1]>data[0].co2.max||datosCO2[datosCO2.length-1]<data[0].co2.min){
                colorear("#estado_co2","bg-red");
            }else{
                colorear("#estado_co2","bg-green");
            }
            
            if(datosRad[datosRad.length-1]>data[0].radiacion.max||datosRad[datosRad.length-1]<data[0].radiacion.min ){
                colorear("#estado_rad","bg-red");
            }else{
                colorear("#estado_rad","bg-green");
            }
            
            if(datosLum[datosLum.length-1]>data[0].luminosidad.max||datosLum[datosLum.length-1] < data[0].luminosidad.min){
                colorear("#estado_lum","bg-red");
            }else{
                colorear("#estado_lum","bg-green");
            }
            
            if(datosBat[datosBat.length-1]<data[0].bateria.min){
                colorear("#estado_bat","bg-red");
            }else{
                if(datosBat[datosBat.length-1]<15){
                    colorear("#estado_bat","bg-orange");
                }else{
                    colorear("#estado_bat","bg-green");
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert("Status: " + textStatus); alert("Error: " + errorThrown);
            console.log(XMLHttpRequest.responseText);
        }
    });
}