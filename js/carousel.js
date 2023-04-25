

const slide = document.getElementById('splide3');

new Splide( '#splide1', {
    type: 'loop',
    perPage: 2,
    autoplay: true,
    lazyload: true,
    arrows: false,
    pagination: false,
    // padding: {
    //     top: '20px',
    //     bottom: '20px',
    // }
}).mount();

new Splide( '#splide2', {
    type: 'loop',
    perPage: 2,
    autoplay: true,
    lazyload: true,
    arrows: false,
    pagination: false,
    direction: 'rtl',
}).mount();

new Splide( '#splide3', {
    type: 'loop',
    perPage: 1,
    // autoplay: true,
    lazyload: true,
    pagination: false,
    direction: 'rtl',
}).mount();
new Splide( '#splide4', {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    lazyload: true,
    arrows: false,
    pagination: false,
    direction: 'rtl',
}).mount();
console.log(slide);