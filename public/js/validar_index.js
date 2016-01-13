$(document).ready(function(){
	$("#boton").click(function(){
     	
    	$("#formulario_contacto").validate ({
			rules: {
				email_contacto: {
					required: true, 
					email: true, 
					minlength: 5, 
					maxlength: 80
				},
				nombre_contacto: {
					required: true, 
					nombre: true, 
					minlength: 2, 
					maxlength: 50
				},
				asunto_contacto: {
					required: true, 
					asunto: true, 
					minlength: 2, 
					maxlength: 50
				},
				mensaje_contacto: {
					required: true, 
					mensaje: true, 
					minlength: 2, 
					maxlength: 50
				},
			},
 
        	messages: {
    			email_contacto: {
					required: 'El email es requerido', 
					email: 'El formato de email es incorrecto', 
					minlength: 'El mínimo permitido son 5 caracteres',
					maxlength: 'El máximo permitido son 80 caracteres'
				},
		        nombre_contacto: {
					required: 'El nombre es requerido', 
					nombre: 'Sólo letras', 
					minlength: 'El mínimo permitido son 2 caracteres', 
					maxlength: 'El máximo permitido son 50 caracteres'
		        },
		        asunto_contacto: {
					required: 'El apellido es requerido', 
					minlength: 'El mínimo permitido son 2 caracteres', 
					maxlength: 'El máximo permitido son 30 caracteres'
		        },
				mensaje_contacto: {
					required: 'El mensaje es requerido', 
					minlength: 'El mínimo permitido son 2 caracteres', 
					maxlength: 'El máximo permitido son 50 caracteres'
		        },
			}
     	});
	});
	
	/*$("#boton2").click(function(){
	    $("#inicio-session").validate ({
			rules: {
				usuario: {
					required: true, 
					usuario: true, 
					maxlength: 15
				},
				contrasenya: {
					required: true, 
					contrasenya: true, 
					minlength: 8, 
					maxlength: 20
				},
			},
 
        	messages: {
    			usuario: {
					required: 'El user es requerido', 
					usuario: 'El formato de user es incorrecto', 
					maxlength: 'El máximo permitido son 15 caracteres'
				},
		        contrasenya: {
					required: 'El nombre es requerido',  
					minlength: 'El mínimo permitido son 8 caracteres', 
					maxlength: 'El máximo permitido son 20 caracteres'
		        },
			}
     	});
	});*/
	$("#boton2").click(function(){
        $("#inicio-session").validate({
            rules: {
                usuario: {
                    required: true,
                    maxlength: 15
                },
                contrasenya: {
            		required: true,
            		//minlength: 8, 
            		maxlength: 20
            	}
            },
           messages: {
                usuario: {
                    required: 'Campo obligatorio',
                    maxlength: 'Tamanyo maximo 15'
                },
                contrasenya: {
                    required: 'Campo obligatorio',
                    //minlength: 'Tamanyo minimo 8',
                    maxlength: 'Tamanyo maximo 15'
                }
           },
           submitHandler: function(form) {
           		form.submit()
           }
        })
    })
    
    $("#boton3").click(function(){
        $("#email-form-2-registro").validate({
            rules: {
                usuario: {
                    required: true,
                    maxlength: 15
                },
                email: {
            		required: true,
            		email: true,
					minlength: 5,
					maxlength: 80
            	},
                contrasenya: {
            		required: true,
            		minlength: 8,
            		maxlength: 20
            	}
            	,
                contrasenya2: {
            		required: true,
            		minlength: 8,
            		maxlength: 20
            	}
            },
           messages: {
                usuario: {
                    required: 'Campo obligatorio',
                    maxlength: 'Tamanyo maximo 15'
                },
                email: {
            		required: 'Campo obligatorio',
            		email: 'No es un email valido',
					minlength: 'Tamanyo minimo 5',
					maxlength: 'Tamanyo maximo 80'
            	},
                contrasenya: {
            		required: 'Campo obligatorio',
            		minlength: 'Tamanyo minimo 8',
            		maxlength: 'Tamanyo maximo 20'
            	}
            	,
                contrasenya2: {
            		required: 'Campo obligatorio',
            		minlength: 'Tamanyo minimo 8',
            		maxlength: 'Tamanyo maximo 20'
            	}
           }
        });
    });
	
    /*$("#boton3").click(function(){
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
    });*/
});