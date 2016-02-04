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
        });
    });

    //error abrir sun hacer submit
    //https://sense-rover-nohtrim.c9users.io/recoverPassword/ii3vdu5qn5bg7q20qaosdn4z3l7f1spp/irecaldema14dw@ikzubirimanteo.com
    //https://stackoverflow.com/questions/25265667/maximum-call-stack-size-exceeded-when-changing-a-class-bootstrap-jquery
    //https://stackoverflow.com/questions/6095530/maximum-call-stack-size-exceeded-error
    //https://formvalidation.io/getting-started/#writing-form
    $('#recover_pass_form').on('submit', function(e) {
        $('#mrecuperacion').modal('show');
        /*setTimeout(function () {
           window.location.href = "/"; //will redirect to your blog page (an ex: blog.html)
        }, 3000)*/
    });
})