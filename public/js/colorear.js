function colorearEstado(){
    // verde=bg-green amarillo=bg-orange rojo=bg-red
    // http://www.desarrolloweb.com/articulos/anadir-quitar-class-jquery.html
    // estado_tem estado_hum estado_co2 estado_rad estado_lum estado_bat
    console.log("coloreando :D")
    
    $.ajax({
        type: "GET",
        //url: "http://dron-terrestre.rhcloud.com/datosj.php",
        //http://sense-rover-nohtrim.c9users.io/alertas/rango/56939648e4b0166e3b6a60f6
        url: "http://sense-rover-nohtrim.c9users.io/alertas/rango/"+$("#dron_seleccionado").html(),
        dataType: "json",
        success: function(data) {
            console.log("exito buscar rango")

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert("Status: " + textStatus); alert("Error: " + errorThrown);
            console.log(XMLHttpRequest.responseText);
        }
    })
    $("#estado_tem").removeClass("bg-green")
    $("#estado_hum").removeClass("bg-green")
    $("#estado_co2").removeClass("bg-green")
    $("#estado_rad").removeClass("bg-green")
    $("#estado_lum").removeClass("bg-green")
    $("#estado_bat").removeClass("bg-green")
    
    $("#estado_tem").addClass("bg-red")
    $("#estado_hum").addClass("bg-red")
    $("#estado_co2").addClass("bg-red")
    $("#estado_rad").addClass("bg-red")
    $("#estado_lum").addClass("bg-red")
    $("#estado_bat").addClass("bg-red")
    
    
    
}