//https://github.com/mqttjs/MQTT.js#browser
//56939648e4b0166e3b6a60f6
//var client = mqtt.connect('mqtts://test.mosquitto.org:8081'); // you add a ws:// url here
//var client = mqtt.connect('wss://test.mosquitto.org:8081'); // you add a ws:// url here
var client = mqtt.connect('mqtt://test.mosquitto.org:8080'); // you add a ws:// url here

$("#btn_parada_marcha").click(function() {
    //console.log("parar");
    if($("#btn_parada_marcha").html()=="parar dron"){
        $("#btn_parada_marcha").html("continuar ruta");
        client.publish($("#seleccionador").val(), "para");
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
    //console.log("mensaje "+message);
    if ($("#dron_log li").length >= 10) {
        $("#dron_log li")[0].remove();
    }
    $("#dron_log").append("<li>"+new Date()+" : "+message+"</li>");
});