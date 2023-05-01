// window.onload = function () {
//     let particlesSettings = {
//         connectParticles: true,
//         speed: 0.2,
//         maxParticles: 50,
//         minDistance: 200,
//         color: '#ceb76e',
//     };

//     function setParticlesParams() {
//         if (window.innerWidth <= 768) {
//             // Налаштування для розміру вікна до 768px
//             particlesSettings.speed = 0.2;
//             particlesSettings.maxParticles = 15;
//             particlesSettings.minDistance = 140;
//         } else if (window.innerWidth <= 1200) {
//             // Налаштування для розміру вікна від 768px до 1200px
//             particlesSettings.speed = 0.2;
//             particlesSettings.maxParticles = 50;
//             particlesSettings.minDistance = 150;
//         } else {
//             // Налаштування для розміру вікна понад 1200px
//             particlesSettings.speed = 0.3;
//             particlesSettings.maxParticles = 60;
//             particlesSettings.minDistance = 200;
//         }

//         Particles.init({
//             selector: '.particles',
//             ...particlesSettings
//         });
//     }

//     // Виклик функції для встановлення параметрів при завантаженні сторінки
//     setParticlesParams();

//     // Виклик функції для зміни параметрів при зміні розміру вікна
//     window.addEventListener('resize', setParticlesParams);
// };

window.onload = function () {
    Particles.init({
        selector: '.particles',
        color: '#ceb76e',
        connectParticles: true,
        responsive: [
            {
                breakpoint: 767,
                options: {
                    sizeVariations: 2,
                    speed: 0.2,
                    minDistance: 100,
                }
            },
            {
                breakpoint: 1999,
                options: {
                    sizeVariations: 3,
                    speed: 0.3,
                    minDistance: 150,
                }
            },
            {
                breakpoint: 3000,
                options: {
                    sizeVariations: 4,
                    speed: 0.5,
                    minDistance: 220,
                }
            }
        ]
    });
};
