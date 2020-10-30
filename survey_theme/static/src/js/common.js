$(document).ready(function () {
    $('#menuMain li:has(ul)').addClass("has-sub");
    var mobiMenu = $("#menuMain").clone().attr("id", "mobileMenu");
    $('div#menuMobile').append(mobiMenu);
    $('div#menuMobile ul').removeAttr("class");
    $('div#menuMobile ul li').removeAttr("class");
    $("#menuMobile").mmenu();
    //accordion
    $('.collapse').on('shown.bs.collapse', function () {
        // do something...
        $(this).prev().addClass('active');
    });
    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });
});

var num = $("#header").height();

// $(window).on('load', function () {
//     var sync1 = $("#sync1");
//     var sync2 = $("#sync2");
//     let flag = false;
//     let duration = 300;
//     sync1.owlCarousel({
//         items: 1,
//         nav: true,
//         loop: true,
//         autoplay: true,
//         autoplayHoverPause: true
//     }).on("changed.owl.carousel", function (e) {
//         if (!flag) {
//             flag = true;
//             sync2.find(".owl-item")
//                     .removeClass("current")
//                     .eq(e.item.index)
//                     .addClass("current");
//             if (
//                     sync2.find(".owl-item")
//                     .eq(e.item.index)
//                     .hasClass("active")
//                     ) {
//             } else {
//                 sync2.trigger("to.owl.carousel", [e.item.index, duration, true]);
//             }
//             flag = false;
//         }
//     }).on('refresh.owl.carousel', function () {
//         setTimeout(function () {
//             $(".slider-sync2").css("height", $(".slider-sync1").height());
//         }, 300);
//     });
//     sync2.on("initialized.owl.carousel", function () {
//         sync2.find(".owl-item").eq(0).addClass("current");
//     }).owlCarousel({
//         items: 1,
//         nav: true,
//         loop: true,
//         autoplay: true,
//         autoplayHoverPause: true
//     }).on("changed.owl.carousel", function (e) {
//         e.preventDefault();
// //        var number = $(this).index();
//         sync1.trigger("to.owl.carousel", [e.item.index, duration, true]);
//     }).on("click", ".owl-item", function (e) {
//         e.preventDefault();
//         var number = $(this).index();
//         sync1.trigger("to.owl.carousel", [number, duration, true]);
//     });
//     $(".slider-sync2").css("height", $(".slider-sync1").height());
// });
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > num) {
        $('#navigation').addClass('fixed fadeInDown animated');
    } else {
        $('#navigation').removeClass('fixed fadeInDown animated');
    }
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 100)
        $('#goTop').fadeIn();
    else
        $('#goTop').fadeOut();
});
$('#goTop').click(function () {
    $('body,html').animate({scrollTop: 0}, 'slow');
});