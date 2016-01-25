var fechas=[] 
var datosTemp=[]
var datosHum=[]
var datosCO2=[]
var datosRad=[]
var datosLum=[]
var datosBat=[]

//funcion (id_dron)
$(document).ready(function() {
    
    //$("#seleccionador").selected(function (){
    $("#seleccionador").change(function (){
        //se cambian las graficas y se cambian los valores en la seccion de estado
        //alert("hola")
        //console.log("prueba jueves "+this.value)
        //var url_dron="http://senserover-terrestre.rhcloud.com/datos/"+this.value
        var url_dron="https://sense-rover-nohtrim.c9users.io/datos/"+this.value
        //id dron pruebas 56939648e4b0166e3b6a60f6
        //https://senserover-terrestre.rhcloud.com/datos/56939648e4b0166e3b6a60f6
        //console.log($("#temp-ultimo").html())
        console.log(url_dron)
        //id de dron en input de rangos de fecha
        document.getElementsByName('name_dron_rango')[0].value = this.value
        document.getElementsByName('name_dron_rango')[1].value = this.value
        document.getElementsByName('name_dron_rango')[2].value = this.value
        document.getElementsByName('name_dron_rango')[3].value = this.value
        document.getElementsByName('name_dron_rango')[4].value = this.value
        //$("#id_dron_rango").html(this.value)
        $('#id_dron_rango').attr('value', this.value)
        
        $("#dron_seleccionado").html(this.value)
        
        $.ajax({
        type: "GET",
        //url: "http://dron-terrestre.rhcloud.com/datosj.php",
        //http://sense-rover-nohtrim.c9users.io/datos/56a1dbef16d8dfdb5562113d
        url: url_dron,
        
        dataType: "json",
       
            success: function(data) {
                for(var i=0; i<data.length; i++){
                    //console.log(data)
                    $( "#tabla" ).append(
                        "<tr> <td align='center'><b>" + data[i].temperatura + "</b> ºC</td>" +
                            "<td align='center'><b>" + data[i].humedad + "</b> %</td>" +
                            "<td align='center'><b>" + data[i].co2 + "</b> ppm</td>" +
                            "<td align='center'><b>" + data[i].radiacion + "</b> W/m^2</td>" +
                            "<td align='center'><b>" + data[i].luminosidad + "</b> lux</td>" +
                            "<td align='center'>" + data[i].fecha + "</td>" +
                            "<td align='center'> <a href='borrarDatos.php?id=" + data[i].id + "'> Eliminar </a> </td>" +
                        "</tr>"
                    )
                    fechas.push(data[i].fecha);
                    datosTemp.push(parseFloat(data[i].temperatura))
                    //console.log("cambio"+parseFloat(data[i].temperatura))
                    datosHum.push(parseInt(data[i].humedad))
                    datosCO2.push(parseFloat(data[i].co2))
                    datosRad.push(parseFloat(data[i].radiacion))
                    datosLum.push(parseFloat(data[i].luminosidad))
                    datosBat.push(parseFloat(data[i].bateria))
                }
                //fechas=["January", "February", "March", "April", "May", "June", "July"];
                //console.log(fechas);
                //console.log(datosTemp);
                //console.log(datosHum);
                //dibujargrafica();
                $("#temp-ultimo").html(datosTemp[datosTemp.length-1]+"º")
                $("#hum-ultimo").html(datosHum[datosHum.length-1]+"%")
                $("#co2-ultimo").html(datosCO2[datosCO2.length-1]+" ppm")
                $("#rad-ultimo").html(datosRad[datosRad.length-1]+" w/m^2")
                $("#lum-ultimo").html(datosLum[datosLum.length-1]+" lux")
                $("#bat-ultimo").html(datosBat[datosBat.length-1]+"%")
                dibujargrafica2()
                colorearEstado()
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //alert("Status: " + textStatus); alert("Error: " + errorThrown);
                console.log(XMLHttpRequest.responseText);
                $( "#resultado" ).html(XMLHttpRequest.responseText)
            }
        })//ajax
    })//selected (funcion(){    
})