/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);
    var current_track = {
        url: '',
        image: '',
        title: '',
        artist: '',
        album: ''
    };

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        // $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        if($('.js-current-track').length) {
            queryLastFM();
        }
    });

    var queryLastFM = function() {
        $.ajax({
            type: 'GET',
            url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=kjbrum&api_key=da3d6b59d72cbd535ce2405ec13b97be&limit=1&format=json',
            dataType: 'json',
            error: function() {
                console.log('Error getting track from LastFM.');
            },
            success: function(data) {
                var single_track;

                if(data.recenttracks.track[0]) {
                    single_track = data.recenttracks.track[0];
                } else {
                    single_track = data.recenttracks.track;
                }

                current_track.image = single_track.image[2]['#text'];
                current_track.title = single_track.name;
                current_track.artist = single_track.artist['#text'];
                current_track.album = single_track.album['#text'];

                window.current_track = current_track;

                searchSpotify(current_track);
            }
        });

    }

    // Get track information from Spotify
    var searchSpotify = function(current_track) {
        var searchQuery = '';

        $.each( current_track, function( key, value ) {
            if(value) {
                if(key != 'image') {
                    searchQuery += key+':'+value+' ';
                }
            }
        });

        $.ajax({
            type: 'GET',
            url: 'https://api.spotify.com/v1/search?query='+encodeURIComponent(searchQuery)+'&offset=0&limit=1&type=track',
            dataType: 'json',
            error: function() {
                console.log('Error getting track information from Spotify.');
            },
            success: function(data) {
                if(data.tracks.items[0]) {
                    var item = data.tracks.items[0];

                    // current_track.url = item.external_urls.spotify;
                    // current_track.title = item.name;
                    // current_track.album = item.album.name;
                    // current_track.image = item.album.images[1].url;

                    // current_track.artist = '';
                    // $.each( item.artists, function( key, value ) {
                    //     current_track.artist += value.name;
                    //     if(key != (item.artists.length - 1)) {
                    //         current_track.artist += ', ';
                    //     }
                    // });

                    $('.js-current-track .track-details').append('<p>&nbsp;</p><h5>Currently Playing:</h5><iframe src="https://embed.spotify.com/?uri='+encodeURIComponent(item.uri)+'" width="100%" height="380" frameborder="0" allowtransparency="true"></iframe>');

                    // Get the image from Spotify
                    // $.each( current_track, function( key, value ) {
                    //     if(value) {
                    //         if(key == 'url') {
                    //             $('.js-current-track .track-details').wrap('<a href="'+value+'" target="_blank"></a>');
                    //         } else if(key == 'image') {
                    //             $('.js-current-track .track-details').append('<p class="image"><img src="'+value+'"></p>');
                    //         } else {
                    //             $('.js-current-track .track-details').append('<p class="'+key+'">'+value+'</p>');
                    //         }
                    //     }
                    // });
                } else {
                    console.log('No matching tracks were found on Spotify.');
                }
            }
        });
    }

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
