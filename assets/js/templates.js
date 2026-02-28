// Función para cargar trozos de HTML
function cargarTemplate(idContenedor, rutaArchivo) {
    fetch(rutaArchivo)
        .then(response => response.text())
        .then(data => {
            document.getElementById(idContenedor).innerHTML = data;
        });
}

// Llamamos a la función para cada parte
cargarTemplate('header-template', '../templates/base.html');