$(document).ready(function() {

    $("#btn_form_comprar").click(function() {

        $('#formulario_compra').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            //container: '#errores',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                nombre_compra: {
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
                apellidos_compra: {
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
                dni_compra: {
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
                direccion_compra: {
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
                cp_compra: {
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
                email_compra: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu email'
                        },
                        emailAddress: {
                            message: 'Email no válido'
                        }
                    }
                },
                producto_compra: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce el nombre del producto'
                        },
                        stringLength: {
                            min: 1,
                            max: 20,
                            message: 'El mínimo permitido es de 3 caracteres y máximo de 20'
                        }
                    }
                }
            }
        }).on('success.form.bv', function(e) {
            $('#mcompra').modal('show');
        });
    });
    /*$('#formulario_compra').on('submit', function(e) {
        $('#mcompra').modal('show');
        setTimeout(function() {
            window.location.href = "/perfil"; //will redirect to your blog page (an ex: blog.html)
        }, 1000);
    });*/
})