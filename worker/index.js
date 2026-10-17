// Cloudflare Worker: приймає заявки з сайту й пересилає в Telegram.
// Секрети (wrangler secret put): TELEGRAM_TOKEN, TELEGRAM_CHAT_ID. Змінна ALLOWED_ORIGIN — у wrangler.toml.

const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const SOURCES = { hero: 'Головний екран', audit: 'Безкоштовний аудит', consultation: 'Консультація' };

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = env.ALLOWED_ORIGIN.split(',').map(s => s.trim());
    const cors = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    };
    const reply = (status, body = {}) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...cors } });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return reply(405, { error: 'method' });
    if (!allowed.includes(origin)) return reply(403, { error: 'origin' });

    let data;
    try {
      data = await request.json();
    } catch {
      return reply(400, { error: 'json' });
    }

    if (data.website) return reply(200, { ok: true }); // honeypot: бот, мовчки ігноруємо

    const name = String(data.name || '').trim();
    const phone = String(data.phone || '').trim();
    if (name.length < 1 || name.length > 80) return reply(400, { error: 'name' });
    if (!/^\+?[0-9]{7,15}$/.test(phone)) return reply(400, { error: 'phone' });

    const text = `Заявка з сайту!\nДжерело: ${SOURCES[data.source] || 'невідомо'}\nІм'я: ${escapeHtml(name)}\nНомер телефону: ${escapeHtml(phone)}`;
    const tg = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, parse_mode: 'HTML', text }),
    });
    return tg.ok ? reply(200, { ok: true }) : reply(502, { error: 'telegram' });
  },
};
