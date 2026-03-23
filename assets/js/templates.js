    // Función para cargar trozos de HTML
    function cargarTemplate(idContenedor, rutaArchivo) {
        fetch(rutaArchivo)
            .then(response => response.text())
            .then(data => {
                document.getElementById(idContenedor).innerHTML = data;
            });
    }

    document.addEventListener("DOMContentLoaded", () => {

        const button = document.getElementById("menu-toggle");

        setTimeout(() => {
            const sidebar = document.querySelector(".sidebar-lateral");

            if (!button || !sidebar) return;

            button.addEventListener("click", () => {
                sidebar.classList.toggle("active");
            });

        }, 300);

    });

    // Llamamos a la función para cada parte
    cargarTemplate('header-template', '../templates/header.html');
    cargarTemplate('footer-template', '../templates/footer.html');
    cargarTemplate('sidebar-template', '../templates/sidebar.html');

    cargarTemplate('cards_content-template', '../templates/cards-template.html');
