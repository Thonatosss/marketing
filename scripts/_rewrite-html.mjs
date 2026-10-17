// Одноразовий скрипт міграції HTML (head, скрипти, форми). Лишено для історії змін.
import fs from 'node:fs';

const icons = `    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favico/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favico/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/images/favico/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#000000" />`;

function head({ title, description, canonical, robots }) {
  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />${robots ? `\n    <meta name="robots" content="${robots}" />` : ''}
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="uk_UA" />
    <meta property="og:site_name" content="Prime Digital Group" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
${icons}
  </head>`;
}

const pages = {
  'index.html': {
    title: 'Prime Digital Group — потужний digital-маркетинг для вашого бізнесу',
    description: 'Таргет, Meta Ads, TikTok Ads, Google Ads, Telegram реклама. Безкоштовний аудит і консультація експертів з маркетингу. Львів.',
    canonical: 'https://primedigitalgroup.com.ua/',
    entry: 'main.js',
  },
  'thanks.html': {
    title: 'Дякуємо, що обрали нас! — Prime Digital Group',
    description: 'Заявку отримано. Наш менеджер зв\'яжеться з вами найближчим часом.',
    canonical: 'https://primedigitalgroup.com.ua/thanks.html',
    robots: 'noindex',
    entry: 'page.js',
    pixelLead: true,
  },
  'policy.html': {
    title: 'Політика конфіденційності — Prime Digital Group',
    description: 'Політика конфіденційності та обробки персональних даних Prime Digital Group.',
    canonical: 'https://primedigitalgroup.com.ua/policy.html',
    entry: 'page.js',
  },
};

for (const [file, p] of Object.entries(pages)) {
  let h = fs.readFileSync(file, 'utf8');
  h = h.replace('<html lang="en">', '<html lang="uk">');
  const pixel = p.pixelLead
    ? `\n    <script type="module">\n      import { loadPixel } from './js/pixel.js';\n      loadPixel('Lead');\n    </script>`
    : '';
  h = h.replace(/<head>[\s\S]*?<\/head>/, head(p));
  // скрипти в кінці body
  h = h.replace(/(<div id="particles-js">\s*<\/div>)[\s\S]*<\/body>/, `$1\n    <script type="module" src="./js/${p.entry}"></script>${pixel}\n  </body>`);
  // спрайт
  h = h.replace(/href="(?:\.)?\/images\/sprite\//g, 'href="/images/sprite/').replace(/href="\.\/images\/sprite\//g, 'href="/images/sprite/');
  // абсолютні шляхи до сторінок
  h = h.replace(/href="policy\.html"/g, 'href="/policy.html"').replace(/href="\/index\.html"/g, 'href="/"');
  fs.writeFileSync(file, h);
}

// index: діалог, меню, honeypot, дрібні помилки розмітки
let h = fs.readFileSync('index.html', 'utf8');
h = h.replace(' onclick="window.dialog.showModal();"', ' data-open-dialog').replace('last-open-form trigger prevent-default button-9 primary', 'last-open-form trigger button-9 primary" type="button');
h = h.replace('<dialog dialog id="dialog">', '<dialog id="dialog" aria-labelledby="dialog-title">');
h = h.replace('<h5 class="modal-title">', '<h5 class="modal-title" id="dialog-title">');
h = h.replace('<button onclick="window.dialog.close();" type="submit"', '<button type="submit"');
h = h.replace('<button onclick="window.dialog.close();" aria-label="close" class="x" aria-label="Закрити вікно для формування заявки">', '<button type="button" data-close-dialog class="x" aria-label="Закрити вікно для формування заявки">');
h = h.replace('<ul ul class', '<ul class').replace(/<spun class="burger-menu_lines"><\/spun>/, '<span class="burger-menu_lines"></span>').replace(/<\/spun>/g, '</span>');
h = h.replace('<a href="" class="burger-menu_button" aria-label="Відкрити бургерне меню">', '<a href="#" role="button" aria-expanded="false" class="burger-menu_button" aria-label="Відкрити бургерне меню">');
// honeypot у кожну форму
const hp = '\n<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="visually-hidden-field" />';
h = h.replace(/(<form[^>]*id="(?:first-form|ouditForm|modal_form)"[^>]*>)/g, `$1${hp}`);
fs.writeFileSync('index.html', h);
console.log('done');
