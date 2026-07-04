// Botón "Volver arriba" flotante
document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // Muestra u oculta el botón según la posición del scroll
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // Revisa el estado inicial (por si la página carga ya con scroll)
        toggleBackToTop();

        window.addEventListener('scroll', toggleBackToTop);

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});