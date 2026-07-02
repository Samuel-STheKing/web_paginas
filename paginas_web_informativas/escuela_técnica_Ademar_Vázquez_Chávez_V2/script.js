// E.T. "Ademar Vásquez Chávez" — interacciones del sitio
document.addEventListener('DOMContentLoaded', () => {

  /* Menú móvil */
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Barra de progreso de lectura (usa los colores del escudo) */
  const progressFill = document.getElementById('progressFill');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* Encabezado: sombra sutil al desplazar */
  const header = document.getElementById('siteHeader');
  const setHeaderState = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 8
      ? '0 8px 24px -18px rgba(15,58,37,0.5)'
      : 'none';
  };
  window.addEventListener('scroll', setHeaderState, { passive: true });
  setHeaderState();

  /* Revelado suave de secciones al entrar en pantalla */
  const revealTargets = document.querySelectorAll(
    '.mencion-card, .g-item, .nosotros-copy, .nosotros-crest'
  );
  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .55s ease, transform .55s ease';
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => io.observe(el));
  }
});