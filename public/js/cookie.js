$(document).ready(function() {

    if ($.cookie("senseRover_id") == undefined) {
        //cargaDron();
    }
    else {
        var id_dron = $.cookie("senseRover_id");
        //alert("else undefined")
        //$('#seleccionador option[value="56939648e4b0166e3b6a60f6"]').prop('selected', true);
        //console.log("cookie: " + id_dron);
        $('#seleccionador option[value=' + id_dron + ']').prop('selected', true);
        
        cargaDron(id_dron);
    }

})