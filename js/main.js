import 'modern-normalize/modern-normalize.css';
import '../sass/main.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { initSliders } from './sliders.js';
import { initMenu } from './menu.js';
import { initPhones } from './phone.js';
import { initForms } from './forms.js';
import { initParticles } from './particles.js';
import { loadPixel } from './pixel.js';

AOS.init({ once: true, disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches });
initSliders();
initMenu();
initForms(initPhones());
initParticles();
loadPixel('PageView');
