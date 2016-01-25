
$("a[name$='comprar_pak']").click(function(){
    if($("#nombre_usuario").html()!=undefined){
        $("#seccion-compra").fadeIn()
        
        //comprobado
        var offset = -12; //Offset of 20px
        $('html, body').animate({scrollTop: $("#seccion-compra").offset().top + offset}, 1000)
    } else {
        $('#ModalLogeado').modal('show');
    }
})

$("#btn_form_comprar").click(function() {
   $('#ModalCompra').modal('show');
    
})