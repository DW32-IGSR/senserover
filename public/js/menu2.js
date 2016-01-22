$(document).ready(function(){
	$('.hamburgerMenu').click(function(){
		$(this).toggleClass('open');
		$('.menu').toggleClass('open');
	});
});