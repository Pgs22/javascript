// Parte 2  - Reproductor d’àudio millorad
// Reproductor.html
// 4. Reproductor.html ha de tenir un formulari per crear nous objectes Musica:
// a. El formulari ha de permetre indicar:
    // i. Títol (Mínim 2 caracters max 20)
    // ii. Nom del fitxer (select amb els noms dels arxius disponibles)
    // iii. Etiquetes (checkbox)
// b.// Implementa les següents validacions amb JS:
    // i. Títol entre 2 i 20 caràcters
    // ii. Nom del fitxer amb extensió vàlida (mp3, ogg, wav)
    // iii. Com a mínim una etiqueta seleccionada
// c. Implementa el següent feed-back
    // i. Un cop omplert un input correctament mostra un missatge d’OK
    // ii. Un cop omplert un input incorrectament:
        // 1.// Desactiva el botó d’enviar
        // 2.// Mostra informació explicativa de l’error
// d. Si tot és correcte, crea l’objecte Musica i:
    // i. Afegeix-    lo a LlistaMusiques “disponible”
    // ii. Neteja el formulari
// 5. Guarda les diferents LlistaMusiques utilitzant un Map amb la següent estructura:
    // a. Clau: títol de la llista
    // b. Valor: objecte LlistaMusiques
// 6. Reproductor.html ha de tenir un formulari per crear noves LlistaMusiques:
// a. El formulari ha de permetre indicar:
    // i. Títol
    // ii. Etiquetes (checkbox)
    // iii. Músiques (select múltiple)
// b. Implementa les següents validacions amb JS:
    // i. Títol entre 2 i 10 caràcters
    // ii. Com a mínim una etiqueta
    // iii. Com a mínim dues cançons  
// c. Implementa el següent feed-back
    // i. Mostra en tot moment un missatge indicant si el títol és correcte o incorrecte (en cas que sigui incorrecte digues el format que ha de tenir)
    // ii. Deixa que l’usuari cliqui el botó per afegir la llista sempre, però no l’afegeixis si hi ha algun error
    // iii. Mostra missatges d’errors explicatius


import { Musica } from "./Musica.js";
import { LlistaMusiques } from "./LlistaMusiques.js";

/**
 * 5. Guarda les diferents LlistaMusiques utilitzant un Map:
 * a. Clau: títol de la llista | b. Valor: objecte LlistaMusiques
 */
export const mapLlistes = new Map();

// Inicialització de la llista per defecte
const llista_inicial = new LlistaMusiques("Disponibles", ["tots"], [
    new Musica("Drum Beat", "DRUMC0.WAV", ["percusio"], "audio/wav"),
    new Musica("Fanfare", "FANFARE1.WAV", ["efectes"], "audio/wav"),
    new Musica("Ek Raat Vilen", "ek_raat_vilen.mp3", ["pop"], "audio/mpeg")
]);
mapLlistes.set(llista_inicial.titol, llista_inicial);

/**
 * 4. Formulari per crear nous objectes Musica
 */
