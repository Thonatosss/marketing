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

Форми (`data-lead-form`) надсилають `POST` із JSON на адресу з тегу в `index.html`:

```html
<meta name="lead-endpoint" content="https://ваш-вебхук" />
```

Тіло запиту: `{ "name", "phone", "source", "page" }`, де `source` — `hero`, `audit` або `consultation`.
Приймачем може бути вебхук n8n/Make або власна serverless-функція, яка вже сама надсилає повідомлення
в Telegram. **Токен бота не повинен потрапляти в код сайту.**

> Поки `lead-endpoint` порожній, користувач бачить повідомлення про помилку з номером телефону.

## Безпека

Старий токен Telegram-бота зберігається в історії git (до коміту `cd53601`) —
його потрібно відкликати через @BotFather (`/revoke`), навіть якщо код уже очищено.
