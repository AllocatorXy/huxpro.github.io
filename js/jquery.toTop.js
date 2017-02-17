'use strict';
$(function btnToTop() {
    const oBtn = $('.btnToTop');
    $(window).scroll(function() {
        const s = $(window).scrollTop();
        s >= 500 ? oBtn.stop(true, true).fadeIn('fast') :
                   oBtn.stop().fadeOut('fast');
    });
    oBtn.click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    });
});
