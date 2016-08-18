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



    var $jsonp = (function(){
      var that = {};

      that.send = function(src, options) {
        var callback_name = options.callbackName || 'callback',
          on_success = options.onSuccess || function(){},
          on_timeout = options.onTimeout || function(){},
          timeout = options.timeout || 10; // sec

        var timeout_trigger = window.setTimeout(function(){
          window[callback_name] = function(){};
          on_timeout();
        }, timeout * 1000);

        window[callback_name] = function(data){
          window.clearTimeout(timeout_trigger);
          on_success(data);
        }

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = src;

        document.getElementsByTagName('head')[0].appendChild(script);
      }

      return that;
    })();

    /******************************************************
     * Request API data from a specific service.
     ******************************************************/
    var serviceSnatcher = function(options, callback) {
        // Set the request URL
        var apiURL;
        switch (options.service) {
            case '500px':
                apiURL = 'https://api.500px.com/v1/photos?consumer_key=' + options.auth + '&feature=user&username=' + options.username + '&image_size=440';
                break;
            case 'codepen':
                apiURL = 'http://cpv2api.com/pens/public/' + options.username;
                break;
            case 'dribbble':
                apiURL = 'https://api.dribbble.com/v1/users/' + options.username + '/shots';
                break;
            case 'instagram':
                apiURL = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + options.auth;
                break;
        }

        // if (options.service == 'instagram') {
        //     var json = {"pagination": {}, "meta": {"code": 200}, "data": [{"attribution": null, "tags": [], "type": "image", "location": null, "comments": {"count": 1}, "filter": "Valencia", "created_time": "1343840675", "link": "https://www.instagram.com/p/Nyw6gDGyOc/", "likes": {"count": 33}, "images": {"low_resolution": {"url": "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e15/11138007_809306342479571_280607309_n.jpg?ig_cache_key=MjQ4NDc2MDU1ODMyODMwODc2.2", "width": 320, "height": 320}, "thumbnail": {"url": "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e15/11138007_809306342479571_280607309_n.jpg?ig_cache_key=MjQ4NDc2MDU1ODMyODMwODc2.2", "width": 150, "height": 150}, "standard_resolution": {"url": "https://scontent.cdninstagram.com/t51.2885-15/e15/11138007_809306342479571_280607309_n.jpg?ig_cache_key=MjQ4NDc2MDU1ODMyODMwODc2.2", "width": 612, "height": 612}}, "users_in_photo": [], "caption": null, "user_has_liked": false, "id": "248476055832830876_175436735", "user": {"username": "kjbrum", "profile_picture": "https://scontent.cdninstagram.com/t51.2885-19/10955285_461956607290789_899418425_a.jpg", "id": "175436735", "full_name": "Kyle Brumm"}}, {"attribution": null, "tags": [], "type": "image", "location": null, "comments": {"count": 1}, "filter": "Earlybird", "created_time": "1341799755", "link": "https://www.instagram.com/p/M18Kw4GyCV/", "likes": {"count": 12}, "images": {"low_resolution": {"url": "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e15/11176326_1579334695649134_1451422840_n.jpg?ig_cache_key=MjMxMzU1NTc4MzQ1NzkxNjM3.2", "width": 320, "height": 320}, "thumbnail": {"url": "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e15/11176326_1579334695649134_1451422840_n.jpg?ig_cache_key=MjMxMzU1NTc4MzQ1NzkxNjM3.2", "width": 150, "height": 150}, "standard_resolution": {"url": "https://scontent.cdninstagram.com/t51.2885-15/e15/11176326_1579334695649134_1451422840_n.jpg?ig_cache_key=MjMxMzU1NTc4MzQ1NzkxNjM3.2", "width": 612, "height": 612}}, "users_in_photo": [], "caption": null, "user_has_liked": true, "id": "231355578345791637_175436735", "user": {"username": "kjbrum", "profile_picture": "https://scontent.cdninstagram.com/t51.2885-19/10955285_461956607290789_899418425_a.jpg", "id": "175436735", "full_name": "Kyle Brumm"}}, {"attribution": null, "tags": [], "type": "image", "location": null, "comments": {"count": 0}, "filter": "Brannan", "created_time": "1338244328", "link": "https://www.instagram.com/p/LL-unJmyBR/", "likes": {"count": 5}, "images": {"low_resolution": {"url": "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e15/11085073_1434755403501907_586573615_n.jpg?ig_cache_key=MjAxNTMwNDkwMzY0ODI5Nzc3.2", "width": 320, "height": 320}, "thumbnail": {"url": "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e15/11085073_1434755403501907_586573615_n.jpg?ig_cache_key=MjAxNTMwNDkwMzY0ODI5Nzc3.2", "width": 150, "height": 150}, "standard_resolution": {"url": "https://scontent.cdninstagram.com/t51.2885-15/e15/11085073_1434755403501907_586573615_n.jpg?ig_cache_key=MjAxNTMwNDkwMzY0ODI5Nzc3.2", "width": 612, "height": 612}}, "users_in_photo": [], "caption": {"created_time": "1338244328", "text": "Immaculate", "from": {"username": "kjbrum", "profile_picture": "https://scontent.cdninstagram.com/t51.2885-19/10955285_461956607290789_899418425_a.jpg", "id": "175436735", "full_name": "Kyle Brumm"}, "id": "17852001799012736"}, "user_has_liked": false, "id": "201530490364829777_175436735", "user": {"username": "kjbrum", "profile_picture": "https://scontent.cdninstagram.com/t51.2885-19/10955285_461956607290789_899418425_a.jpg", "id": "175436735", "full_name": "Kyle Brumm"}}]}
        //     callback(json);
        // }

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
        serviceSnatcher({
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

    // Display the 500px photos
    if (document.querySelector('.fivehundred-photos')) {
        serviceSnatcher({
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

    // Display the CodePen posts
    serviceSnatcher({
        service: 'instagram',
        username: 'kjbrum',
        auth: '175436735.49954d7.8ed44a3a4d8c49dd97c4219656c04e29'
    }, function(data) {
        console.log(data);
    });
})(window);
