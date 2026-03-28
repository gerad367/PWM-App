function createCard(restaurant) {
    const card = `
    <article class="tarjeta2-restaurante">
        <a href="../pages/restaurant.html?id=${restaurant.id}">
            <img src="${restaurant.imagen}" class="foto-restaurante" alt="${restaurant.nombre}">
            
            <button class="btn-favorito">
                <img src="../assets/images/favorito2.svg" alt="like">
            </button>
            
            <h3>${restaurant.nombre}</h3>
        </a>
        <p class="tarjeta-meta">${restaurant.tipo} • ⭐ ${restaurant.valoracion}</p>
    </article>`;

    return card;
}