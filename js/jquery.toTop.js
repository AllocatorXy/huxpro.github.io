$(function btnToTop() {
    'use strict';
    const oBtn = $('#btnToTop');
    oBtn.click(function() {
        $('html, body').animate({ scrollTop: 0 }, 200);
    });
    $(window).scroll(function() {
        const s = $(window).scrollTop();
        s >= 500 ? oBtn.show() :
                   oBtn.stop().fadeOut(200);
    });
});
