// Cloudflare Worker: приймає заявки з сайту й пересилає їх у Telegram.
// Токен і chat_id зберігаються як секрети Worker, а не в коді сайту.
//   Секрети:   BOT_TOKEN, CHAT_ID
//   Змінна:    ALLOWED_ORIGIN (напр. https://example.com)

const SOURCES = { hero: 'Головна форма', audit: 'Безкоштовний аудит', consultation: 'Консультація' };

const escapeHtml = (value) => String(value).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

function cors(env, request) {
  const origin = request.headers.get('Origin');
  const allowed = env.ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': origin && origin === allowed ? origin : allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

const respond = (status, headers, body = null) => new Response(body, { status, headers });

export default {
  async fetch(request, env) {
    const headers = cors(env, request);

    if (request.method === 'OPTIONS') return respond(204, headers);
    if (request.method !== 'POST') return respond(405, headers);
    if (request.headers.get('Origin') !== env.ALLOWED_ORIGIN) return respond(403, headers);

    let data;
    try {
      data = await request.json();
    } catch {
      return respond(400, headers);
    }

    const name = String(data.name ?? '').trim().slice(0, 100);
    const phone = String(data.phone ?? '').trim();
    if (!name || !/^\+\d{9,15}$/.test(phone)) return respond(422, headers);

    const text = [
      '<b>Заявка з сайту!</b>',
      `Форма: ${escapeHtml(SOURCES[data.source] ?? 'невідомо')}`,
      `Ім'я: ${escapeHtml(name)}`,
      `Телефон: ${escapeHtml(phone)}`,
    ].join('\n');

    const telegram = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.CHAT_ID, parse_mode: 'HTML', text }),
    });

    return respond(telegram.ok ? 200 : 502, headers);
  },
};
