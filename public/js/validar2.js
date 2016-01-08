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

    $("#boton3").click(function(){
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
    });