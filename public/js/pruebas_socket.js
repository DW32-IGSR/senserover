var socket = io();
//56939648e4b0166e3b6a60f6
//socket.on('chat '+$("#dron_seleccionado").html(), function( temp, hum, co2, rad, lum, bat){
socket.on('chat 56939648e4b0166e3b6a60f6', function(temp,hum,co2,rad,lum,bat){
    //$('#messages').append($('<li>').text(msg));
    console.log("funciona?");
    colorearEstado();
    datosTemp.push(parseFloat(temp));
    datosHum.push(parseInt(hum));
    datosCO2.push(parseFloat(co2));
    datosRad.push(parseFloat(rad));
    datosLum.push(parseFloat(lum));
    datosBat.push(parseFloat(bat));    
    dibujargrafica2();
    console.log(temp+" "+hum+" "+co2+" "+rad+" "+lum+" "+bat);
    $("#temp-ultimo").html(temp);
    $("#hum-ultimo").html(hum);
    $("#co2-ultimo").html(co2);
    $("#rad-ultimo").html(rad);
    $("#lum-ultimo").html(lum);
    $("#bat-ultimo").html(bat);
});