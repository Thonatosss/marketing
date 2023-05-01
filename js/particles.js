window.onload = function () {
    var particlesSettings = {
        connectParticles: true,
        speed: 0.2,
        maxParticles: 50,
        minDistance: 200,
        color: '#ceb76e',
    };

    function setParticlesParams() {
        if (window.innerWidth <= 768) {
            // Налаштування для розміру вікна до 768px
            particlesSettings.speed = 0.2;
            particlesSettings.maxParticles = 15;
            particlesSettings.minDistance = 180;
        } else if (window.innerWidth <= 1200) {
            // Налаштування для розміру вікна від 768px до 1200px
            particlesSettings.speed = 0.2;
            particlesSettings.maxParticles = 50;
            particlesSettings.minDistance = 200;
        } else {
            // Налаштування для розміру вікна понад 1200px
            particlesSettings.speed = 0.3;
            particlesSettings.maxParticles = 60;
            particlesSettings.minDistance = 300;
        }

        Particles.init({
            selector: '.particles',
            ...particlesSettings
        });
    }

    // Виклик функції для встановлення параметрів при завантаженні сторінки
    setParticlesParams();

    // Виклик функції для зміни параметрів при зміні розміру вікна
    window.addEventListener('resize', setParticlesParams);
};
