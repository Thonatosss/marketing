// Meta (Facebook) Pixel: вантажимо після завантаження сторінки, щоб не блокувати рендер
const PIXEL_ID = '1463494927551605';

export function loadPixel(event) {
  const run = () => {
    const f = window;
    if (f.fbq) return;
    const n = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
    f.fbq('init', PIXEL_ID);
    f.fbq('track', event);
  };
  document.readyState === 'complete' ? run() : window.addEventListener('load', run, { once: true });
}
