// Перевертання кейс-карток по кліку та з клавіатури.
// Делегування потрібне, бо Splide клонує слайди (клони не мають власних обробників).
export function initCards() {
  document.querySelectorAll('.card').forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
  });

  const flip = (card) => card.classList.toggle('is-flipped');

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) flip(card);
  });

  document.addEventListener('keydown', (e) => {
    const card = e.target.closest?.('.card');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      flip(card);
    }
  });
}
