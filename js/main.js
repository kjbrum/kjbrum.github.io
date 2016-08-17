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
    // var getDribbleShots = function(user, token, callback) {
    //     // Set the request URL
    //     var dribbble_api_url = 'https://api.dribbble.com/v1/users/' + user + '/shots';

    //     // Make a request to the API
    //     var request = new XMLHttpRequest();
    //     request.open('GET', dribbble_api_url, true);
    //     request.setRequestHeader('Authorization', 'Bearer ' + token);

    //     // Check for a successful response
    //     request.onload = function() {
    //         // Parse the response
    //         var data = JSON.parse(request.responseText);

    //         // Check the status of the request
    //         if (request.status >= 200 && request.status < 400) {
    //             // Return the found data
    //             callback(data);
    //         } else {
    //             // Error from the server
    //             throw data.message;
    //         }
    //     };

    //     // Handle any errors
    //     request.onerror = function() {
    //         // Connection error
    //         throw 'connection error';
    //     };

    //     // Send the request
    //     request.send();
    // }

    var requestData = function(options, callback) {
        // Set the request URL
        var apiURL;
        switch (options.service) {
            case '500px':
                apiURL = 'https://api.500px.com/v1/photos?consumer_key=' + options.auth + '&feature=user&username=' + options.username + '&image_size=440';
                break;
            case 'dribbble':
                apiURL = 'https://api.dribbble.com/v1/users/' + options.username + '/shots';
                break;
        }

        // Make the API request
        var request = new XMLHttpRequest();
        request.open('GET', apiURL, true);

        // Enable additional headers
        if (options.service == 'dribbble') {
            request.setRequestHeader('Authorization', 'Bearer ' + options.auth);
        }

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

    // Display the Dribbble shots
    if (document.querySelector('.dribbble-shots')) {
        requestData({
            service: 'dribbble',
            username: 'kjbrum',
            auth: '305b1f7fb8e23dd9375061f6fa5e26263fdfc0ecbfb50f30379b01f98829f259'
        }, function(data) {
            if (data.length > 0) {
                var list = document.createElement('div');
                list.className = 'g g-s-2 shots';

                // Loop through the shots
                data.forEach(function(el, idx, arr) {
                    if (idx < 4) {
                        var item = document.createElement('div');
                        item.className = 'gi shot';

                        var shotHTML = '<a href="' + el.html_url + '" target="_blank"><img src="' + el.images.normal + '"></a>';
                        item.innerHTML = shotHTML;

                        // Add the new item to the list
                        list.appendChild(item);
                    }
                });

                // Add the list to the page
                document.querySelector('.dribbble-shots').appendChild(list);
            }
        });
    }

    // Display the 500px shots
    if (document.querySelector('.fivehundred-photos')) {
        requestData({
            service: '500px',
            username: 'kjbrum',
            auth: 'VoO5pDr8HxVQtrDVeQXKqF6Kzx0PJdlvy0mjNEGt'
        }, function(data) {
            if (data.photos.length > 0) {
                var list = document.createElement('div');
                list.className = 'g g-s-2 photos';

                // Loop through the photos
                data.photos.forEach(function(el, idx, arr) {
                    if (idx < 4) {
                        var item = document.createElement('div');
                        item.className = 'gi photo';

                        var photoHTML = '<a href="http://500px.com' + el.url + '" target="_blank"><img src="' + el.image_url + '"></a>';
                        item.innerHTML = photoHTML;

                        // Add the new item to the list
                        list.appendChild(item);
                    }
                });

                // Add the list to the page
                document.querySelector('.fivehundred-photos').appendChild(list);
            }
        });
    }
})(window);
