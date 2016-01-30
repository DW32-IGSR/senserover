var socket = io();
//56939648e4b0166e3b6a60f6
socket.on('chat '+$("#dron_seleccionado").html(), function(temp,hum,co2,rad,lum,bat){
//socket.on('chat 56939648e4b0166e3b6a60f6', function(temp,hum,co2,rad,lum,bat){
    //$('#messages').append($('<li>').text(msg));
    console.log("funciona?");
    console.log(temp+" "+hum+" "+co2+" "+rad+" "+lum+" "+bat);
    $("#temp-ultimo").html(temp+"º");
    $("#hum-ultimo").html(hum+"%");
    $("#co2-ultimo").html(co2+" ppm");
    $("#rad-ultimo").html(rad+" w/m^2");
    $("#lum-ultimo").html(lum+" lux");
    $("#bat-ultimo").html(bat+"%");
});