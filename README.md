# Prime Digital Group — лендінг

Статичний односторінковий сайт (HTML + SCSS + vanilla JS) з формами заявок.

## Структура

| Шлях | Призначення |
|---|---|
| `index.html`, `thanks.html`, `policy.html` | Сторінки |
| `sass/` | Стилі (SCSS, модулі через `@use`) → збираються в `assets/css/styles.css` |
| `js/main.js`, `js/modules/` | Скрипти (ES-модулі) → збираються esbuild у `assets/js/main.js` + `main.css` |
| `assets/` | **Результат збірки** — комітиться, щоб сайт працював на будь-якому статичному хостингу без build-кроку |
| `images/`, `fonts/` | Оптимізовані WebP та WOFF2 |
| `scripts/optimize-images.mjs` | Конвертація оригіналів із `images-src/` у WebP |

## Розробка

```bash
npm install
npm run build        # css + js у assets/
npm run watch:css    # автозбірка стилів
npm run serve        # локальний сервер на http://localhost:5501
```

Після змін у `sass/` або `js/` обов'язково виконайте `npm run build` і закомітьте `assets/`
(CI перевіряє, що збірка актуальна).

### Нові зображення

Покладіть оригінали в `images-src/<тека>/` (тека ігнорується git) і виконайте `npm run images`.

## Заявки з форм

Форми (`data-lead-form`) надсилають `POST` із JSON `{ name, phone, source, page }` на адресу з тегу в `index.html`:

```html
<meta name="lead-endpoint" content="https://prime-leads.<акаунт>.workers.dev" />
```

Приймач — Cloudflare Worker з `worker/lead-worker.js`: перевіряє дані та origin, екранує текст
і надсилає повідомлення в Telegram. Токен бота живе лише в секретах Worker, не в коді сайту.

Розгортання (потрібен безкоштовний акаунт Cloudflare):

```bash
cd worker
# у wrangler.toml вкажіть ALLOWED_ORIGIN — домен сайту
npx wrangler secret put BOT_TOKEN   # токен нового бота від @BotFather
npx wrangler secret put CHAT_ID     # id чату/каналу
npx wrangler deploy
```

Скопіюйте URL із виводу `deploy` у `<meta name="lead-endpoint">`.

> Поки `lead-endpoint` порожній, користувач бачить повідомлення про помилку з номером телефону.

## Безпека

Старий токен Telegram-бота зберігається в історії git (до коміту `cd53601`) —
його потрібно відкликати через @BotFather (`/revoke`), навіть якщо код уже очищено.
