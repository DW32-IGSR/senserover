var fechas=[]; 
var datosTemp=[];
var datosHum=[];
var datosCO2=[];
var datosRad=[];
var datosLum=[];

$(document).ready(function() {
    $.ajax({
    type: "GET",
    url: "http://dron-terrestre.rhcloud.com/datosj.php",
    //url: "https://sense-dron-nohtrim.c9users.io/sense_dron/devolverDatos.php",
    
    dataType: "json",
   
        success: function(data) {
            for(var i=0; i<data.length; i++){
                console.log(data)
                $( "#tabla" ).append(
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
                datosHum.push(parseInt(data[i].humedad));
                datosCO2.push(parseFloat(data[i].co2));
                datosRad.push(parseFloat(data[i].radiacion));
                datosLum.push(parseFloat(data[i].luminosidad));
            };
            //fechas=["January", "February", "March", "April", "May", "June", "July"];
            //console.log(fechas);
            //console.log(datosTemp);
            //console.log(datosHum);
            //dibujargrafica(); 
            dibujargrafica2();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert("Status: " + textStatus); alert("Error: " + errorThrown);
            console.log(XMLHttpRequest.responseText);
            $( "#resultado" ).html(XMLHttpRequest.responseText);
        }
    })
});