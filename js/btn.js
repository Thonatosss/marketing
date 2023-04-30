const btns = document.querySelectorAll('.prevent-default');

export default btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
    });
});
