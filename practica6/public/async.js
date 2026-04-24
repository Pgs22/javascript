// Utilitza l’API de Star Wars https://swapi.dev/documentation o https://swapi.py4e.com per:
// -mostrar la informació dels diferents personatges de Star Wars
// - omplir en un servidor Node un JSON amb la informació dels personatges juntament amb una imatge.
// - desenvolupar un “starwardle” per intentar endevinar un personatge.
// OBTENIR PERSONES I OMPLIR LA INFORMACIÓ EN EL SERVIDOR
// 1.4p] Utilitza XMLHttpRequest per mostrar informació de personatges:
    // 1. Mostrar ben estructurada la informació dels primers 10 personatges.
    // 2. Pots utilitzar la consulta: https://swapi.dev/api/people/?page=1
    // 3. Mostrar de cada personatge el nom, altura, cabell, pell, ulls, naixement i gènere.
    // 4. A partir del número total de personatges, i sabent que l’API mostra 10 personatges per resultat, implementa un sistema de paginació que permeti accedir a la informació de tots els personatges de 10 en 10 .
    // 5. En qualsevol moment, permet tornar a veure tot el llistat de personatges

const btn = document.getElementById("btnCargar");

btn.addEventListener("click", () => {
  cargarPersonatges(1);
});

function cargarPersonatges(pagina) {

  const xhr = new XMLHttpRequest();
  const url = `https://swapi.py4e.com/api/people/?page=${pagina}`;

  xhr.open("GET", url);

  xhr.responseType = "json";

  xhr.onload = function () {

    if (xhr.status === 200) {

      const data = xhr.response;
      console.log(data);

      mostrarPersonatges(data.results);
      crearPaginacio(data.count);

    }

  };

  xhr.send();
}

function mostrarPersonatges(lista) {

  const contenedor = document.getElementById("personatges");

  contenedor.innerHTML = "";

  lista.forEach(personatge => {

    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${personatge.name}</h3>
      <p>Altura: ${personatge.height}</p>
      <p>Cabello: ${personatge.hair_color}</p>
      <p>Piel: ${personatge.skin_color}</p>
      <p>Ojos: ${personatge.eye_color}</p>
      <p>Nacimiento: ${personatge.birth_year}</p>
      <p>Género: ${personatge.gender}</p>
      <hr>
    `;

    contenedor.appendChild(div);

  });
}