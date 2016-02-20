$(function(){
    var myMap,
        animate_time = 300,
        ww = $(window).width(),
        $wrap = $('.wrap'),
        $article = $('article'),
        min_width = 1000,
        min_width_real = 1000-90,
        fixed_width = 1534,
        gap = 28;

    /* Yandex Maps Init */
    if ( $('#map').length && window.location.href.search('localhost') == -1 ) {
        ymaps.ready(function () {
            myMap = new ymaps.Map('map', {
                center: [55.751574, 37.573856],
                zoom: 9
            });
            myMap.behaviors.disable("scrollZoom");
            $( window ).scroll(function() {
                myMap.container.fitToViewport();
            })
        });
    }

    if ( $('#map_profile').length ) {
        ymaps.ready(function () {
            myMap = new ymaps.Map('map_profile', {
                center: [55.751574, 37.573856],
                zoom: 9
            });
            myMap.behaviors.disable("scrollZoom");
        });
    }

    setMapWidth(ww);
    //setHrWidth(ww);

    $( window ).resize(function() {
        setMapWidth( $(window).width() );
        //setHrWidth( $(window).width() );
    });

    function setMapWidth(ww) {
        var wc = $wrap.width(),
            wrc = $article.width(),
            wu = (ww-wc)/2;

        if ( ww > min_width - 1 ){
            $('#map').width( ww - wu - wrc );
        } else {
            // $('#map').width( 300 );
            $('#map').width( 400 );
        }

        /*if (ww > fixed_width) {
            $('#map').width( ww-wrc-wu-gap);
        } else {
            $('#map').width( ww-wrc-45-gap );
        }*/
    }
    
    function setHrWidth(ww){

        var wc = $wrap.outerWidth(),
            wu = (ww-wc)/2;

        if (ww > fixed_width) {
            $('.full-width').css({
                'margin-left': -wu+'px',
                'margin-right': -wu+'px'
            });
        } else {
            $('.full-width').css({
                'margin-left': -17+'px',
                'margin-right': -17+'px'
            });
        }
    }

    $('.navbar-filter').affix({
        offset: 60
    }).on('affix.bs.affix', function(){
        $('.main-content').css({'padding-top': 122});
    }).on('affix-top.bs.affix', function(){
        $('.main-content').css({'padding-top': 0});
    });

    $( window ).scroll(function() {

        /* Resize MAP */
        var st = $(window).scrollTop();

        var st = $(window).scrollTop();// console.log(st);
        if ( st < 63 ) {
            $('#map').css({top: 182-st});
        } else {
            $('#map').css({top: 122});
        }
    });


    // add/remove class for tab-pane container (for add padding)
    $('a[class^="review_"], a[class*="review_"]').on('shown.bs.tab', function (e) {
        // e.target // newly activated tab
        // e.relatedTarget // previous active tab
        var id = $(e.target).attr('href');

        $(id).closest('.tab-review-content').removeClass('tab-review-content-closed');

    }).on('hidden.bs.tab', function (e) {
        var id = $(e.target).attr('href'),
            tab_review_content = $(id).closest('.tab-review-content');

        if ( tab_review_content.children('.tab-pane.active').length == 0 ) {
            tab_review_content.addClass('tab-review-content-closed');
        }
    });

    $('.form-search input').on('blur keyup',function(){
        if($(this).val() == '') {
            $(this).addClass('empty');
            $(this).removeClass('not-empty');
        } else {
            $(this).addClass('not-empty');
            $(this).removeClass('empty');
        }
    });
})