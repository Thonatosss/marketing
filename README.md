# Prime Digital Group — сайт

Одно­сторінковий лендінг digital-агенції (Львів) + сторінки `thanks.html` і `policy.html`.

## Запуск

```bash
npm install
npm run dev      # розробка, http://localhost:5173
npm run build    # готовий сайт у dist/ (його заливають на хостинг)
npm run preview  # перевірити збірку локально
```

## Структура

- `index.html`, `thanks.html`, `policy.html` — сторінки.
- `sass/` — стилі (Sass), збираються Vite у один мінімізований CSS.
- `js/` — модулі: `main.js` (вхід), `sliders.js`, `menu.js`, `phone.js`, `forms.js`, `particles.js`, `pixel.js`.
- `images/` — оптимізовані WebP (`-480/-960` для srcset). Оригінали зберігаються поза репозиторієм.
- `scripts/optimize-images.mjs`, `scripts/convert-fonts.mjs` — перегенерація WebP і WOFF2 з оригіналів.
- `worker/` — Cloudflare Worker, який приймає заявки й шле їх у Telegram.

## Заявки (форми)

Токена Telegram у коді сайту немає. Форми шлють JSON на Worker (`VITE_FORM_ENDPOINT`), а Worker вже
звертається до Telegram. Секрети задаються лише в Cloudflare:

```bash
cd worker
npx wrangler secret put TELEGRAM_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler deploy
```

Потім у `.env` (за зразком `.env.example`) вказати адресу Worker і зробити `npm run build`.
Домен сайту має бути в `ALLOWED_ORIGIN` у `worker/wrangler.toml`.
