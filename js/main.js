/*ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 9
        });
    myMap.behaviors.disable("scrollZoom");
});*/

$(function(){
    var ww = $(window).width(),
        $c = $('body').find('.container'),
        $mrc = $('body').find('.main-right-column'),
        fixed_width = 1599,
        gap = 28;

    setMapWidth(ww);
    setHrWidth(ww);

    $( window ).resize(function() {
        setMapWidth( $(window).width() );
        setHrWidth( $(window).width() );
    });

    function setMapWidth(ww) {
        var wc = $c.width(),
            wrc = $mrc.width(),
            wu = (ww-wc)/2;

        if (ww > fixed_width) {
            $('#map').width( ww-wrc-wu-gap);
        } else {
            $('#map').width( ww-wrc-45-gap );
        }
    }
    
    function setHrWidth(ww){

        var wc = $c.outerWidth(),
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

    $('.navbar-main').affix({
        offset: 30
    });
})