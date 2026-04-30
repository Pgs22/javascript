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
const btnTodo = document.getElementById("btnTodo");
const contenedor = document.getElementById("personatges");
const paginacio = document.getElementById("paginacio");
const detalle = document.getElementById("detalle");
const form = document.getElementById("personaForm");
const serverMsg = document.getElementById("serverMsg");
const btnGuardarLlistat = document.getElementById("btnGuardarLlistat");
const saveListMsg = document.getElementById("saveListMsg");
const btnStartStarwardle = document.getElementById("btnStartStarwardle");
const guessInput = document.getElementById("guessInput");
const btnCheck = document.getElementById("btnCheck");
const suggestions = document.getElementById("suggestions");
const starwardleStatus = document.getElementById("starwardleStatus");
const starwardleResult = document.getElementById("starwardleResult");

const API_SW_PRIMARY = "https://swapi.dev/api/people/";
const API_SW_FALLBACK = "https://swapi.py4e.com/api/people/";
let apiBase = API_SW_PRIMARY;
const SERVER_BASE = "http://localhost:8089";
let totalPages = 0;
let currentList = [];

btn.addEventListener("click", () => {
  cargarPersonatges(1);
});

btnTodo.addEventListener("click", () => {
  cargarTodos();
});

btnGuardarLlistat.addEventListener("click", async () => {
  if (!currentList.length) {
    saveListMsg.textContent = "Carrega una pagina de personatges abans de guardar.";
    return;
  }
  btnGuardarLlistat.disabled = true;
  saveListMsg.textContent = "Guardant personatges al servidor...";
  let ok = 0;
  let fail = 0;

  for (const personatge of currentList) {
    try {
      const res = await fetch(`${SERVER_BASE}/persona/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: personatge.name,
          height: personatge.height,
          hair_color: personatge.hair_color,
          skin_color: personatge.skin_color,
          eye_color: personatge.eye_color,
          birth_year: personatge.birth_year,
          gender: personatge.gender
        })
      });
      if (res.ok) {
        ok += 1;
      } else {
        fail += 1;
      }
    } catch (err) {
      fail += 1;
    }
  }

  saveListMsg.textContent = `Guardats: ${ok}, errors: ${fail}`;
  btnGuardarLlistat.disabled = false;
});

btnStartStarwardle.addEventListener("click", async () => {
  starwardleStatus.textContent = "Iniciant...";
  starwardleResult.innerHTML = "";
  try {
    const res = await fetch(`${SERVER_BASE}/starwardle/start`, {
      method: "POST"
    });
    const data = await res.json();
    if (!res.ok) {
      starwardleStatus.textContent = data.error || "No s'ha pogut iniciar.";
      return;
    }
    starwardleStatus.textContent = data.message;
  } catch (err) {
    starwardleStatus.textContent = "Error de connexio amb el servidor.";
  }
});

guessInput.addEventListener("input", async () => {
  const value = guessInput.value.trim();
  suggestions.innerHTML = "";
  if (!value) {
    return;
  }
  try {
    const res = await fetch(`${SERVER_BASE}/starwardle/search?query=${encodeURIComponent(value)}`);
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    data.results.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      li.addEventListener("click", () => {
        guessInput.value = name;
        suggestions.innerHTML = "";
      });
      suggestions.appendChild(li);
    });
  } catch (err) {
    // ignore
  }
});

btnCheck.addEventListener("click", async () => {
  const name = guessInput.value.trim();
  if (!name) {
    starwardleResult.textContent = "Escriu un nom primer.";
    return;
  }
  starwardleResult.textContent = "Comprovant...";
  try {
    const res = await fetch(`${SERVER_BASE}/starwardle/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });
    const data = await res.json();
    if (!res.ok) {
      starwardleResult.textContent = data.error || "No s'ha pogut comprovar.";
      return;
    }
    renderStarwardleResult(data);
  } catch (err) {
    starwardleResult.textContent = "Error de connexio amb el servidor.";
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  serverMsg.textContent = "Guardant...";
  try {
    const formData = new FormData(form);
    const res = await fetch(`${SERVER_BASE}/persona/`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    if (!res.ok) {
      serverMsg.textContent = data.error || "Error guardant la persona.";
      return;
    }
    serverMsg.textContent = data.message;
  } catch (err) {
    serverMsg.textContent = "Error de connexio amb el servidor.";
  }
});

function xhrGet(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "json";
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error("Resposta incorrecta"));
      }
    };
    xhr.onerror = function () {
      reject(new Error("Error de xarxa"));
    };
    xhr.send();
  });
}

