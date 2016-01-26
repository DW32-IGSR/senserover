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
                            message: 'Introduce la temperatura mínima'
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                	}
            	},
            	tempMaxima: {
                	validators: {
	                    notEmpty: {
                            message: 'Introduce la temperatura máxima'
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                	}
            	},
            	humMinima: {
                	validators: {
	                    notEmpty: {
                            message: 'Introduce la humedad mínima'
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                	}
            	},
            	humMaxima: {
                	validators: {
	                    notEmpty: {
                            message: 'Introduce la humedad máxima'
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                	}
            	},
            	co2Minima: {
                	validators: {
	                    notEmpty: {
                            message: 'Introduce el co2 mínimo'
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                	}
            	},
            	co2Maxima: {
                	validators: {
	                    notEmpty: {
                            message: 'Introduce el co2 máximo'
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                	}
            	},
            	radMinima: {
                	validators: {
	                    notEmpty: {
                            message: 'Introduce la radiación mínima'
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                	}
            	},
            	radMaxima: {
                	validators: {
	                    notEmpty: {
                            message: 'Introduce la radiación máxima'
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                	}
            	},
            	luxMinima: {
                	validators: {
	                    notEmpty: {
                            message: 'Introduce la luminosidad mínima'
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                	}
            	},
            	luxMaxima: {
                	validators: {
	                    notEmpty: {
                            message: 'Introduce la luminosidad máxima'
                        },
                        numeric: {
                            message: 'Ej: 6.6',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                	}
            	},
            	batMinima: {
                	validators: {
	                    notEmpty: {
                            message: 'Introduce la batería mínima'
                        },
                        numeric: {
                            message: 'Ej: 25.5',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                	}
            	}
            }
        });
    });
});