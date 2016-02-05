$(document).ready(function() {

    $("#btn_form_alertas").click(function() {

        $('#form_alertas').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            //container: '#errores',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                tempMinima: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: ' '
                        }
                    }
                },
                tempMaxima: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: ' '
                        },
                        between: {
                            min: 'tempMinima',
                            max: '100',
                            message: ' '
                        }
                    }
                },
                humMinima: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: ' '
                        }
                    }
                },
                humMaxima: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: ' '
                        },
                        between: {
                            min: 'humMinima',
                            max: '100',
                            message: ' '
                        }
                    }
                },
                co2Minima: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: ' '
                        }
                    }
                },
                co2Maxima: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: ' '
                        },
                        between: {
                            min: 'co2Minima',
                            max: '100',
                            message: ' '
                        }
                    }
                },
                radMinima: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: ' '
                        }
                    }
                },
                radMaxima: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: ' '
                        },
                        between: {
                            min: 'radMinima',
                            max: '100',
                            message: ' '
                        }
                    }
                },
                luxMinima: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: ' '
                        }
                    }
                },
                luxMaxima: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: ' '
                        },
                        between: {
                            min: 'radMinima',
                            max: '100',
                            message: ' '
                        }
                    }
                },
                batMinima: {
                    validators: {
                        notEmpty: {
                            message: ' '
                        },
                        numeric: {
                            message: 'Ej: 25.5',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        },
                        stringLength: {
                            min: 1,
                            max: 5,
                            message: ' '
                        },
                        between: {
                            min: '0',
                            max: '100',
                            message: ' '
                        }
                    }
                }
            }
        });
        
        $('#formulario').bootstrapValidator({
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
                        }
                    }
                },
                apellido: {
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu apellido'
                        }
                    }
                },
                edad:{ 
                    validators: {
                        notEmpty: {
                            message: 'Introduce tu edad'
                        },
                        digits: {
                            message: 'Solo números'
                        },
                        between: {
                            min: 0,
                            max: 105,
                            message: 'La edad debe estar entre 0 y 105'
                        }
                    }
                },
                nif: {
                    validators: {
                        notEmpty: {
                            message: 'NIF requerido'
                        },
                        id: {
                            country: 'ES',
                            message: 'El NIF introducido no es válido en %s'
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
                provincias: {
                    validators: {
                        notEmpty: {
                            message: 'Provincia requerido'
                        }
                    }
                },
                fecha: {
                    validators: {
                        notEmpty: {
                            message: 'Fecha requerida'
                        },
                        date: {
                            format: 'DD/MM/YYYY',
                            message: 'La fecha no es válida'
                        }
                    }
                },
                telefono: {
                    validators: {
                        notEmpty: {
                            message: 'Teléfono requerido'
                        },
                        phone: {
                            country: 'ES',
                            message: 'El número de teléfono introducido no es válido en %s'
                        }
                    }
                },
                hora: {
                    validators: {
                        notEmpty: {
                            message: 'Hora requerida'
                        },
                        regexp: {
                            regexp: /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9]{2})(:([0-5]?[0-9]{2}))?$/, // /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/
                            message: 'Hora incorrecta'
                        }
                    }
                }
            }
        });
    
    });

    //en proceso
    $('#form_alertas').on('submit', function(e) {
        $('#malertas').modal('show');
        setTimeout(function() {
            $('#malertas').modal('hide');
        }, 3000);
    });
});