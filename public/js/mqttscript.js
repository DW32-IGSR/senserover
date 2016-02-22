var client = mqtt.connect('mqtt://test.mosquitto.org'); // you add a ws:// url here

client.subscribe($("#dron_seleccionado").html());
//"56939648e4b0166e3b6a60f6"

/*
client.on("message", function(topic, payload) {
alert([topic, payload].join(": "));
client.end();
});
*/

//client.publish("mqtt/demo", "hello world!");