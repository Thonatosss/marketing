import Splide from '@splidejs/splide';

const logoBreakpoints = {
  767: { perPage: 2 },
  3000: { perPage: 5, interval: 3000, speed: 2000 },
};

const sliders = {
  '#splide1': { type: 'loop', autoplay: true, arrows: false, pagination: false, breakpoints: logoBreakpoints },
  '#splide2': { type: 'loop', autoplay: true, arrows: false, pagination: false, direction: 'rtl', breakpoints: logoBreakpoints },
  '#splide3': {
    type: 'loop',
    autoplay: false,
    pagination: false,
    direction: 'rtl',
    breakpoints: {
      767: { perPage: 1, interval: 3000 },
      1199: { perPage: 2, interval: 3000 },
      3000: { perPage: 3, interval: 2500 },
    },
  },
};

export function initSliders() {
  for (const [selector, options] of Object.entries(sliders)) {
    if (document.querySelector(selector)) new Splide(selector, options).mount();
  }
}
