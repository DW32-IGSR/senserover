//https://github.com/mqttjs/MQTT.js

$("#parada_dron").onclick(
    function(){
        console.log("parada");

        var url = "/mqtt/parada";

        var httpRequest = new XMLHttpRequest();
    
        if (!httpRequest) {
          alert('Giving up :( Cannot create an XMLHTTP instance');
          return false;
        }
        
        httpRequest.open('GET', url);
        httpRequest.send();
      }
);