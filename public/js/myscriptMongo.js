var fechas = [];
var datosTemp = [];
var datosHum = [];
var datosCO2 = [];
var datosRad = [];
var datosLum = [];
var datosBat = [];
var id_dron = "";

//funcion (id_dron)
$(document).ready(function() {

    //$("#seleccionador").selected(function (){
    //$("#seleccionador").select(function (){ 
    $("#seleccionador").change(function() {
        id_dron = this.value;
        //se cambian las graficas y se cambian los valores en la seccion de estado
        //alert("hola")
        //console.log("prueba jueves "+this.value)
        //var c_url = "https://senserover-terrestre.rhcloud.com/datos/" + this.value;
        //var c_url = "https://sense-rover-nohtrim.c9users.io/datos/" + this.value;
        var c_url = document.location.href; //"https://sense-rover-nohtrim.c9users.io/administracion"
        c_url = c_url.replace("administracion", "datos/" + this.value);
        //id dron pruebas 56939648e4b0166e3b6a60f6
        //https://senserover-terrestre.rhcloud.com/datos/56939648e4b0166e3b6a60f6
        //console.log($("#temp-ultimo").html())
        //console.log(c_url);
        //id de dron en input de rangos de fecha
        document.getElementsByName('name_dron_rango')[0].value = this.value;
        document.getElementsByName('name_dron_rango')[1].value = this.value;
        document.getElementsByName('name_dron_rango')[2].value = this.value;
        document.getElementsByName('name_dron_rango')[3].value = this.value;
        document.getElementsByName('name_dron_rango')[4].value = this.value;
        //$("#id_dron_rango").html(this.value)
        $('#id_dron_alertas').attr('value', this.value);

        $("#dron_seleccionado").html(this.value);

        $.ajax({
            type: "GET",
            //url: "https://dron-terrestre.rhcloud.com/datosj.php",
            //https://sense-rover-nohtrim.c9users.io/datos/56a1dbef16d8dfdb5562113d
            url: c_url,

            dataType: "json",

            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    //console.log(data)
                    $("#tabla").append(
                        "<tr> <td align='center'><b>" + data[i].temperatura + "</b> ºC</td>" +
                        "<td align='center'><b>" + data[i].humedad + "</b> %</td>" +
                        "<td align='center'><b>" + data[i].co2 + "</b> ppm</td>" +
                        "<td align='center'><b>" + data[i].radiacion + "</b> W/m^2</td>" +
                        "<td align='center'><b>" + data[i].luminosidad + "</b> lux</td>" +
                        "<td align='center'>" + data[i].fecha + "</td>" +
                        "<td align='center'> <a href='borrarDatos.php?id=" + data[i].id + "'> Eliminar </a> </td>" +
                        "</tr>"
                    );
                    fechas.push(data[i].fecha);
                    datosTemp.push(parseFloat(data[i].temperatura));
                    //console.log("cambio"+parseFloat(data[i].temperatura));
                    datosHum.push(parseInt(data[i].humedad));
                    datosCO2.push(parseFloat(data[i].co2));
                    datosRad.push(parseFloat(data[i].radiacion));
                    datosLum.push(parseFloat(data[i].luminosidad));
                    datosBat.push(parseFloat(data[i].bateria));
                }
                //fechas=["January", "February", "March", "April", "May", "June", "July"];
                //console.log(fechas);
                //console.log(datosTemp);
                //console.log(datosHum);

                //var socket = io();
                //en proceso
                //console.log("on change" + this.value);
                switchRoom(id_dron);
                //en proceso                
                //socket.emit('updatechat', datosTemp[datosTemp.length - 1], datosHum[datosHum.length - 1], datosCO2[datosCO2.length - 1], datosRad[datosRad.length - 1], datosLum[datosLum.length - 1], datosBat[datosBat.length - 1]);
                //socket.emit('chat '+$("#dron_seleccionado").html(), datosTemp[datosTemp.length-1], datosHum[datosHum.length-1], datosCO2[datosCO2.length-1], datosRad[datosRad.length-1], datosLum[datosLum.length-1], datosBat[datosBat.length-1]);

                $("#temp-ultimo").html(datosTemp[datosTemp.length - 1]);
                $("#hum-ultimo").html(datosHum[datosHum.length - 1]);
                $("#co2-ultimo").html(datosCO2[datosCO2.length - 1]);
                $("#rad-ultimo").html(datosRad[datosRad.length - 1]);
                $("#lum-ultimo").html(datosLum[datosLum.length - 1]);
                $("#bat-ultimo").html(datosBat[datosBat.length - 1]);

                dibujargrafica2();
                colorearEstado();
                describir();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //alert("Status: " + textStatus); alert("Error: " + errorThrown);
                console.log(XMLHttpRequest.responseText);
                $("#resultado").html(XMLHttpRequest.responseText);
            }
        }); //ajax
    }); //selected (funcion(){    
})