$(document).ready(function(){
	$("#boton").click(function(){
     	
    	$("#email-form").validate ({
			rules: {
				email: {
					required: true, 
					email: true, 
					minlength: 5, 
					maxlength: 80
				},
				nombre: {
					required: true, 
					nombre: true, 
					minlength: 2, 
					maxlength: 50
				},
				asunto: {
					required: true, 
					asunto: true, 
					minlength: 2, 
					maxlength: 50
				},
				mensaje: {
					required: true, 
					mensaje: true, 
					minlength: 2, 
					maxlength: 50
				},
			},
 
        	messages: {
    			email: {
					required: 'El email es requerido', 
					email: 'El formato de email es incorrecto', 
					minlength: 'El mínimo permitido son 5 caracteres',
					maxlength: 'El máximo permitido son 80 caracteres'
				},
		        nombre: {
					required: 'El nombre es requerido', 
					nombre: 'Sólo letras', 
					minlength: 'El mínimo permitido son 2 caracteres', 
					maxlength: 'El máximo permitido son 50 caracteres'
		        },
		        Asunto: {
					required: 'El apellido es requerido', 
					minlength: 'El mínimo permitido son 2 caracteres', 
					maxlength: 'El máximo permitido son 30 caracteres'
		        },
				mensaje: {
					required: 'El mensaje es requerido', 
					minlength: 'El mínimo permitido son 2 caracteres', 
					maxlength: 'El máximo permitido son 50 caracteres'
		        },
			}
     	});
	});
});