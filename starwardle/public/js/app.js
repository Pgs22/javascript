const btn = document.getElementById("btnCargar");

btn.addEventListener("click", () => {
  cargarPersonajes(1);
});

function cargarPersonajes(pagina = 1) {

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `https://swapi.py4e.com/api/people/?page=${pagina}`);

  xhr.responseType = "json";

  xhr.onload = function () {

    if (xhr.status === 200) {

      const data = xhr.response;

      mostrarPersonajes(data.results);
      crearPaginacion(data.count, pagina);

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

    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar personaje";   

    btnGuardar.addEventListener("click", () => {
        guardarPersonaje(personaje);
    });

    card.appendChild(btnGuardar);

    contenedor.appendChild(card);

  });
}

function crearPaginacion(totalPersonajes, paginaActual) {

  const contenedor = document.getElementById("paginacion");
  contenedor.innerHTML = "";

  const totalPaginas = Math.ceil(totalPersonajes / 10);

  for (let i = 1; i <= totalPaginas; i++) {

    const boton = document.createElement("button");
    boton.textContent = i;

    if (i === paginaActual) {
      boton.disabled = true;
    }

    boton.addEventListener("click", () => {
      cargarPersonajes(i);
    });

    contenedor.appendChild(boton);
  }
}

async function guardarPersonaje(personaje) {
  try {
    const response = await fetch("/persona", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(personaje)
    });

    const data = await response.json();

    console.log(data);
    alert(data.message);

    cargarGuardados();

  } catch (error) {
    console.error("Error:", error);
  }
}

const btnVerGuardados = document.getElementById("btnVerGuardados");

btnVerGuardados.addEventListener("click", cargarGuardados);

async function cargarGuardados() {
  const response = await fetch("/personajes");
  const data = await response.json();

  const contenedor = document.getElementById("guardados");
  contenedor.innerHTML = "";

  data.forEach(personaje => {
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