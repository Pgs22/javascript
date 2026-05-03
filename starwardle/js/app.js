const btn = document.getElementById("btnCargar");
btn.addEventListener("click", () => {
  cargarPersonajes();
});


async function cargarPersonajes() {
// usamos await para esperar la respuesta de la API antes de continuar con el código
  try {
    const response = await fetch("https://swapi.py4e.com/api/people/?page=1");
    const data = await response.json();

    console.log(data);

    mostrarPersonajes(data.results);

  } catch (error) {
    console.error("Error:", error);
  }

}

function mostrarPersonajes(lista) {

  const contenedor = document.getElementById("personajes");
  contenedor.innerHTML = "";
  lista.forEach(personaje => {

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${personaje.name}</h3>
      <p>Altura: ${personaje.height}</p>
      <p>Cabello: ${personaje.hair_color}</p>
      <p>Piel: ${personaje.skin_color}</p>
      <p>Ojos: ${personaje.eye_color}</p>
      <p>Nacimiento: ${personaje.birth_year}</p>
      <p>Género: ${personaje.gender}</p>
    `;

    contenedor.appendChild(card);

  });
}