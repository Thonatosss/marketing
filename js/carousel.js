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
            interval: 3000,
            speed: 2000,
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
            interval: 3000,
            speed: 2000,
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
            interval: 3000
        },
        1199: {
            perPage: 2,
            interval: 3000

        },
        3000: {
            perPage: 3,
            interval: 2500
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
        1199: {
            perPage: 2,

        },
        3000: {
            perPage: 3,
            interval: 2000,
            speed: 2000
        }
    }
}).mount();
