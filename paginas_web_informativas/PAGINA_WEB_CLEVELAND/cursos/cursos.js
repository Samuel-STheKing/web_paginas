document.addEventListener("DOMContentLoaded", () => {
    const cardWrappers = document.querySelectorAll(".course-card-wrapper");

    // Manejar el enfoque de las tarjetas
    cardWrappers.forEach(wrapper => {
        wrapper.addEventListener("focusin", () => {
            wrapper.classList.add("sliding-focused");
        });

        wrapper.addEventListener("focusout", () => {
            wrapper.classList.remove("sliding-focused");
        });
    });

    // === NAVEGACIÓN ENTRE CURSOS ===
    const cursoLinks = document.querySelectorAll('[data-curso]');
    const cursoCards = document.querySelectorAll('.curso-card');
    const tituloPrincipal = document.getElementById('curso-titulo');

    // Mapeo de nombres para el título
    const nombresCursos = {
        'beginner': 'Beginner',
        'elementary': 'Elementary',
        'pre-intermediate': 'Pre-Intermediate',
        'intermediate': 'Intermediate',
        'advance': 'Advance'
    };

    function mostrarCurso(cursoId) {
        // Ocultar todos
        cursoCards.forEach(card => {
            card.style.display = 'none';
        });

        // Mostrar el seleccionado
        const targetCard = document.querySelector(`.curso-card[data-curso="${cursoId}"]`);
        if (targetCard) {
            targetCard.style.display = 'flex';
        }

        // Actualizar título
        if (tituloPrincipal && nombresCursos[cursoId]) {
            tituloPrincipal.textContent = nombresCursos[cursoId];
        }

        // Guardar en localStorage
        localStorage.setItem('cursoSeleccionado', cursoId);

        // Actualizar URL
        if (window.history && window.history.pushState) {
            const url = new URL(window.location);
            url.searchParams.set('curso', cursoId);
            window.history.pushState({ curso: cursoId }, '', url);
        }
    }

    // Event listeners para los enlaces del nav
    cursoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const cursoId = this.dataset.curso;
            mostrarCurso(cursoId);
        });
    });

    // Verificar parámetro en URL
    const urlParams = new URLSearchParams(window.location.search);
    const cursoParam = urlParams.get('curso');
    const cursosValidos = ['beginner', 'elementary', 'pre-intermediate', 'intermediate', 'advance'];

    if (cursoParam && cursosValidos.includes(cursoParam)) {
        mostrarCurso(cursoParam);
    } else {
        // Intentar recuperar de localStorage
        const cursoGuardado = localStorage.getItem('cursoSeleccionado');
        if (cursoGuardado && cursosValidos.includes(cursoGuardado)) {
            mostrarCurso(cursoGuardado);
        } else {
            // Por defecto: Beginner
            mostrarCurso('beginner');
        }
    }

    // Manejar navegación hacia atrás/adelante
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.curso) {
            mostrarCurso(event.state.curso);
        }
    });

    // Exponer función globalmente
    window.mostrarCurso = mostrarCurso;
});