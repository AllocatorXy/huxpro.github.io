// 'use strict';
// function btnToTop() {
//     const oBtn = $('#btnToTop');
//     $(window).scroll(function() {
//         const s = $(window).scrollTop();
//         s >= 700 ? oBtn.show() :
//                    oBtn.stop().fadeOut('fast');
//     });
//     oBtn.click(function() {
//         $('html, body').animate({ scrollTop: 0 }, 'fast');
//     });
// }

'use strict';
function btnToTop() {
    const oBtn = $('#btnToTop');
    $(window).scroll(function() {
        const s = $(window).scrollTop();
        s >= 500 ? oBtn.show() :
                   oBtn.stop().fadeOut('fast');
    });
    // if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        oBtn.on('touchstart', function(event) {
            $('html, body').stop().animate({ scrollTop: 0 }, 'fast');
            oBtn.css('transform', 'scale(1.2, 1.2)');
        });
        oBtn.on('touchend', function(event) {
            oBtn.css('transform', 'scale(1.0, 1.0)');
        });
    // } else {
    //     oBtn.click(function() {
    //         $('html, body').animate({ scrollTop: 0 }, 'fast');
    //     });
    // }
}
$(document).ready(function() {
    btnToTop();
});

