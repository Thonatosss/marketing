import '@splidejs/splide/dist/css/splide.min.css';
import 'aos/dist/aos.css';
import 'intl-tel-input/build/css/intlTelInput.css';

import AOS from 'aos';
import { initMenu } from './modules/menu.js';
import { initCards } from './modules/cards.js';
import { initSliders } from './modules/sliders.js';
import { initDialog } from './modules/dialog.js';
import { initForms } from './modules/forms.js';
import { initParticles } from './modules/particles.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initMenu();
initCards();
initSliders();
initDialog();
initForms();

AOS.init({ once: true, disable: prefersReducedMotion });

document.querySelectorAll('[data-current-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

if (!prefersReducedMotion) {
  const run = () => initParticles('particles-js');
  'requestIdleCallback' in window ? requestIdleCallback(run, { timeout: 2000 }) : setTimeout(run, 500);
}
