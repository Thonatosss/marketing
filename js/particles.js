

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
