const btns = document.querySelectorAll('.prevent-default');

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
    });
});
