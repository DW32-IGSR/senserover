function colorearEstado(){
    // verde=bg-green amarillo=bg-orange rojo=bg-red
    // http://www.desarrolloweb.com/articulos/anadir-quitar-class-jquery.html
    // estado_tem estado_hum estado_co2 estado_rad estado_lum estado_bat
    console.log("coloreando :D")
    
    function quitarClases(id){
        $(id).removeClass("bg-green")
        $(id).removeClass("bg-red")
        $(id).removeClass("bg-orange")
    }
    
    $.ajax({
        type: "GET",
        //url: "http://dron-terrestre.rhcloud.com/datosj.php",
        //http://sense-rover-nohtrim.c9users.io/alertas/rango/56939648e4b0166e3b6a60f6
        url: "http://sense-rover-nohtrim.c9users.io/alertas/rango/"+$("#dron_seleccionado").html(),
        dataType: "json",
        success: function(data) {
            console.log("exito buscar rango")
            if(datosTemp[datosTemp.length-1]>data[0].temperatura.max||datosTemp[datosTemp.length-1]<data[0].temperatura.min){
                quitarClases("#estado_tem")
                $("#estado_tem").addClass("bg-red")
            }else{
                quitarClases("#estado_tem")
                $("#estado_tem").addClass("bg-green")
            }
            
            if(datosHum[datosHum.length-1]>data[0].humedad.max||datosHum[datosHum.length-1]<data[0].humedad.min){
                quitarClases("#estado_hum")
                $("#estado_hum").addClass("bg-red")
            }else{
                quitarClases("#estado_hum")
                $("#estado_hum").addClass("bg-green")
            }
            
            if(datosCO2[datosCO2.length-1]>data[0].co2.max || datosCO2[datosCO2.length-1]<data[0].co2.min){
                quitarClases("#estado_co2")
                $("#estado_co2").addClass("bg-red")
            }else{
                quitarClases("#estado_co2")
                $("#estado_co2").addClass("bg-green")
            }
            
            if(datosRad[datosRad.length-1]>data[0].radiacion.max || datosRad[datosRad.length-1]<data[0].radiacion.min ){
                quitarClases("#estado_rad")
                $("#estado_rad").addClass("bg-red")
            }else{
                quitarClases("#estado_rad")
                $("#estado_rad").addClass("bg-green")
            }
            
            if(datosLum[datosLum.length-1] > data[0].luminosidad.max || datosLum[datosLum.length-1] < data[0].luminosidad.min){
                quitarClases("#estado_lum")
                $("#estado_lum").addClass("bg-red")
            }else{
                quitarClases("#estado_lum")
                $("#estado_lum").addClass("bg-green")
            }
            
            if(datosBat[datosBat.length-1] < data[0].bateria.min){
                quitarClases("#estado_bat")
                $("#estado_bat").addClass("bg-red")
            }else{
                if(datosBat[datosBat.length-1]<10){
                    quitarClases("#estado_bat")
                    $("#estado_bat").addClass("bg-orange")
                }else{
                    quitarClases("#estado_bat")
                    $("#estado_bat").addClass("bg-green")
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert("Status: " + textStatus); alert("Error: " + errorThrown);
            console.log(XMLHttpRequest.responseText);
        }
    })
}