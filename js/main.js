$(function() {
	// $('body').fadeIn(400);
	// $("body").on("click", "a[href^='/']", function(e) {
	// 	var url = $(this).attr('href');
	// 	$('body').fadeOut(400, function() {
	// 		window.location.href = url;
	// 	});
	// 	e.preventDefault();
	// });

	$('body').on('click', '.nav-menu-trigger', function(e) {
		$(this).toggleClass('open');
		$('.nav-menu').toggleClass('visible');
		e.preventDefault();
	});
});