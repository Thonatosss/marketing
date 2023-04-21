// import Splide from '@splidejs/splide';

const slide = document.querySelector('.splide');

new Splide( slide, {
    type: 'loop',
    perPage: 3,
    autoplay: true,
    lazyload: true,
    arrows: false,
}).mount();
console.log(slide);