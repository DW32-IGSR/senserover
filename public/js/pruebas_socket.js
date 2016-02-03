//var socket = io();
//56939648e4b0166e3b6a60f6


/*socket.on('updaterooms', function(rooms, current_room) {
    //$('#rooms').empty();
    $.each(rooms, function(key, value) {
        if (value == current_room) {
            //$('#rooms').append('<option value=' + value + ' selected >' + value + '</option>');
        }
        else {
            //$('#rooms').append('<option value=' + value + '>' + value + '</option>');
        }
    });
});*/

//socket.on('chat '+$("#dron_seleccionado").html(), function( temp, hum, co2, rad, lum, bat){
socket.on('updatechat', function(temp,hum,co2,rad,lum,bat){
    console.log("update chat"+temp+" "+hum+" "+co2+" "+rad+" "+lum+" "+bat);
    console.log("funciona?");
    datosTemp.push(parseFloat(temp));
    datosHum.push(parseInt(hum));
    datosCO2.push(parseFloat(co2));
    datosRad.push(parseFloat(rad));
    datosLum.push(parseFloat(lum));
    datosBat.push(parseFloat(bat));    
    dibujargrafica2();
    $("#temp-ultimo").html(temp);
    $("#hum-ultimo").html(hum);
    $("#co2-ultimo").html(co2);
    $("#rad-ultimo").html(rad);
    $("#lum-ultimo").html(lum);
    $("#bat-ultimo").html(bat);
    colorearEstado();
});
function switchRoom(room) {
    console.log("funcion switchRoom(" + room + ")");
    socket.emit('switchRoom', room);
}