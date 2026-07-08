document.addEventListener("DOMContentLoaded", () => {
    // Definimos la raíz real de tu proyecto en Apache de forma directa
    const basePath = "/PAGINA_WEB_CLEVELAND/";

    // Cargar Navbar de forma dinámica
    const mainNav = document.querySelector(".main-nav");
    if (mainNav) {
        fetch(`${basePath}components/nav.html`)
            .then(response => {
                if (!response.ok) throw new Error('No se pudo encontrar nav.html');
                return response.text();
            })
            .then(data => {
                mainNav.innerHTML = data;
                
                // Ajustamos las rutas de los enlaces y la imagen del Logo dentro del Nav
                mainNav.querySelectorAll("a, img").forEach(el => {
                    const attr = el.tagName === "IMG" ? "src" : "href";
                    const val = el.getAttribute(attr);
                    // Si la ruta empieza con '/' y no tiene ya la raíz, se la agregamos
                    if (val && val.startsWith("/") && !val.startsWith(basePath)) {
                        el.setAttribute(attr, basePath + val.substring(1));
                    }
                });
            })
            .catch(error => console.error("Error cargando el menú:", error));
    }

    // Cargar Footer de forma dinámica
    const siteFooter = document.querySelector(".site-footer");
    if (siteFooter) {
        fetch(`${basePath}components/footer.html`)
            .then(response => {
                if (!response.ok) throw new Error('No se pudo encontrar footer.html');
                return response.text();
            })
            .then(data => {
                siteFooter.innerHTML = data;

                // Ajustamos también las rutas de los enlaces dentro del Footer
                siteFooter.querySelectorAll("a").forEach(el => {
                    const href = el.getAttribute("href");
                    if (href && href.startsWith("/") && !href.startsWith(basePath)) {
                        el.setAttribute(href, basePath + href.substring(1));
                    }
                });

                if (typeof initBackToTop === 'function') {
                    initBackToTop();
                }
            })
            .catch(error => console.error("Error cargando el footer:", error));
    }
});