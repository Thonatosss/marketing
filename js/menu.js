export function initMenu() {
  const menu = document.querySelector('.burger-menu');
  if (menu) {
    const button = menu.querySelector('.burger-menu_button');
    const toggle = () => {
      const open = menu.classList.toggle('burger-menu_active');
      button.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    button.addEventListener('click', e => {
      e.preventDefault();
      toggle();
    });
    menu.querySelectorAll('.burger-menu_link, .burger-menu_overlay').forEach(el => el.addEventListener('click', toggle));
  }

  // модальне вікно заявки (нативний <dialog>)
  const dialog = document.getElementById('dialog');
  if (dialog) {
    document.querySelectorAll('[data-open-dialog]').forEach(b => b.addEventListener('click', () => dialog.showModal()));
    document.querySelectorAll('[data-close-dialog]').forEach(b => b.addEventListener('click', () => dialog.close()));
  }
}
