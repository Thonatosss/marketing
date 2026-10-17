const ACTIVE = 'burger-menu_active';

export function initMenu(selector = '.burger-menu') {
  const menu = document.querySelector(selector);
  if (!menu) return;

  const button = menu.querySelector('.burger-menu_button');
  const toggle = (force) => {
    const open = menu.classList.toggle(ACTIVE, force);
    document.body.classList.toggle('no-scroll', open);
    button.setAttribute('aria-expanded', String(open));
  };

  button.addEventListener('click', () => toggle());
  menu.querySelector('.burger-menu_overlay').addEventListener('click', () => toggle(false));
  menu.querySelectorAll('.burger-menu_link').forEach((link) => link.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains(ACTIVE)) toggle(false);
  });
}
