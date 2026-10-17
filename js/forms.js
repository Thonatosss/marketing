// Усі три форми надсилаються на серверний ендпоінт (див. worker/), токена Telegram у коді сайту немає.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/lead';

const FORMS = [
  { id: 'first-form', name: 'firstFormName', phone: 'firstFormPhone', phoneId: 'header-phone-number', source: 'hero' },
  { id: 'ouditForm', name: 'oudit_user_name', phone: 'oudit_user_phone', phoneId: 'free-oudit-phone', source: 'audit' },
  { id: 'modal_form', name: 'modal_form_userName', phone: 'modal_form_userPhone', phoneId: 'last-section-phone', source: 'consultation' },
];

function bind({ id, name, phone, phoneId, source }, phones) {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    const iti = phones[phoneId];
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.elements[name].value.trim(),
          phone: (iti && iti.getNumber()) || form.elements[phone].value.trim(),
          source,
          website: form.elements.website ? form.elements.website.value : '', // honeypot
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.closest('dialog')?.close();
      window.location.href = '/thanks.html';
    } catch (err) {
      console.error(err);
      btn.disabled = false;
      alert('Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам у Telegram.');
    }
  });
}

export function initForms(phones = {}) {
  FORMS.forEach(f => bind(f, phones));
}
