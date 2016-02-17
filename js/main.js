$(function(){
    var myMap,
        animate_time = 300,
        ww = $(window).width(),
        $wrap = $('.wrap'),
        $article = $('article'),
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

        $('#map').width( ww - wu - wrc );

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
            $('#map').css({top: 123});
        }
    });

})