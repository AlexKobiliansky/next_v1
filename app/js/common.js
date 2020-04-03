$(document).ready(function(){

    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $(".mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    var element = document.querySelector( '.main-mnu' );

    var droppy = new Droppy( element, {
        parentSelector: 'li',
        dropdownSelector: 'li > ul',
        triggerSelector: 'a'
    } );

    $('.droppy__parent').on("mouseenter", function(){
        $(this).children('.droppy__drop ').addClass('droppy__drop--active')
    });

    $('.droppy__parent').on("mouseleave", function(){
        $(this).children('.droppy__drop ').removeClass('droppy__drop--active')
    });

    var $introSlider = $('.intro-slider').owlCarousel({
        loop:true,
        nav: false,
        items: 1,
        margin: 15,
        dots: true,
        animateOut: 'fadeOut',
        // animateIn: 'fadeIn',
        mouseDrag: false,
        touchDrag: false,
        autoplay: true,
    });

    var $info = $('#intro-current');

    $introSlider.on('changed.owl.carousel', function (e) {
        var currentItem = e.item.index - 1;
        $info.text('0'+currentItem);
    });

    $('.gallery-slider').on('initialized.owl.carousel', function (e) {
        var firstSlide = $('.cases-slider .owl-item.active');

        var currentSlideIndex = e.item.index + 1;
        var lastSlideIndex = e.item.index + 6;
        var currentSlide = $(".gallery-slider .owl-item:nth-child("+currentSlideIndex+")");
        var lastSlide = $(".gallery-slider .owl-item:nth-child("+lastSlideIndex+")");
        currentSlide.addClass('explice');
        lastSlide.addClass('explice');
    });

    $('.gallery-slider').owlCarousel({
        loop:true,
        nav: true,
        margin: 15,
        dots: false,
        // autoplay: true,
        navText: ["", ""],
        responsive:{
            0:{
                items:1,
                autoHeight: true,
            },
            480: {
                items: 2,
                autoHeight: false
            },
            768: {
                items: 3,
                margin: 20
            },
            992: {
                items: 3,
                margin: 20
            },
            1200: {
                items: 6,
                margin: 30
            }
        }
    });

    $('.gallery-slider').on('changed.owl.carousel', function (e) {
        $('.gallery-slider .owl-item').removeClass('explice');
        var currentSlideIndex = e.item.index + 1;
        var lastSlideIndex = e.item.index + 6;
        var currentSlide = $(".gallery-slider .owl-item:nth-child("+currentSlideIndex+")");
        var lastSlide = $(".gallery-slider .owl-item:nth-child("+lastSlideIndex+")");

        currentSlide.addClass('explice');
        lastSlide.addClass('explice');
    });

    $('.gal-slide').photoswipe({
        showAnimationDuration: 0,
        hideAnimationDuration: 0
    });

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });


    function heightses() {
        if ($(window).width()>480) {
            $('.adv-item-title').height('auto').equalHeights();
            $('.price-item-title').height('auto').equalHeights();
            $('.price-item-desc').height('auto').equalHeights();
            $('.price-item-price').height('auto').equalHeights();
            $('.price-item-include').height('auto').equalHeights();
            $('.gal-slide-title').height('auto').equalHeights();
            $('.gal-slide-desc').height('auto').equalHeights();
        }

        $('.pop-item-title').height('auto').equalHeights();
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    $('.preloader').fadeOut();








    /** START FORMS */
    var uPhone = $('.user-phone');
    uPhone.mask("8 999 999 99 99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(2,2);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });


    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
    /** END FORMS */



    /** START MAPS */
    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),

                myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [26, 42],
                });

            map.geoObjects.add(myPlacemark);

            var position = map.getGlobalPixelCenter();

            if (mapId.hasClass('has-block')) {

                if ($(window).width() >= 992) {
                    map.setGlobalPixelCenter([ position[0] - 250, position[1]]);
                }

                if ($(window).width() >= 1200) {
                    map.setGlobalPixelCenter([ position[0] - 300, position[1]]);
                }

                if ($(window).width() >= 1400) {
                    map.setGlobalPixelCenter([ position[0] - 350, position[1]]);
                }

            }



        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }
    /** END MAPS */
});
