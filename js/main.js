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




    /******************************************************
     * Get Dribbble shots for a specific user
     ******************************************************/
    var getDribbleShots = function(user, token, callback) {
        // Set the request URL
        var dribbble_api_url = 'https://api.dribbble.com/v1/users/' + user + '/shots';

        // Make a request to the API
        var request = new XMLHttpRequest();
        request.open('GET', dribbble_api_url, true);
        request.setRequestHeader('Authorization', 'Bearer ' + token);

        // Check for a successful response
        request.onload = function() {
            // Parse the response
            var data = JSON.parse(request.responseText);

            // Check the status of the request
            if (request.status >= 200 && request.status < 400) {
                // Return the found data
                callback(data);
            } else {
                // Error from the server
                throw data.message;
            }
        };

        // Handle any errors
        request.onerror = function() {
            // Connection error
            throw 'connection error';
        };

        // Send the request
        request.send();
    }

    if(document.querySelector('.dribbble-shots')) {
        getDribbleShots('kjbrum', '305b1f7fb8e23dd9375061f6fa5e26263fdfc0ecbfb50f30379b01f98829f259', function(shots) {
            if (shots.length > 0) {
                var list = document.createElement('div');
                list.className = 'g g-np g-xs-2 g-m-3 shots';

                // Loop through the shots
                shots.forEach(function(el, idx, arr) {
                    var item = document.createElement('div');
                    item.className = 'gi shot';

                    var shot_html = '<a href="' + el.html_url + '" target="_blank"><img src="' + el.images.normal + '"></a>';
                    item.innerHTML = shot_html;

                    // Add the new item to the list
                    list.appendChild(item);
                });

                // Add the list to the page
                document.querySelector('.dribbble-shots').appendChild(list);
            }
        });
    }
})(window);