function crearMusica(guardar = false) {
    const f = document.forms["form_musica"];
    const titol = f["titol"].value.trim();
    const fitxer = f["fitxer"].value;
    const checkboxes = f.querySelectorAll('input[name="etiqueta"]:checked');
    const tags = Array.from(checkboxes).map(cb => cb.value);
    const btnEnviar = document.getElementById("btn_valida_musica");

    let formOk = true;

    // b.i / c.i. Validació Títol (2-20 caràcters) i feedback
    const spanTitol = f["titol"].nextElementSibling;
    if (titol.length >= 2 && titol.length <= 20) {
        spanTitol.innerText = " OK";
        spanTitol.className = "text-success fw-bold ms-2";
    } else {
        spanTitol.innerText = " Error: ha de tenir entre 2 i 20 caràcters";
        spanTitol.className = "text-danger fw-bold ms-2";
        formOk = false;
    }

    // b.ii / c.ii. Validació Extensió fitxer (mp3, ogg, wav)
    const spanFitxer = f["fitxer"].nextElementSibling;
    const extValidas = [".mp3", ".wav", ".ogg"];
    const esValido = extValidas.some(ext => fitxer.toLowerCase().endsWith(ext));

    if (esValido) {
        spanFitxer.innerText = " OK";
        spanFitxer.className = "text-success fw-bold ms-2";
    } else {
        spanFitxer.innerText = " Error: Tria un fitxer vàlid (.mp3, .wav, .ogg)";
        spanFitxer.className = "text-danger fw-bold ms-2";
        formOk = false;
    }

    // b.iii. Com a mínim una etiqueta seleccionada
    const spanEtiquetes = document.getElementById("error_etiquetes");
    if (checkboxes.length >= 1) {
        spanEtiquetes.innerText = " OK";
        spanEtiquetes.className = "text-success fw-bold ms-2";
    } else {
        spanEtiquetes.innerText = " Error: Tria al menys una etiqueta";
        spanEtiquetes.className = "text-danger fw-bold ms-2";
        formOk = false;
    }

    // c.ii.1. Desactiva el botó d’enviar si hi ha errors
    btnEnviar.disabled = !formOk;

    // d. Si tot és correcte, crea l’objecte Musica
    if (formOk && guardar === true) {
        const novaMusica = new Musica(titol, fitxer, tags);
        
        // d.i. Afegeix-lo a LlistaMusiques “disponible”
        const disponibles = mapLlistes.get("Disponibles");
        if (disponibles) {
            disponibles.llistat_musiques.push(novaMusica);
            
            actualitzaLlistaMusiques();

            // d.ii. Neteja el formulari
            f.reset();
            spanTitol.innerText = "";
            spanFitxer.innerText = "";
            spanEtiquetes.innerText = "";
            btnEnviar.disabled = true;

            alert("Música '" + titol + "' creada correctament!");
        } else {
            console.error("No s'ha trobat la llista 'Disponibles' al Map.");
        }
    }
}

/**
 * Funció per pintar les llistes des del Map al contenidor HTML
 */
function actualitzaLlistaMusiques(filtre = "") {
    const contenedor = document.getElementById("div_llista_musiques");
    const selector = document.getElementById("select_filtre");
    
    if (filtre === "" && selector) selector.value = ""; 
    
    contenedor.innerHTML = "";

    mapLlistes.forEach((llista) => {
        if (filtre !== "" && !llista.etiquetes.includes(filtre)) return;

        const colLlista = pintaLlistaIndividual(llista, filtre);
        contenedor.appendChild(colLlista);
    });

    actualitzaSelectorFiltre();
}

/**
 * Crea l'element visual (Card de Bootstrap) per a cada llista
 */
