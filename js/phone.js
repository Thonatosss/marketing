import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

const IDS = ['header-phone-number', 'free-oudit-phone', 'last-section-phone'];

// Повертає мапу {id інпута: екземпляр intl-tel-input}
export function initPhones() {
  const instances = {};
  for (const id of IDS) {
    const input = document.getElementById(id);
    if (!input) continue;
    const iti = intlTelInput(input, { initialCountry: 'ua' });
    instances[id] = iti;
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9+]/g, '');
    });
    input.addEventListener('countrychange', () => {
      input.value = '+' + iti.getSelectedCountryData().dialCode;
    });
  }
  return instances;
}
