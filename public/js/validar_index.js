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
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Email requerido'
                        },
                        emailAddress: {
                            message: 'Email no válido'
                        },
                        stringLength: {
                            min: 3,
                            max: 60,
                            message: 'Mínimo 3 y máximo 60 carácteres'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu contraseña'
                        },
                        stringLength: {
                            min: 8,
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
                        },
                        stringLength: {
                            min: 3,
                            max: 60,
                            message: 'Mínimo 3 y máximo 60 carácteres'
                        }
                    }
                },
                password: {
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
                password2: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu contraseña'
                        },
                        identical: {
                            field: 'password',
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

    $("#btn_forget_pass").click(function() {
        $('#forget_pass_form').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            //container: '#errores',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Email requerido'
                        },
                        emailAddress: {
                            message: 'Email no válido'
                        },
                        stringLength: {
                            min: 3,
                            max: 60,
                            message: 'Mínimo 3 y máximo 60 carácteres'
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
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: 'El mínimo permitido es de 3 caracteres y máximo de 30'
                    }
                },
                asunto_contacto: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce el asunto del formulario'
                        }
                    },
                    stringLength: {
                        min: 3,
                        max: 50,
                        message: 'El mínimo permitido es de 3 caracteres y máximo de 50'
                    }
                },
                email_contacto: {
                    validators: {
                        notEmpty: {
                            message: 'Email requerido'
                        },
                        emailAddress: {
                            message: 'Email no válido'
                        },
                        stringLength: {
                            min: 3,
                            max: 60,
                            message: 'Mínimo 3 y máximo 60 carácteres'
                        }
                    }
                },
                mensaje_contacto: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce el mensaje'
                        }
                    },
                    stringLength: {
                        min: 5,
                        max: 400,
                        message: 'El mínimo permitido es de 10 caracteres y máximo de 400'
                    }
                }
            }
        });
    });
    $('#formulario_contacto').on('submit', function(e) {
        $('#memail').modal('show');
        /*setTimeout(function () {
           window.location.href = "/perfil"; //will redirect to your blog page (an ex: blog.html)
        }, 1000);*/
    });
    $('#forget_pass_form').on('submit', function(e) {
        $('#modalPassOlvidada').modal('hide');
        $('#mforget_pass').modal('show');
        /*setTimeout(function () {
           window.location.href = "/perfil"; //will redirect to your blog page (an ex: blog.html)
        }, 1000);*/
    });

    //en proceso
    $('#email-form-2-registro').on('submit', function(e) {
        $('#ModalLoginRegistro').modal('hide');
        $('#mregistro').modal('show');
    });
   $('#inicio-session').on('submit', function(e) {
        $('#ModalLoginRegistro').modal('hide');
        $('#miniciosesion').modal('show');
        setTimeout(function() {
            $('#miniciosesion').modal('hide');
        }, 1000);
    });



})