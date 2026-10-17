// Керування нативними <dialog> через data-атрибути (без inline onclick).
export function initDialog() {
  document.querySelectorAll('[data-dialog-open]').forEach((btn) => {
    const dialog = document.getElementById(btn.dataset.dialogOpen);
    btn.addEventListener('click', () => dialog?.showModal());
  });

  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.querySelectorAll('[data-dialog-close]').forEach((btn) => btn.addEventListener('click', () => dialog.close()));
    // клік по затемненню (фону) закриває вікно
    dialog.addEventListener('click', (e) => {
      const { top, left, right, bottom } = dialog.getBoundingClientRect();
      const outside = e.clientY < top || e.clientY > bottom || e.clientX < left || e.clientX > right;
      if (outside) dialog.close();
    });
  });
}
