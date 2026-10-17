import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

const logos = (id, direction) =>
  new Splide(id, {
    type: 'loop',
    autoplay: true,
    arrows: false,
    pagination: false,
    direction,
    breakpoints: {
      767: { perPage: 2 },
      3000: { perPage: 5, interval: 3000, speed: 2000 },
    },
  }).mount();

export function initSliders() {
  logos('#splide1');
  logos('#splide2', 'rtl');

  new Splide('#splide3', {
    type: 'loop',
    autoplay: false,
    pagination: false,
    direction: 'rtl',
    breakpoints: {
      767: { perPage: 1, interval: 3000 },
      1199: { perPage: 2, interval: 3000 },
      3000: { perPage: 3, interval: 2500 },
    },
  }).mount();

  // перегортання карток кейсів
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('is-flipped'));
  });
}