function pintaLlistaIndividual(llista, filtre) {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 mb-4";
    
    const card = document.createElement("div");
    card.className = "card h-100 p-3 shadow-sm border-start border-primary border-4";

    let htmlEtiquetes = '<div class="mb-2">';
    llista.etiquetes.forEach((tag, index) => {
        htmlEtiquetes += `
            <span class="badge bg-secondary me-1">
                ${tag} 
                <span style="cursor:pointer; margin-left:5px" onclick="eliminarTag('${llista.titol}', ${index})">×</span>
            </span>`;
    });
    htmlEtiquetes += '</div>';

    card.innerHTML = `
        <h2 class="h5 fw-bold">${llista.titol}</h2>
        ${htmlEtiquetes}
        <div class="mt-2">${llista.generaCodiHTML()}</div>
    `;

    const divAccions = document.createElement("div");
    divAccions.className = "mt-3 pt-3 border-top";
    
    const label = document.createElement("label");
    label.className = "form-label small fw-bold text-muted";
    label.innerText = "Tria cançó per afegir:";

    const selectLocal = document.createElement("select");
    selectLocal.className = "form-select form-select-sm mb-2";

    const disponibles = mapLlistes.get("Disponibles");
    if (disponibles) {
        disponibles.llistat_musiques.forEach((musica, i) => {
            const opt = document.createElement("option");
            opt.value = i;
            opt.text = musica.titol;
            selectLocal.appendChild(opt);
        });
    }

    const btnAfegir = document.createElement("button");
    btnAfegir.innerText = "Afegir Cançó";
    btnAfegir.className = "btn btn-sm btn-success w-100 mb-2";
    btnAfegir.onclick = () => {
        const index = selectLocal.value;
        const musicaSeleccionada = mapLlistes.get("Disponibles").llistat_musiques[index];
        llista.llistat_musiques.push(musicaSeleccionada);
        actualitzaLlistaMusiques(filtre);
    };

    const btnTag = document.createElement("button");
    btnTag.innerText = "+ Afegir Etiqueta";
    btnTag.className = "btn btn-sm btn-outline-primary w-100";
    btnTag.onclick = () => {
        const nueva = prompt("Nova etiqueta per a la llista:");
        if(nueva) {
            llista.etiquetes.push(nueva.toLowerCase().trim());
            actualitzaLlistaMusiques(filtre);
        }
    };

    divAccions.appendChild(label);
    divAccions.appendChild(selectLocal);
    divAccions.appendChild(btnAfegir);
    divAccions.appendChild(btnTag);
    card.appendChild(divAccions);
    col.appendChild(card);

    return col;
}

/**
 * Funció global per eliminar tags (Punt 6.a extra)
 */
window.eliminarTag = (nomLlista, index) => {
    const llista = mapLlistes.get(nomLlista);
    if (llista) {
        llista.etiquetes.splice(index, 1);
        actualitzaLlistaMusiques(document.getElementById("select_filtre").value);
    }
};

/**
 * Actualitza el selector de fitres amb tags únics
 */
function actualitzaSelectorFiltre() {
    const selectFiltre = document.getElementById("select_filtre");
    if (!selectFiltre) return;

    const valorActual = selectFiltre.value;
    const etiquetasUnicas = [];
    
    mapLlistes.forEach(llista => {
        llista.etiquetes.forEach(tag => {
            if (!etiquetasUnicas.includes(tag)) etiquetasUnicas.push(tag);
        });
    });

    selectFiltre.innerHTML = '<option value="">-- Totes les etiquetes --</option>';
    etiquetasUnicas.forEach(tag => {
        const opt = document.createElement("option");
        opt.value = tag; opt.text = tag;
        if (tag === valorActual) opt.selected = true;
        selectFiltre.appendChild(opt);
    });
}

/**
 * 6. Gestió de creació de noves LlistaMusiques
 */
window.onload = () => {
    const btnMusica = document.getElementById("btn_valida_musica");
    const formMusica = document.forms["form_musica"];

    if (btnMusica) {
        btnMusica.onclick = () => crearMusica(true);
    }
    if (formMusica) {
        formMusica.oninput = () => crearMusica(false);
    }

    document.getElementById("btn_netejar_filtre").onclick = function() {
        actualitzaLlistaMusiques("");
    };

    document.getElementById("select_filtre").onchange = function() {
        actualitzaLlistaMusiques(this.value);
    };

    /**
     * 6.b. Validacions de nova llista
     */
    document.getElementById("btn_crear_llista").onclick = () => {
        const inputNom = document.getElementById("input_nomLlista");
        const nom = inputNom.value.trim();

        // 6.b.i. Títol entre 2 i 10 caràcters
        // 6.c.ii. Deixa clicar sempre, però valida abans d'afegir
        if(nom.length < 2 || nom.length > 10) {
            // 6.c.iii. Missatge d'error explicatiu
            alert("Error: El títol de la llista ha de tenir entre 2 i 10 caràcters.");
            return;
        }

        if(mapLlistes.has(nom)) {
            alert("Aquesta llista ja existeix!");
            return;
        }

        mapLlistes.set(nom, new LlistaMusiques(nom, [], [])); 
        inputNom.value = "";
        actualitzaLlistaMusiques();
    };

    actualitzaLlistaMusiques();
};