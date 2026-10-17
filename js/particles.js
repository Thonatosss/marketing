import particlesSrc from 'particles.js/particles.js?url';
import config from '../particles.json';

// particles.js написаний у нестрогому режимі (arguments.callee), тому в ES-модуль його не імпортуємо,
// а підключаємо класичним скриптом. Запускаємо, коли браузер вільний, щоб не гальмувати перший екран.
export function initParticles() {
  if (!document.getElementById('particles-js')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const start = () => {
    const script = document.createElement('script');
    script.src = particlesSrc;
    script.onload = () => window.particlesJS('particles-js', config);
    document.head.appendChild(script);
  };
  'requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 500);
}
