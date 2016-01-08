$(document).ready(function(){
    
    jQuery.validator.addMethod( "nifES", function ( value, element ) {
        "use strict";
        value = value.toUpperCase();
        // Basic format test
        if ( !value.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)') ) {
            return false;
        }
        // Test NIF
        // Con sólo este if funciona
        if ( /^[0-9]{8}[A-Z]{1}$/.test( value ) ) {
            return ( "TRWAGMYFPDXBNJZSQVHLCKE".charAt( value.substring( 8, 0 ) % 23 ) === value.charAt( 8 ) );
        }
        // Test specials NIF (starts with K, L or M)
        if ( /^[KLM]{1}/.test( value ) ) {
            return ( value[ 8 ] === String.fromCharCode( 64 ) );
        }
        return false;
    }, "Especifica un número de NIF válido" );
    //validacion de nif  
	
	//cambio de nombres
	/*
		antiguo => nuevo
		email-form formulario_compra
		Name-2 nombre_compra
		Name-3 apellidos_compra
		Name-4 dni_compra
		Email-2 direccion_compra
		Name-5 cp_compra
		Email-3 email_compra
		Email-4 producto_compra
	*/
	
	
    $("#boton").click(function(){
     	$("#email-form").validate ({
			rules: {
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
				apellido: {
	               required: true, 
	               apellido: true, 
	               minlength: 2, 
	               maxlength: 50
	                   
	               },
	           posta: {
	               required: true, 
	               digits: true, 
	               minlength: 1, 
	               maxlength: 5
	                   
	               },
	           nif: {
                    nifES: true
            
                },
			},
 
        	messages: {
    			apellido: {
                    required: 'El apellido es requerido', 
                    apellido: 'Sólo letras', 
                    minlength: 'El mínimo permitido son 2 caracteres', 
                    maxlength: 'El máximo permitido son 50 caracteres'
                    
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
				 posta: {
	               required: 'El código postal es requerido', 
	               digits: 'Sólo dígitos', 
	               minlength: 'El mínimo permitido son 1 caracteres', 
	               maxlength: 'El máximo permitido son 5 caracteres'
	               
	           },
	           	nif: {
    	            nifES: 'Formato de NIF incorrecto: 8 numeros y una letra'
    	},
			}
     	});
     });
     
     $("#boton2").click(function(){
     	$("#email-form").validate ({
     	    rules: {
				
				password: {
					required: true, 
					password: true, 
					minlength: 8, 
					maxlength: 20
				},
			},
 
        	messages: {
    		
		        password: {
					required: 'El password es requerido',  
					minlength: 'El mínimo permitido son 8 caracteres', 
					maxlength: 'El máximo permitido son 20 caracteres'
		        },
			}
     	});
     });
    });