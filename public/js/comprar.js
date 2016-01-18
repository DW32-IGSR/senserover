
$("#btn_compra").click(function(){
    if($("#usuario").value!=""){
        $("#seccion-form-compra").fadeIn()
        $("#seccion-paquete").fadeIn()
    } else {
        $("#seccion-form-compra").append(<a class="btn btn-primary boton-registro" data-ix="login" role="button">Entrar</a>)
    }    
})