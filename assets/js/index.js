/**
 * Main JS file
 */

/* globals jQuery, document */
(function ($, undefined) {
    'use strict';

    $(document).ready(function () {
        $('.menu-button, .nav-cover, .nav-close').on('click', function(e){
            e.preventDefault();
            $('body').toggleClass('nav-opened nav-closed');
        });

        if($('.js-current-track').length) {
            $('.js-current-track').spotify({
                width: '100%',
                height: 380,
                username: 'kjbrum',
                api_key: 'da3d6b59d72cbd535ce2405ec13b97be'
            });
        }

        var $postContent = $('.post-content');

        if($postContent.length) {
            $postContent.fitVids();
        }
    });

    var jsSocialShares = document.querySelectorAll('.js-social-share');
    if(jsSocialShares) {
        [].forEach.call(jsSocialShares, function(anchor) {
            anchor.addEventListener('click', function(e) {

                var url = this.href,
                    width = 500,
                    height = 300,
                    left = (screen.width / 2) - (width / 2),
                    top = (screen.height / 2) - (height / 2);

                if(/^(f|ht)tps?:\/\//i.test(url) || /^mailto/i.test(url)) {
                    e.preventDefault();
                    window.open(
                        url,
                        '',
                        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left
                    );
                }

            });
        });
    }

})(jQuery);
