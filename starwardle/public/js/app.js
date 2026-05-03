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

    const inputImagen = document.createElement("input");
    inputImagen.type = "file";
    inputImagen.accept = "image/*";

    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar personaje con imagen";

    btnGuardar.addEventListener("click", () => {
      guardarPersonaje(personaje, inputImagen.files[0]);
    });

    card.appendChild(inputImagen);
    card.appendChild(btnGuardar);

    contenedor.appendChild(card);
  });
}

function convertirImagenBase64(imagen) {
  return new Promise((resolve, reject) => {
    if (!imagen) {
      resolve("");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject("Error al leer la imagen");
    };

    reader.readAsDataURL(imagen);
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

async function guardarPersonaje(personaje, imagen) {
  try {
    const imagenBase64 = await convertirImagenBase64(imagen);

    const personajeEnviar = {
      name: personaje.name,
      height: personaje.height,
      hair_color: personaje.hair_color,
      skin_color: personaje.skin_color,
      eye_color: personaje.eye_color,
      birth_year: personaje.birth_year,
      gender: personaje.gender,
      imageName: imagen ? imagen.name : "",
      imageBase64: imagenBase64
    };

    const response = await fetch("/persona/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(personajeEnviar)
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
    `;

    card.addEventListener("click", () => {
      mostrarDetallePersonaje(personaje.name);
    });

    contenedor.appendChild(card);
  });
}

async function mostrarDetallePersonaje(nombre) {
  try {
    const response = await fetch(`/persona/${encodeURIComponent(nombre)}`);
    const personaje = await response.json();

    const detalle = document.getElementById("detallePersonaje");

    if (personaje.status === "error") {
      detalle.innerHTML = `<p>${personaje.message}</p>`;
      return;
    }

    detalle.innerHTML = `
      <div class="card">
        <h3>${personaje.name}</h3>
        ${personaje.image ? `<img src="${personaje.image}" alt="${personaje.name}">` : ""}
        <p>Altura: ${personaje.height}</p>
        <p>Cabello: ${personaje.hair_color}</p>
        <p>Piel: ${personaje.skin_color}</p>
        <p>Ojos: ${personaje.eye_color}</p>
        <p>Nacimiento: ${personaje.birth_year}</p>
        <p>Género: ${personaje.gender}</p>
      </div>
    `;

  } catch (error) {
    console.error("Error al cargar detalle:", error);
  }
}

const btnIniciarStarwardle = document.getElementById("btnIniciarStarwardle");
const inputStarwardle = document.getElementById("inputStarwardle");
const sugerenciasStarwardle = document.getElementById("sugerenciasStarwardle");
const btnComprobarStarwardle = document.getElementById("btnComprobarStarwardle");
const resultadoStarwardle = document.getElementById("resultadoStarwardle");

btnIniciarStarwardle.addEventListener("click", iniciarStarwardle);
inputStarwardle.addEventListener("input", buscarSugerenciasStarwardle);
btnComprobarStarwardle.addEventListener("click", comprobarStarwardle);

async function iniciarStarwardle() {
  const response = await fetch("/starwardle/iniciar");
  const data = await response.json();

  resultadoStarwardle.innerHTML = `<p>${data.message}</p>`;
}

async function buscarSugerenciasStarwardle() {
  const texto = inputStarwardle.value.trim();

  if (texto === "") {
    sugerenciasStarwardle.innerHTML = "";
    return;
  }

  const response = await fetch(
    `/starwardle/sugerencias?texto=${encodeURIComponent(texto)}`
  );

  const data = await response.json();

  sugerenciasStarwardle.innerHTML = "";

  data.forEach(personaje => {
    const div = document.createElement("div");
    div.classList.add("sugerencia");
    div.textContent = personaje.name;

    div.addEventListener("click", () => {
      inputStarwardle.value = personaje.name;
      sugerenciasStarwardle.innerHTML = "";
    });

    sugerenciasStarwardle.appendChild(div);
  });
}

async function comprobarStarwardle() {
  const nombre = inputStarwardle.value.trim();

  if (nombre === "") {
    alert("Escribe un personaje");
    return;
  }

  const response = await fetch(
    `/starwardle/comprobar?nombre=${encodeURIComponent(nombre)}`
  );

  const data = await response.json();

  if (data.status === "error") {
    resultadoStarwardle.innerHTML = `<p>${data.message}</p>`;
    return;
  }

  if (data.correcto) {
    resultadoStarwardle.innerHTML = `
      <h3>¡Has acertado!</h3>
      <p>El personaje era ${data.intento.name}</p>
      ${data.intento.image ? `<img src="${data.intento.image}" alt="${data.intento.name}">` : ""}
    `;
    return;
  }

  pintarComparacionStarwardle(data.intento, data.comparacion);
}

function pintarComparacionStarwardle(intento, comparacion) {
  resultadoStarwardle.innerHTML = `
    <h3>Resultado</h3>

    <p class="${comparacion.name ? "acierto" : "fallo"}">
      Nombre: ${intento.name}
    </p>

    <p class="${comparacion.height ? "acierto" : "fallo"}">
      Altura: ${intento.height}
    </p>

    <p class="${comparacion.hair_color ? "acierto" : "fallo"}">
      Cabello: ${intento.hair_color}
    </p>

    <p class="${comparacion.skin_color ? "acierto" : "fallo"}">
      Piel: ${intento.skin_color}
    </p>

    <p class="${comparacion.eye_color ? "acierto" : "fallo"}">
      Ojos: ${intento.eye_color}
    </p>

    <p class="${comparacion.birth_year ? "acierto" : "fallo"}">
      Nacimiento: ${intento.birth_year}
    </p>

    <p class="${comparacion.gender ? "acierto" : "fallo"}">
      Género: ${intento.gender}
    </p>
  `;
}