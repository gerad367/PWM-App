
// Buscar el json
// Convertir a datos que js entienda

fetch("../assets/data/data.json")
    .then(response => response.json())
    .then(data => {

        // para cada restaurante
        data.restaurantes.forEach(restaurant => {
            createHomeCard(restaurant)
        })
    })


// Funcion para crear las tarjeta del home
function createHomeCard(restaurant) {
    const container = document.querySelector(".grid-restaurantes");

    const card = `
    <article class="tarjeta-restaurante">
        <a href="../pages/restaurant.html.html?id=${restaurant.id}">
            <img src="${restaurant.imagen}" alt="${restaurant.nombre}">
        <h3>"${restaurant.nombre}"</h3>
        </a>
        <p>${restaurant.tipo} • ⭐ ${restaurant.valoracion}</p>
    </article>`;

    // Inyectar la tarjeta al html
    container.innerHTML += card;
}