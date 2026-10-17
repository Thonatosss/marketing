// Перевертання кейс-карток по кліку та з клавіатури.
export function initCards() {
  document.querySelectorAll('.card').forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    const flip = () => card.classList.toggle('is-flipped');
    card.addEventListener('click', flip);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    });
  });
}
