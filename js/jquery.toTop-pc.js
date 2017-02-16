'use strict';
function btnToTop() {
    $(window).scroll(function() {
        const s = $(window).scrollTop();
        s >= 700 ? $('.btnToTop').show() :
                   $('.btnToTop').stop().fadeOut('fast');
    });
    $('.btnToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    });
}
