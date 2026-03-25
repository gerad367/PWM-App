
const query = window.location.search;
const urlParams = new URLSearchParams(query);
const restaurantId = urlParams.get("id"); // Esto nos dará "1", "2", etc.


fetch("../assets/data/data.json")
    .then(res => res.json())
    .then(data => {

       const findRestaurant = data.restaurantes.find((restaurant) => restaurant.id == restaurantId);

       if(findRestaurant) {
           createRestaurantDetails(findRestaurant);
       }

       else{
           console.log("Restaurant not found");
       }
    })

function createRestaurantDetails(restaurant) {

    const elementTitle = document.querySelector("#portada h1");
    elementTitle.textContent = restaurant.nombre;

    const elementImage = document.querySelector("#portada img");
    elementImage.src = restaurant.imagen;

    const menuContainer = document.querySelector("#restaurant-menu");

    restaurant.menu.forEach(dish => {

        menuContainer.innerHTML += `
        <article class="menu-element">
            <img src="${dish.foto}" alt="${dish.nombre_plato}">
            <p>${dish.nombre_plato}</p>
        </article>`;
    });

    const scheduleContainer = document.querySelector("#horario table");
    let celdasInyectar = "";

    Object.values(restaurant.horario).forEach((hours) => {
        celdasInyectar += `<td>${hours}</td>`;
    });

    let cabecerasInyectar = "";
    Object.keys(restaurant.horario).forEach((dia) => {
        cabecerasInyectar += `<th>${dia}</th>`;
    });

    scheduleContainer.innerHTML = `
        <tr>
            ${cabecerasInyectar}
        </tr>
        <tr>
            ${celdasInyectar}
        </tr>`;
}

// id, nombre, imagen, horario, menu(nombre plato, foto)