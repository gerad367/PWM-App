
fetch("../assets/data/data.json")
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector(".grid-restaurantes");

        // Hacemos un bucle por todos los restaurantes
        data.restaurantes.forEach(restaurant => {
            container.innerHTML += createCard(restaurant);
        });
    });