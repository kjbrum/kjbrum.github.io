;(function(global) {
    /**
     *  Social sharing popup window
     */
    var jsSocialShares = document.querySelectorAll('.js-social-share');
    if (jsSocialShares) {
        [].forEach.call(jsSocialShares, function(anchor) {
            anchor.addEventListener('click', function(e) {

                var url = this.href,
                    width = 500,
                    height = 300,
                    left = (screen.width / 2) - (width / 2),
                    top = (screen.height / 2) - (height / 2);

                if (/^(f|ht)tps?:\/\//i.test(url) || /^mailto/i.test(url)) {
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

    // spotifyCurrentlyPlaying.js
    if (document.querySelector('.scp-container')) {
        SCP({
            username: 'kjbrum',
            api_key: 'da3d6b59d72cbd535ce2405ec13b97be'
        });
    }

    // Time to read
    var wordsToMinutes = function(text, imgs) {
        var words = text.split(' ').length;
        var minutes = Math.floor((words + (imgs * 12)) / 275) || '< 1';
        return minutes;
    }

    var $postContent = document.querySelector('.post-content');
    if ($postContent) {
        var numImgs = $postContent.getElementsByTagName('img').length;
        var content = $postContent.outerText.replace(/\r?\n/g, '');
        document.querySelector('.read-time').innerText = wordsToMinutes(content, numImgs) + ' min read';
    }

    // ScrollReveal.js
    // window.sr = ScrollReveal({ distance: '2rem', scale: 0.8, viewFactor: 0.8 });
    // sr.reveal('.posts li');
    // sr.reveal('.projects .page-content *');
})(window);
