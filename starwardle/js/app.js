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

    const inputImagen = document.createElement("input");
    inputImagen.type = "file";
    inputImagen.accept = "image/*";

    const btn = document.createElement("button");
    btn.textContent = "Guardar personaje con imagen";

    btn.addEventListener("click", () => {
      guardarPersonaje(personaje, inputImagen.files[0]);
    });

    card.appendChild(inputImagen);
    card.appendChild(btn);

    contenedor.appendChild(card);
  });
}

async function guardarPersonaje(personaje, imagen) {

  const formData = new FormData();

  formData.append("name", personaje.name);
  formData.append("height", personaje.height);
  formData.append("hair_color", personaje.hair_color);
  formData.append("skin_color", personaje.skin_color);
  formData.append("eye_color", personaje.eye_color);
  formData.append("birth_year", personaje.birth_year);
  formData.append("gender", personaje.gender);

  if (imagen) {
    formData.append("arxiu", imagen);
  }

  try {
    const response = await fetch("php/guardar_personaje.php", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    console.log(data);
    alert("Personaje guardado correctamente");
    cargarGuardados();

  } catch (error) {
    console.error("Error:", error);
  }
}

const btnVer = document.getElementById("btnVerGuardados");

btnVer.addEventListener("click", cargarGuardados);

async function cargarGuardados() {

  const response = await fetch("php/listar_personajes.php");
  const data = await response.json();

  const contenedor = document.getElementById("guardados");
  contenedor.innerHTML = "";

  data.forEach(personaje => {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${personaje.name}</h3>
      ${personaje.image ? `<img src="${personaje.image}" width="120">` : ""}
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