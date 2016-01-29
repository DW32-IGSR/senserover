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
            var t_max = parseFloat(data[0].temperatura.max);
            var t_min = parseFloat(data[0].temperatura.min);
            var h_max = parseFloat(data[0].humedad.max);
            var h_min = parseFloat(data[0].humedad.min);
            var c_max = parseFloat(data[0].co2.max);
            var c_min = parseFloat(data[0].co2.min);
            var r_max = parseFloat(data[0].radiacion.max);
            var r_min = parseFloat(data[0].radiacion.min);
            var l_max = parseFloat(data[0].luminosidad.max);
            var l_min = parseFloat(data[0].luminosidad.min);
            var b_min = parseFloat(data[0].bateria.min);
            
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
            $("#alertas_email").attr('checked', data[0].recibir_alertas);
            
            var t_ultimo = $("#temp-ultimo").html();
            var h_ultimo = $("#hum-ultimo").html();
            var c_ultimo = $("#co2-ultimo").html();
            var r_ultimo = $("#rad-ultimo").html();
            var l_ultimo = $("#lum-ultimo").html();
            var b_ultimo = $("#bat-ultimo").html();
            
                        
            if(t_ultimo>t_max||t_ultimo<t_min){
                colorear("#estado_tem","bg-red");
            }else if(t_ultimo>t_max+t_max*0.1||t_ultimo<t_min+t_max*0.1){
                colorear("#estado_tem","bg-orange");
            }else{
                colorear("#estado_tem","bg-green");
            }
            
            if(h_ultimo>h_max||h_ultimo<h_min){
                colorear("#estado_hum","bg-red");
            }else if(h_ultimo>h_max+h_max*0.1||h_ultimo<h_min+h_max*0.1){
                colorear("#estado_hum","bg-orange");
            }else{
                colorear("#estado_hum","bg-green");
            }
            
            if(c_ultimo>c_max||c_ultimo<c_min){
                colorear("#estado_co2","bg-red");
            }else if(c_ultimo>c_max+c_max*0.1||c_ultimo<c_min+c_max*0.1){
                colorear("#estado_co2","bg-orange");
            }else{
                colorear("#estado_co2","bg-green");
            }
            
            if(r_ultimo>r_max||r_ultimo<r_min){
                colorear("#estado_rad","bg-red");
            }else if(r_ultimo>r_max+r_max*0.1||r_ultimo<r_min+r_max*0.1){
                colorear("#estado_rad","bg-orange");
            }else{
                colorear("#estado_rad","bg-green");
            }
            
            if(l_ultimo>l_max||l_ultimo<l_min){
                colorear("#estado_lum","bg-red");
            }else if(l_ultimo>l_max+l_max*0.1||l_ultimo<l_min+l_max*0.1){
                colorear("#estado_lum","bg-orange");
            }else{
                colorear("#estado_lum","bg-green");
            }
            
            if(b_ultimo<b_min){
                colorear("#estado_bat","bg-red");
            }else if(b_ultimo<15){
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