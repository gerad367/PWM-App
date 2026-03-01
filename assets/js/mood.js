imagen = document.getElementById("mood-image");
textos = document.getElementById("mood-texts").children;
console.log();

const query = window.location.search;
mood = new URLSearchParams(query).get("mood");

if (mood === "romantico") {
    imagen.src = "../assets/images/emoji_romantico1.png";
    textos[0].innerHTML = "Romántico";
    textos[1].innerHTML = "Una noche especial";
    textos[2].innerHTML = "Ambientes íntimos y cenas para recordar";
} else if (mood === "triste") {
    imagen.src = "../assets/images/emoji_triste1.png";
    textos[0].innerHTML = "Triste";
    textos[1].innerHTML = "Comfort para el alma";
    textos[2].innerHTML = "Rincones cálidos con comida que reconforta";
} else if (mood === "feliz") {
    imagen.src = "../assets/images/emoji_feliz1.png";
    textos[0].innerHTML = "Feliz";
    textos[1].innerHTML = "Celebra tu alegría";
    textos[2].innerHTML = "Lugares vibrantes y llenos de energía positiva";
} else if (mood === "energetico") {
    imagen.src = "../assets/images/emoji_energetico1.png";
    textos[0].innerHTML = "Energético";
    textos[1].innerHTML = "Potencia máxima";
    textos[2].innerHTML = "Sabores intensos que despiertan todos tus sentidos";
}