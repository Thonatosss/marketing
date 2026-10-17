import intlTelInput from 'intl-tel-input';
import { showToast } from './toast.js';

const THANKS_PAGE = 'thanks.html';

// Адреса приймача заявок задається в <meta name="lead-endpoint"> (див. README).
const getEndpoint = () => document.querySelector('meta[name="lead-endpoint"]')?.content.trim();

async function sendLead(payload) {
  const endpoint = getEndpoint();
  if (!endpoint) throw new Error('lead-endpoint is not configured');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Lead request failed: ${response.status}`);
}

function normalizePhone(value, iti) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, '');
  if (trimmed.startsWith('+')) return `+${digits}`;
  const dialCode = iti?.getSelectedCountryData().dialCode ?? '380';
  return `+${dialCode}${digits.replace(/^0+/, '')}`;
}

const isValidPhone = (phone) => /^\+\d{9,15}$/.test(phone);

function setupForm(form) {
  const nameInput = form.querySelector('[name="name"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const submitBtn = form.querySelector('[type="submit"]');
  const iti = phoneInput.dataset.intl !== undefined ? intlTelInput(phoneInput, { initialCountry: 'ua' }) : null;

  // у полі телефону залишаємо лише цифри та "+"
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^0-9+]/g, '');
  });

  // повернення назад із кешу браузера не повинно лишати кнопку заблокованою
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) submitBtn.disabled = false;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const phone = normalizePhone(phoneInput.value, iti);
    if (!isValidPhone(phone)) {
      phoneInput.setCustomValidity('Введіть коректний номер телефону');
      phoneInput.reportValidity();
      phoneInput.addEventListener('input', () => phoneInput.setCustomValidity(''), { once: true });
      return;
    }

    submitBtn.disabled = true;
    try {
      await sendLead({
        name: nameInput.value.trim(),
        phone,
        source: form.dataset.leadForm,
        page: location.href,
      });
      form.reset();
      form.closest('dialog')?.close();
      location.href = THANKS_PAGE;
    } catch (error) {
      console.error(error);
      showToast('Не вдалося відправити заявку. Зателефонуйте нам: (068) 356-01-12', 'error');
      submitBtn.disabled = false;
    }
  });
}

export function initForms() {
  document.querySelectorAll('form[data-lead-form]').forEach(setupForm);
}
