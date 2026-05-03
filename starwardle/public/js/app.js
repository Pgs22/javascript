const btn = document.getElementById("btnCargar");

btn.addEventListener("click", () => {
  cargarPersonajes();
});

function cargarPersonajes() {

  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://swapi.py4e.com/api/people/?page=1");
  xhr.responseType = "json";
  xhr.onload = function () {

    if (xhr.status === 200) {
      const data = xhr.response;
      console.log(data);
      mostrarPersonajes(data.results);

    } else {
      console.error("Error en la petición");
    }

  };

  xhr.onerror = function () {
    console.error("Error de red");
  };

  xhr.send();
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