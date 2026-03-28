
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


    const menuTabsContainer = document.querySelector("#menu-tabs");
    const restaurantMenuContainer = document.querySelector("#restaurant-menu");


/* ENTENDERLO */

// 1. Sacar las categorías únicas del JSON
    const categoriasUnicas = [];
    restaurant.menu.forEach(plato => {
        // Si la lista NO incluye esta sección, la añadimos
        if (!categoriasUnicas.includes(plato.seccion)) {
            categoriasUnicas.push(plato.seccion);
        }
    });

// 2. Pintar los botones de las pestañas
    menuTabsContainer.innerHTML = ""; // Vaciamos por si acaso
    categoriasUnicas.forEach((categoria, index) => {
        // Al primer botón (index 0) le ponemos la clase "activo" para que salga pintado
        const claseActivo = index === 0 ? "activo" : "";

        // El data-category es un truco para guardar el nombre de la categoría oculto en el HTML
        menuTabsContainer.innerHTML += `
        <button class="tab-btn ${claseActivo}" data-category="${categoria}">
            ${categoria}
        </button>
    `;
    });


    // 3. Mini-función para filtrar y pintar los platos
    function pintarPlatosPorCategoria(categoriaSeleccionada) {
        restaurantMenuContainer.innerHTML = ""; // Vaciamos los platos anteriores

        // Filtramos el menú para quedarnos solo con los de esta categoría
        const platosFiltrados = restaurant.menu.filter(plato => plato.seccion === categoriaSeleccionada);

        // Pintamos los platos filtrados
        platosFiltrados.forEach(plato => {
            const rutaImagen = plato.foto !== "" ? `../${plato.foto}` : "../assets/images/menu-item-placeholder.png";

            restaurantMenuContainer.innerHTML += `
            <article class="menu-element">
                <img src="${rutaImagen}" alt="${plato.nombre_plato}">
                <p>${plato.nombre_plato}</p>
            </article>
        `;
        });
    }

// 4. Arrancar la página pintando la primera categoría por defecto
    if (categoriasUnicas.length > 0) {
        pintarPlatosPorCategoria(categoriasUnicas[0]);
    }


    // 5. Darle vida a los clics de las pestañas
    const botonesTabs = document.querySelectorAll(".tab-btn");

    botonesTabs.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            // A. Quitar la clase "activo" a todos los botones
            botonesTabs.forEach(btn => btn.classList.remove("activo"));

            // B. Ponerle la clase "activo" solo al botón que hemos clicado
            const botonClicado = evento.target;
            botonClicado.classList.add("activo");

            // C. Leer qué categoría es y llamar a nuestra mini-función para repintar el deslizable
            const categoriaElegida = botonClicado.getAttribute("data-category");
            pintarPlatosPorCategoria(categoriaElegida);
        });
    });
}
