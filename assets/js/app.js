$(function() {

    /* Nav Toggle on mobile
    ================================ */

    let navToggle = $('#navToggle');
    let nav = $('#nav');

    navToggle.on('click', function(event) {

        event.preventDefault();

        $("body").toggleClass('show-nav-dark');
        $(this).toggleClass('active');
        nav.toggleClass('show');

    });

    $(window).on("resize", function() {
        $("body").removeClass('show-nav-dark');
        navToggle.removeClass('active');
        nav.removeClass('show');
    });

    let intro = $("#intro");
    let header = $("#header");
    let introH = intro.innerHeight();
    let headerH = header.innerHeight();
    let scrollTop = $(window).scrollTop();

    /* Header class on scroll
    ================================ */
    
    headerScroll();
    
    $(window).on("scroll resize", function() {
        headerScroll();
    });

    function headerScroll() {

        introH = intro.innerHeight();
        headerH = header.innerHeight();

        let scrollTop = $(this).scrollTop();
        
        if ( scrollTop >= (introH - headerH) ) {
            header.addClass("header--dark");
        } else {
            header.removeClass("header--dark");
        }

    }

    /* Smooth Scrool to sections
    ================================ */

    $("[data-scroll]").on("click", function(event) {
        
        event.preventDefault();

        let scrollEl = $(this).data("scroll");
        let scrollElPos = $(scrollEl).offset().top;

        $("body").removeClass('show-nav-dark');
        navToggle.removeClass('active');
        nav.removeClass('show');

        $("html, body").animate({
            scrollTop: scrollElPos - headerH
        }, 500);

    });

    /* ScrollSpy
    ================================ */

    let windowH = $(window).height();
    scrollSpy(scrollTop);

    $(window).on("scroll", function() {
        scrollTop = $(this).scrollTop();
        scrollSpy(scrollTop);
    });

    function scrollSpy() {

        $("[data-scrollspy]").each(function() {

            let $this = $(this);
            let sectionId = $this.data('scrollspy');
            let sectionOffset = $this.offset().top;
            sectionOffset = sectionOffset - (windowH * 0.3);

            if (scrollTop >= sectionOffset) {
                $('#nav [data-scroll]').removeClass('active');
                $('#nav [data-scroll="' + sectionId + '"]').addClass('active');
            }

            if ( scrollTop <= (introH - (windowH * 0.3)) ) {
                $('#nav [data-scroll]').removeClass('active');
            }

        });

    }

    /* Modal
    ================================ */

    $('[data-modal]').on('click', function(event) { /* При клике на элемент с атрибутом "data-modal", вызывается модальное окно */
        
        event.preventDefault(); /* Убираем стандарное поведение элемента при этом событии (клике) - для ссылки переадресация */
        let modal = $(this).data('modal'); /* Получаем id модального окна - делаем переменную "modal" и сохраняем то, что получаем из атрибута '[data-modal]', по которому нажали */

        $('body').addClass('no-scroll'); /* Убираем скролл у 'body' */
        $(modal).addClass('show'); /* Показываем модальное окно, которое сохранили в переменную - делаем выборку по id и добавлем класс 'show' */

        setTimeout(function() { /* Функция задержки перед действием */
            $(modal).find('.modal__content').css({ /* Для плавной анимации - ищет в css '.modal__content' и меняет ему css-свойства  */
                transform: 'scale(1)', /* Увеличение окна до 100% размера */
                opacity: '1' /* Непрозрачность 100% */
            });
        }, 100); /* Время задержки - 0.1s */

        $("body").removeClass('show-nav-dark');
        navToggle.removeClass('active');
        nav.removeClass('show');
        
    });

    $('[data-modal-close]').on('click', function(event) { /* Если нажимаем на элемент с атриботом '[data-modal-close]' то.. */
        event.preventDefault(); /* Убираем стандарное поведение элемента при этом событии (клике) - для ссылки переадресация */
        let modal = $(this).parents('.modal'); /* ..закрыть родительский элемент с классом '.modal' - делаем переменную "modal" и получаем доступ к "родителю" ЭТОЙ кнопки */
        modalClose(modal); /* Выполнение действий, обединенных в функцию "modalClose(modal)" */
    });

    $('[close-becomeClientModal]').on('click', function(event) { /* Костыль для закрытия модального окна id="becomeClientModal" - часть 1 */
        event.preventDefault();
        let modalBC = $(this).parents('.modal');
        closeBCModal(modalBC);
    });


    $('.modal').on('click', function() { /* Если мы нажиаем на само модальное окно (фон-маску) ... */
        let modal = $(this); /* Отмена срабатывания события клика, при клике на дочерние элементы с классом 'modal' */
        modalClose(modal); /* Выполнение действий, обединенных в функцию "modalClose(modal)" */
    });


    $('.modal__content').on('click', function(event) { /* ! как дополнение к предыдущему блоку - Если мы нажимаем 'modal__content'*/
        event.stopPropagation(); /* При клике на элемент 'modal__content' не будет срабатывать событие клика по его родителю */
    });
    
    function modalClose(modal) { /* Группировка действий в функцию с названием "modalClose(modal)" */
        
        modal.find('.modal__content').css({ /* Для плавной анимации - ищет в css '.modal__content' и меняет ему css-свойства  */
            transform: 'scale(0.5)', /* Уменьшение окна до 50% размера */
            opacity: '0' /* Прозрачность на 100% */
        });

        setTimeout(function() { /* Функция задержки перед действием */
            $('body').removeClass('no-scroll'); /* У тега 'body' убираем класс 'no-scroll' */
            modal.removeClass('show'); /* Убираем у модального окна класс 'show' - закрываем его */
        }, 200); /* Время задержки - 0.2s */

    }

    function closeBCModal(modalBC) { /* Костыль для закрытия модального окна id="becomeClientModal" - часть 2 */
        
        modalBC.find('.modal__content').css({
            transform: 'scale(0.5)',
            opacity: '0'
        });

        setTimeout(function() {
            modalBC.removeClass('show');
        }, 200);

    }

    /* Slick slider
       https://kenwheeler.github.io/slick/
    ================================ */

    /* Intro slider */
    
    let introSlider = $("#introSlider");
    
    introSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000
    });

    $('#introSliderPrev').on('click', function() {
        introSlider.slick('slickPrev');
    });

    $('#introSliderNext').on('click', function() {
        introSlider.slick('slickNext');
    });

    /* Reviews slider */
    
    let reviewsSlider = $("#reviewsSlider");

    reviewsSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000
    });

    /* Aos.js
       https://github.com/michalsnik/aos
    ================================ */

    AOS.init({
    // Global settings:
    disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 80, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 700, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });

});