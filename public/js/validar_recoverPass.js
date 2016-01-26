$(document).ready(function() {
	
    $("#btn_recover_pass").click(function() {
        $('#recover_pass_form').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            //container: '#errores',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                pass_nueva: {
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
            	pass_nueva_conf: {
            		validators: {
            		    notEmpty: {
                            message: 'Introduce tu contraseña actual'
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
        })
    })
    $('#recover_pass_form').on('submit', function(e) {
        $('#mrecuperacion').modal('show')
        /*setTimeout(function () {
           window.location.href = "/"; //will redirect to your blog page (an ex: blog.html)
        }, 3000)*/
    })  
})