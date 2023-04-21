// import Splide from '@splidejs/splide';

const slide = document.querySelector('.splide');

new Splide( '#splide1', {
    type: 'loop',
    perPage: 3,
    autoplay: true,
    lazyload: true,
    arrows: false,
    pagination: false,
}).mount();

new Splide( '#splide2', {
    type: 'loop',
    perPage: 3,
    autoplay: true,
    lazyload: true,
    arrows: false,
    pagination: false,
    direction: 'rtl',
}).mount();

new Splide( '#splide3', {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    lazyload: true,
    // arrows: false,
    // pagination: false,
    direction: 'rtl',
}).mount();
console.log(slide);