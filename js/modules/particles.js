import 'particles.js';

const config = {
  particles: {
    number: { value: 70 },
    color: { value: '#ceb76e' },
    shape: { type: 'circle' },
    size: { value: 1, random: true },
    line_linked: { enable: true, distance: 170, color: '#ceb76e' },
    move: { enable: true, speed: 2 },
  },
  interactivity: {
    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
    modes: { repulse: { distance: 70, duration: 0.4 } },
  },
  retina_detect: true,
};

export function initParticles(id) {
  if (document.getElementById(id) && window.particlesJS) window.particlesJS(id, config);
}
