ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 9
        });
    myMap.behaviors.disable("scrollZoom");
});

$(function(){
    var ww = $(window).width();

    if (ww>1440) {
        setMapWidth(ww);
    }

    $( window ).resize(function() {
        setMapWidth( $(window).width() );
    });

    function setMapWidth(ww) {
        if (ww > 1440) {
            var wc = $('body').find('.container').outerWidth(),
                wrc = $('body').find('.main-right-column').outerWidth(),
                wu = (ww-wc)/2;

            $('#map').width( ww-wrc-wu );
        } else {
            $('#map').css('width','33.33333333%');
        }
    }

    $('.navbar-main').affix({
        offset: 30
    });
})