document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.card-horizontal');

    // Animación de tarjetas al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    cards.forEach(card => observer.observe(card));

    // Scroll spy para la navegación activa
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 220)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

// Manejo del envío del formulario por medio de AJAX y Fetch
const form = document.getElementById('form-contacto');
const status = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        
        status.className = 'form-status'; 
        status.textContent = 'Enviando mensaje...';
        status.style.display = 'block';

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.classList.add('success');
                status.textContent = '¡Gracias! Tu mensaje ha sido enviado con éxito.';
                form.reset();
            } else {
                const responseData = await response.json();
                if (responseData.errors) {
                    status.textContent = responseData.errors.map(error => error.message).join(", ");
                } else {
                    status.textContent = 'Ocurrió un problema al enviar. Inténtalo de nuevo.';
                }
                status.classList.add('error');
            }
        } catch (error) {
            status.className = 'form-status error';
            status.textContent = 'Hubo un error de conexión. Por favor comprueba tu red.';
        }
    });
}