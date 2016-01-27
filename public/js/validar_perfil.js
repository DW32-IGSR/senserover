$(document).ready(function() {
	
    $("#btn_datos_personales").click(function() {

        $('#form_datos_personales').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            //container: '#errores',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                nombre: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu nombre'
                        },
                        stringLength: {
                        	min: 3,
	                        max: 20,
	                        message: 'El mínimo permitido es de 3 caracteres y máximo de 20'
	                    }
                    }
                },
                apellidos: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tus apellidos'
                        },
                        stringLength: {
                        	min: 3,
	                        max: 20,
	                        message: 'El mínimo permitido es de 3 caracteres y máximo de 20'
	                    }
                    }
                },
                dni: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu DNI'
                        },
                        id: {
                        country: 'ES',
                        message: 'El DNI introducido no es válido en %s'
                    }
                    }
                },
                direccion: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu dirección'
                        },
                        stringLength: {
                        	min: 3,
	                        max: 50,
	                        message: 'El mínimo permitido es de 3 caracteres y máximo de 50'
	                    }
                    }
                },
                cp: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu código postal'
                        },
                        /*zipCode: {
                            country: 'ES',
                            message: 'El código postal introducido no es válido en %s'
                        }*/
                        digits: {
                            message: 'Formato incorrecto'
                        },
                        stringLength: {
                        	min: 5,
	                        max: 5,
	                        message: 'Debe contener 5 dígitos'
	                    }
                        
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu email'
                        },
                        emailAddress: {
                            message: 'Email no válido'
                        }
                    }
                }
            }
        });
    });
    
    $("#btn_change_pass").click(function() {
        $('#form_change_pass').bootstrapValidator({
        	// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            //container: '#errores',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                pass_actual: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu contraseña actual'
                        },
                        stringLength: {
                        	min: 8,
	                        max: 20,
	                        message: 'El mínimo permitido es de 8 caracteres y máximo de 20'
	                    }
                    }
                },
                pass_nueva: {
                	validators: {
	                    notEmpty: {
                            message: 'Introduce tu nueva contraseña'
                        },
	                    different: {
	                        field: 'pass_actual',
	                        message: 'La nueva contraseña no puede ser igual a la contraseña actual'
	                    },
                        stringLength: {
                        	min: 8,
	                        max: 20,
	                        message: 'El mínimo permitido es de 8 caracteres y máximo de 20'
	                    }
                	}
            	},
            	pass_nueva_conf: {
            		validators: {
            		    notEmpty: {
                            message: 'Introduce tu nuea contraseña'
                        },
                        identical: {
		                    field: 'pass_nueva',
		                    message: 'Las contraseñas no coinciden'
		                },
                        stringLength: {
                        	min: 8,
	                        max: 20,
	                        message: 'El mínimo permitido es de 8 caracteres y máximo de 20'
	                    }
                    }
            	}
            }
        });
    });
    
    $('#form_datos_personales').on('submit', function(e) {
        $('#mperfil').modal('show');
        setTimeout(function () {
           $('#mperfil').modal('hide');
        }, 3000);
    }); 
    $('#form_change_pass').on('submit', function(e) {
        $('#mperfil2').modal('show');
        setTimeout(function () {
           $('#mperfil2').modal('hide');
        }, 3000);
    });     
});