$(document).ready(function() {
	
    $("#btn_login").click(function() {

        $('#inicio-session').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            //container: '#errores',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                usuario: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu usuario'
                        },
                        stringLength: {
                        	min: 3,
	                        max: 20,
	                        message: 'Mínimo 3 y máximo 20 carácteres'
	                    }
                    }
                },
                contrasenya: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu contraseña'
                        },
                        stringLength: {
                        	min: 2,
	                        max: 20,
	                        message: 'Mínimo 2 y máximo 20 carácteres'
	                    }
                    }
                }
            }
        });
    });
    
    $("#btn_registro").click(function() {
        $('#email-form-2-registro').bootstrapValidator({
        	// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            //container: '#errores',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                usuario: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu nombre de usuario'
                        },
                        stringLength: {
                        	min: 3,
	                        max: 20,
	                        message: 'Mínimo 3 y máximo 20 carácteres'
	                    }
                    }
                },
                email: {
                	validators: {
	                    notEmpty: {
	                        message: 'Email requerido'
	                    },
	                    emailAddress: {
	                        message: 'Email no válido'
	                    }
                	}
            	},
            	contrasenya: {
            		validators: {
                        notEmpty: {
                            message: 'Introduce tu contraseña'
                        },
	                    different: {
	                        field: 'usuario',
	                        message: 'La contraseña no puede ser igual al usuario'
	                    },
                        stringLength: {
                        	min: 8,
	                        max: 20,
	                        message: 'Mínimo 8 y máximo 20 carácteres'
	                    }
                    }
            	},
                contrasenya2: {
            		validators: {
                    	notEmpty: {
							message: 'Introduce tu contraseña'
                        },
	                    identical: {
		                    field: 'contrasenya',
		                    message: 'Las contraseñas no coinciden'
		                },
                        stringLength: {
                        	min: 8,
	                        max: 20,
	                        message: 'Mínimo 8 y máximo 20 carácteres'
	                    }
            		}
                }
            }
        });
    });
    
    $("#btn_contacto").click(function() {
    	$("#formulario_contacto").bootstrapValidator({
    		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            //container: '#errores',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                nombre_contacto: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu nombre'
                        }
                    }
                },
                asunto_contacto: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce el asunto del correo'
                        }
                    }
                },
                email_contacto: {
                    validators: {
                        notEmpty: {
	                        message: 'Email requerido'
	                    },
	                    emailAddress: {
	                        message: 'Email no válido'
	                    }
                    }
                },
                mensaje_contacto: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce el mensaje'
                        }
                    }
                }
            }
     	});
	});
});