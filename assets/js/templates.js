// Función para cargar trozos de HTML
function cargarTemplate(idContenedor, rutaArchivo) {
    fetch(rutaArchivo)
        .then(response => response.text())
        .then(data => {
            document.getElementById(idContenedor).innerHTML = data;

            inicializarMenu(); // intentamos cada vez
        });
}

let menuInicializado = false;

function inicializarMenu() {

    if (menuInicializado) return;

    const button = document.getElementById("menu-toggle");
    const sidebar = document.querySelector(".sidebar-lateral");
    const overlay = document.getElementById("overlay");

    // 🔥 SOLO comprobamos lo importante
    if (!button || !sidebar) return;

    button.onclick = () => {
        sidebar.classList.toggle("active");

        if (overlay) {
            overlay.classList.toggle("active");
        }
    };

    // 🔥 overlay es opcional
    if (overlay) {
        overlay.onclick = () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        };
    }

    menuInicializado = true;
}

    // Llamamos a la función para cada parte
    cargarTemplate('header-template', '../templates/header.html');
    cargarTemplate('footer-template', '../templates/footer.html');
    cargarTemplate('sidebar-template', '../templates/sidebar.html');

    cargarTemplate('cards_content-template', '../templates/cards-template.html');
