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
		$(this).add('.nav-menu, html, body').toggleClass('open');
		e.preventDefault();
	});
	$(document).keyup(function(e) {
		if(e.keyCode == 27) {
			$('.nav-menu-trigger').removeClass('open');
			$('.nav-menu').removeClass('open');
		}
	});

	$(window).scroll(function(e) {
		if($(window).scrollTop() + $(window).height() < $(document).height()) {
			if($(window).scrollTop() > 0) {
				$('.site-header, #masthead, .nav-menu, .contents').addClass('scrolled');
				$('.site-nav span').fadeOut(300);
			} else {
				$('.site-header, #masthead, .nav-menu, .contents').removeClass('scrolled');
				$('.site-nav span').fadeIn(300);
			}
		}
	});
});