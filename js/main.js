// function instagramFeed(data) {
//     console.log(data);
// }

;
(function(global) {
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
    // if (document.querySelector('.scp-container')) {
    //     SCP({
    //         username: 'kjbrum',
    //         api_key: 'da3d6b59d72cbd535ce2405ec13b97be'
    //     });
    // }

    // Time to read
    var wordsToMinutes = function(text, imgs) {
        var words = text.split(' ').length;
        var minutes = Math.floor((words + (imgs * 5)) / 275) || '< 1';
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

    // Display the Instagram photos
    // if (document.querySelector('.instagram-photos')) {
    //     SocialDig({
    //         selector: '.instagram-photos',
    //         service: 'instagram',
    //         user: 'kjbrum',
    //         auth: '175436735.49954d7.8ed44a3a4d8c49dd97c4219656c04e29'
    //     }, function(data) {
    //         if (data.data.length > 0) {
    //             var list = document.createElement('div');
    //             list.className = 'g g-np g-xs-2 g-s-3 g-l-4 photos';

    //             // Loop through the photos
    //             data.data.forEach(function(el, idx, arr) {
    //                 if (idx < 12) {
    //                     var item = document.createElement('div');
    //                     item.className = 'gi photo';

    //                     var caption = '';
    //                     if (el.caption) {
    //                         caption = '<br>' + el.caption.text;
    //                     }

    //                     // Embed
    //                     // item.innerHTML = '<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="7" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style="background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style="background:url(' + el.images.standard_resolution.url + '); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style="margin:8px 0 0 0; padding:0 4px;"> <a href="' + el.link + '" style="color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">' + caption + '</a></p> <p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A photo posted by ' + el.user.full_name + ' (@' + el.user.username + ').</p></div></blockquote>';

    //                     // Custom
    //                     item.innerHTML = '<a href="' + el.link + '" target="_blank"><div class="img" style="background-image: url(' + el.images.standard_resolution.url + ')"><div class="likes"><div class="text"><i class="fa fa-heart"></i>' + el.likes.count + '</div></div></div></a>';

    //                     // Add the new item to the list
    //                     list.appendChild(item);
    //                 }
    //             });

    //             // Add the list to the page
    //             document.querySelector('.instagram-photos').appendChild(list);

    //             // Add the embed script
    //             var instaScript = document.createElement('script');
    //             instaScript.src = '//platform.instagram.com/en_US/embeds.js';
    //             instaScript.async = true;
    //             instaScript.defer = true;
    //             document.getElementsByTagName('body')[0].appendChild(instaScript);
    //         }
    //     });
    // }

    // Oh hello
    console.log("%cOh hello, I'm Kyle :D","background: #514F6F; color: #5AA8B3; line-height: 25px; padding: 5px 10px;")
})(window);
