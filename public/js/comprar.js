$("a[name$='comprar_pak']").click(function(){
    if($("#nombre_usuario").html()!=undefined){
        $("#seccion-compra").fadeIn();
        
        //comprobado
        var offset = -12; //Offset of 20px
        $('html, body').animate({scrollTop: $("#seccion-compra").offset().top + offset}, 1000);
    } else {
        $('#ModalLogeado').modal('show');
    }
});

$("#btn_form_comprar").click(function() {
   $('#ModalCompra').modal('show');
    
})

$('#tipo_basico').click(function() {
    $("input[name=tipo_subscripcion][value='basico']").attr('checked', 'checked');
    $("#lbl_basico").addClass('active');
    $("#lbl_estandar").removeClass('active');
    $("#lbl_profesional").removeClass('active');
})

$('#tipo_estandar').click(function() {
    $("input[name=tipo_subscripcion][value='estandar']").attr('checked', 'checked');
    $("#lbl_basico").removeClass('active');
    $("#lbl_estandar").addClass('active');
    $("#lbl_profesional").removeClass('active');
})

$('#tipo_profesional').click(function() {
    $("input[name=tipo_subscripcion][value='profesional']").attr('checked', 'checked');
    $("#lbl_basico").removeClass('active');
    $("#lbl_estandar").removeClass('active');
    $("#lbl_profesional").addClass('active');
})