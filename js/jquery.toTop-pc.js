'use strict';
function btnToTop() {
    $(window).scroll(function() {
        const s = $(window).scrollTop();
        s >= 700 ? $('.btnToTop').stop(true, true).fadeIn('fast') :
                   $('.btnToTop').stop().fadeOut('fast');
    });
    $('.btnToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    });
}
