
fetch("../assets/data/data.json")
    .then(response => response.json())
    .then(data => {
        data.restaurantes.forEach(restaurant => {
            restaurant.nombre
            restaurant.tipo
            restaurant.valoracion
        })
    })

function createHomeCard(name, type, valoration){
    // escribir codigo html en js para inyectarlo
    let nombre = "Goiko";
    let tipo = "Hamburgueseróa";


}