$(document).ready(function() {
    $(".button-subs").click(function() {
        var id_dron = $(this).attr('id');
        var nombre_id_dron = $(this).attr('value');
        $('#id_dron_renovar').attr('value', id_dron);
        $('#nombre_dron_renovar').html(nombre_id_dron);
    });
});