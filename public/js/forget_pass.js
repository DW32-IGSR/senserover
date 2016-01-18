$(document).ready(function() {
    $('#forget_pass').click(function() {
      $('.modal-wrapper-forget-pass').fadeIn();
      $('.modal-wrapper').fadeOut();
    });
    
    $('.cerrar-link').click(function() {
      $('.modal-wrapper-forget-pass').fadeOut();
    });
});