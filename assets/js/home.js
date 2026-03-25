
// Buscar el json
// Convertir a datos que js entienda

fetch("../assets/data/data.json")
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector(".grid-restaurantes");

        data.restaurantes.forEach(restaurant => {
            container.innerHTML += createCard(restaurant);
        })
    })
