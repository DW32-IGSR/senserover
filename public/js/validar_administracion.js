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
        
        $('#form_rango_fecha').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            //container: '#errores',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                Rango_fecha_inicio: {
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
                Rango_fecha_final: {
                    validators: {
                        notEmpty: {
                            message: 'Fecha requerida'
                        },
                        date: {
                            format: 'DD/MM/YYYY',
                            message: 'La fecha no es válida'
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