async function getPeoplePage(page) {
  try {
    return await xhrGet(`${apiBase}?page=${page}`);
  } catch (err) {
    if (apiBase === API_SW_PRIMARY) {
      apiBase = API_SW_FALLBACK;
      return xhrGet(`${apiBase}?page=${page}`);
    }
    throw err;
  }
}

function cargarPersonatges(pagina) {
  getPeoplePage(pagina)
    .then((data) => {
      mostrarPersonatges(data.results);
      crearPaginacio(data.count, pagina);
      saveListMsg.textContent = "";
    })
    .catch(() => {
      contenedor.textContent = "No s'han pogut carregar els personatges.";
    });
}

async function cargarTodos() {
  contenedor.textContent = "Carregant tot el llistat...";
  try {
    const firstPage = await getPeoplePage(1);
    const all = [...firstPage.results];
    totalPages = Math.ceil(firstPage.count / 10);
    for (let p = 2; p <= totalPages; p += 1) {
      const pageData = await getPeoplePage(p);
      all.push(...pageData.results);
    }
    mostrarPersonatges(all);
    crearPaginacio(firstPage.count, 1);
    saveListMsg.textContent = "";
  } catch (err) {
    contenedor.textContent = "No s'han pogut carregar tots els personatges.";
  }
}

function crearPaginacio(total, paginaActiva) {
  totalPages = Math.ceil(total / 10);
  paginacio.innerHTML = "";

  for (let i = 1; i <= totalPages; i += 1) {
    const btnPage = document.createElement("button");
    btnPage.textContent = i;
    if (i === paginaActiva) {
      btnPage.disabled = true;
    }
    btnPage.addEventListener("click", () => cargarPersonatges(i));
    paginacio.appendChild(btnPage);
  }
}

function mostrarPersonatges(lista) {
  contenedor.innerHTML = "";
  currentList = Array.isArray(lista) ? [...lista] : [];

  lista.forEach((personatge) => {
    const div = document.createElement("div");
    div.className = "card";
    div.dataset.name = personatge.name;
    div.innerHTML = `
      <h3>${personatge.name}</h3>
      <p>Altura: ${personatge.height}</p>
      <p>Cabell: ${personatge.hair_color}</p>
      <p>Pell: ${personatge.skin_color}</p>
      <p>Ulls: ${personatge.eye_color}</p>
      <p>Naixement: ${personatge.birth_year}</p>
      <p>Genere: ${personatge.gender}</p>
    `;

    div.addEventListener("click", () => {
      carregarDetallServidor(personatge.name);
    });

    contenedor.appendChild(div);
  });
}

async function carregarDetallServidor(nom) {
  detalle.textContent = "Carregant...";
  try {
    const res = await fetch(`${SERVER_BASE}/persona/${encodeURIComponent(nom)}`);
    const data = await res.json();
    if (!res.ok) {
      detalle.textContent = data.error || "Persona no trobada.";
      return;
    }
    detalle.innerHTML = `
      <p><strong>Nom:</strong> ${data.name || ""}</p>
      <p><strong>Altura:</strong> ${data.height || ""}</p>
      <p><strong>Cabell:</strong> ${data.hair_color || ""}</p>
      <p><strong>Pell:</strong> ${data.skin_color || ""}</p>
      <p><strong>Ulls:</strong> ${data.eye_color || ""}</p>
      <p><strong>Naixement:</strong> ${data.birth_year || ""}</p>
      <p><strong>Genere:</strong> ${data.gender || ""}</p>
      ${data.imageUrl ? `<img src="${SERVER_BASE}${data.imageUrl}" alt="${data.name}" width="120" />` : ""}
    `;
  } catch (err) {
    detalle.textContent = "Error de connexio amb el servidor.";
  }
}

function renderStarwardleResult(data) {
  const rows = data.comparisons
    .map((item) => {
      const cls = item.match ? "match-true" : "match-false";
      return `
        <div class="${cls}">${item.field}: ${item.guess}</div>
      `;
    })
    .join("");

  const header = data.correct ? "Correcte! Has encertat." : "Torna-ho a intentar";
  starwardleResult.innerHTML = `
    <div>${header}</div>
    ${rows}
  `;
}