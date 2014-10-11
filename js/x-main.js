$(function() {

	// Set up ScrollReveal.js
	// The starting defaults.
	var config = {
		after: '0s',
		enter: 'bottom',
		move: '100%',
		over: '0.75s',
		easing: 'ease-in-out',
		viewportFactor: 0.5,
		opacity: 100,
		reset: true,
		init: true
	};
	window.sr = new scrollReveal( config );

	$('body').on('click', '.nav-menu-trigger', function(e) {
		$(this).add('.nav-menu, html, body').toggleClass('open');
		e.preventDefault();
	});

	$(document).keyup(function(e) {
		if(e.keyCode == 27) {
			$('.nav-menu-trigger').removeClass('open');
			$('.nav-menu').removeClass('open');
		}
	});

});