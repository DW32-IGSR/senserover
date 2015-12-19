//$(function () {
    function dibujargrafica2(){
        $('#Temperatura').highcharts({
            title: {
                text: 'Temperatura (°C)',
                x: -20 //center
            },
            subtitle: {
                //text: 'Source: WorldClimate.com',
                x: -20
            },
            
            //meter array de fechasfechas
            
            xAxis: {
                //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                categories: fechas
            },
            yAxis: {
                title: {
                    text: 'Temperatura (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            
            //meter arrays de valores
            
            series: [
                {
                    name: 'Temperatura',
                    data: datosTemp
                }
            ]
        });
        $('#Humedad').highcharts({
            title: {
                text: 'Humedad (%)',
                x: -20 //center
            },
            subtitle: {
                //text: 'Temperatura, humedad, CO2, radiacion y luminosidad',
                x: -20
            },
            
            //meter array de fechasfechas
            
            xAxis: {
                //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                categories: fechas
            },
            yAxis: {
                title: {
                    text: 'Humedad (%)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: 'pink'
                }]
            },
            tooltip: {
                valueSuffix: '%'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            
            //meter arrays de valores
            
            series: [
                {
                    name: 'Humedad',
                    data: datosHum
                }
            ]
        });
        $('#CO2').highcharts({
            title: {
                text: 'CO2 (ppm)',
                x: -20 //center
            },
            subtitle: {
                //text: 'Source: WorldClimate.com',
                x: -20
            },
            
            //meter array de fechasfechas
            
            xAxis: {
                //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                categories: fechas
            },
            yAxis: {
                title: {
                    text: 'CO2 (ppm)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'ppm'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            
            //meter arrays de valores
            
            series: [
                {
                    name: 'CO2',
                    data: datosCO2
                }
            ]
        });
        $('#Radiacion').highcharts({
            title: {
                text: 'Radiación (W/m^2)',
                x: -20 //center
            },
            subtitle: {
                //text: 'Source: WorldClimate.com',
                x: -20
            },
            
            //meter array de fechasfechas
            
            xAxis: {
                //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                categories: fechas
            },
            yAxis: {
                title: {
                    text: 'Radiación (W/m^2)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'W/m^2'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            
            //meter arrays de valores
            
            series: [
                {
                    name: 'Radiación',
                    data: datosRad
                }
            ]
        });
        $('#Luminosidad').highcharts({
            title: {
                text: 'Luminosidad (lux)',
                x: -20 //center
            },
            subtitle: {
                //text: 'Source: WorldClimate.com',
                x: -20
            },
            
            //meter array de fechasfechas
            
            xAxis: {
                //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                categories: fechas
            },
            yAxis: {
                title: {
                    text: 'Luminosidad (lux)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'lux'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            
            //meter arrays de valores
            
            series: [
                {
                    name: 'Luminosidad',
                    data: datosLum
                }
            ]
        });
    }    
//});