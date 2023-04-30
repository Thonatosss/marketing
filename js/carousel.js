new Splide('#splide1', {
    type: 'loop',

    autoplay: true,
    lazyload: true,
    arrows: false,
    pagination: false,
    breakpoints: {
        767: {
            perPage: 2,
        },
        1999: {
            perPage: 5,
            interval: 2000,
            speed: 5000,
        }
    }
}).mount();

new Splide('#splide2', {
    type: 'loop',
    autoplay: true,
    lazyload: true,
    arrows: false,
    pagination: false,
    direction: 'rtl',
    breakpoints: {
        767: {
            perPage: 2,
        },
        1999: {
            perPage: 5,
            interval: 2000,
            speed: 5000,
        }
    }
}).mount();

new Splide('#splide3', {
    type: 'loop',
    autoplay: true,
    lazyload: true,
    pagination: false,
    direction: 'rtl',
    breakpoints: {
        767: {
            perPage: 1,
        },
        1999: {
            perPage: 2,

        }
    }

}).mount();
new Splide('#splide4', {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    lazyload: true,
    arrows: false,
    pagination: false,
    direction: 'rtl',
    breakpoints: {
        767: {
            perPage: 1,
        },
        1999: {
            perPage: 2,

        }
    }
}).mount();
