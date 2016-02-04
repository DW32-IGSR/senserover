function describir() {
    //console.log("describiendo :D");
    //var c_url = "https://sense-rover-nohtrim.c9users.io/drones/producto/" + $("#dron_seleccionado").html();
    var c_url = document.location.href; //"https://sense-rover-nohtrim.c9users.io/administracion"
    c_url = c_url.replace("administracion", "drones/producto/" + $("#dron_seleccionado").html());
    //var c_url = "https://senserover-terrestre.rhcloud.com/drones/producto/" + $("#dron_seleccionado").html();
    console.log(c_url);
    $.ajax({
        type: "GET",
        //ejemplo https://sense-rover-nohtrim.c9users.io/drones/producto/5693998f4c3faa7e218027ce
        url: c_url,
        dataType: "json",
        success: function(data) {
            //console.log(data)
            $("#desc_nombre").html(data[0].nombre);
            $("#desc_desc").html(data[0].descripcion);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert("Status: " + textStatus); alert("Error: " + errorThrown);
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
            //console.log(XMLHttpRequest.responseText);
        }
    });
}