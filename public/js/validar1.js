$(document).ready(function(){
	$("#boton").click(function(){
     	
    	//cambio de nombres
	/*
		antiguo => nuevo
		email-form formulario_contacto
		Name-2 nombre_contacto
		Name-3 asunto_contacto
		Email-2 email_contacto
		field-3 mensaje_contacto
	*/ 
     	
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
		        asunto: {
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
	
	$("#boton2").click(function(){
	    $("#email-form-2").validate ({
			rules: {
				user: {
					required: true, 
					user: true, 
					maxlength: 15
				},
				nombre: {
					required: true, 
					nombre: true, 
					minlength: 8, 
					maxlength: 20
				},
			},
 
        	messages: {
    			user: {
					required: 'El user es requerido', 
					user: 'El formato de user es incorrecto', 
					maxlength: 'El máximo permitido son 15 caracteres'
				},
		        nombre: {
					required: 'El nombre es requerido',  
					minlength: 'El mínimo permitido son 8 caracteres', 
					maxlength: 'El máximo permitido son 20 caracteres'
		        },
			}
     	});
	});
	
    $("#boton3").click(function(){
     	$("#email-form-2-registro").validate ({
			rules: {
				user: {
					required: true, 
					user: true, 
					maxlength: 15
				},
				nombre: {
					required: true, 
					nombre: true, 
					minlength: 8, 
					maxlength: 20
				},
				email: {
					required: true, 
					email: true, 
					minlength: 5, 
					maxlength: 80
				},
			},
 
        	messages: {
    			user: {
					required: 'El user es requerido', 
					user: 'El formato de user es incorrecto', 
					maxlength: 'El máximo permitido son 15 caracteres'
				},
		        nombre: {
					required: 'El nombre es requerido', 
					minlength: 'El mínimo permitido son 8 caracteres', 
					maxlength: 'El máximo permitido son 20 caracteres'
		        },
		        email: {
					required: 'El email es requerido', 
					email: 'El formato de email es incorrecto', 
					minlength: 'El mínimo permitido son 5 caracteres',
					maxlength: 'El máximo permitido son 80 caracteres'
				},
			}
     	});
    });
});