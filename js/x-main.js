$(function() {

  $(".animsition").animsition({
    inClass               :   'fade-in',
    outClass              :   'fade-out',
    inDuration            :    500,
    outDuration           :    250,
    // linkElement           :   '.animsition-link', 
    linkElement           :   'a:not([target="_blank"]):not([href^=#])',
    // touchSupport          :    true, 
    loading               :    true,
    loadingParentElement  :   'html', //animsition wrapper element
    loadingClass          :   'animsition-loading',
    // unSupportCss          : [ 'animation-duration',
    //                           '-webkit-animation-duration',
    //                           '-o-animation-duration'
    //                         ]
    //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser. 
    //The default setting is to disable the "animsition" in a browser that does not support "animation-duration". 
  });

	$('body').on('click', '.nav--menu--trigger', function(e) {
		$(this).add('.nav--menu, html, body').toggleClass('open');
		e.preventDefault();
	});

	$(document).keyup(function(e) {
		if(e.keyCode == 27) {
			$('.nav--menu--trigger').removeClass('open');
			$('.nav--menu').removeClass('open');
		}
	});

	sizeProject();
	$(window).resize(function(e) {
		sizeProject();
	});

	$(window).scroll(function(e) {
		if($(window).scrollTop() + $(window).height() < $(document).height()) {
			if($(window).scrollTop() > 0) {
				$('.site--header, #masthead, .nav--menu, .contents').addClass('scrolled');
				$('.site--nav span').fadeOut(300);
			} else {
				$('.site--header, #masthead, .nav--menu, .contents').removeClass('scrolled');
				$('.site--nav span').fadeIn(300);
			}
		}
	});
});

function sizeProject() {
	var width = $('.project--single').width();
	$('.project--single').css('height', width-(width/4));
}