$(document).ready(function(){
	$('.w-nav-button hamburger-button').click(function(){
		$(this).toggleClass('open');
		$('.menu').toggleClass('open');
	});
});