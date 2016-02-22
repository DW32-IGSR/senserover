//https://github.com/mqttjs/MQTT.js#browser
var client = mqtt.connect('mqtt://test.mosquitto.org:8080'); // you add a ws:// url here

$("#btn_parada_marcha").click(function() {
    //console.log("parar");
    if($("#btn_parada_marcha").html()=="parar dron"){
        client.publish($("#seleccionador").val(), "para");
        $("#btn_parada_marcha").html("continuar ruta");
    }else{
        $("#btn_parada_marcha").html("parar dron");
        client.publish($("#seleccionador").val(), "marcha");
    }
});

$("#btn_estado").click(function() {
    //console.log("estado");
    client.publish($("#seleccionador").val(), "estado");
});

client.on("message", function(topic, message) {
    console.log("mensaje "+message);
    $("#dron_log").append("<br>"+new Date()+" : "+message);
    //guardar mensaje bd
    var url = "/apiDatos/log/"+$("#seleccionador").val()+"/"+message;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url);
    httpRequest.send();    
    //client.end();
});