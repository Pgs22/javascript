
import { Musica } from "./Musica.js";
import { LlistaMusiques } from "./LlistaMusiques.js";

// Parte 2  - Reproductor d’àudio millorad
// Reproductor.html
// 4. Reproductor.html ha de tenir un formulari per crear nous objectes Musica:
// a. El formulari ha de permetre indicar:
    // i. Títol (Mínim 2 caracters max 20)
    // ii. Nom del fitxer (select amb els noms dels arxius disponibles)
    // iii. Etiquetes (checkbox)


const mapLlistes = new Map();
const llista_inicial = new LlistaMusiques("Disponibles", ["tots"], [
    new Musica("Drum Beat", "DRUMC0.WAV", ["percusio"], "audio/wav"),
    new Musica("Fanfare", "FANFARE1.WAV", ["efectes"], "audio/wav"),
    new Musica("Ek Raat Vilen", "ek_raat_vilen.mp3", ["pop"], "audio/mpeg")
]);
mapLlistes.set(llista_inicial.titol, llista_inicial);

function crearMusica() {
    const f = document.forms["form_musica"];
    const titol = f["titol"].value;
    const fitxer = f["fitxer"].value;
    const checkboxes = f.querySelectorAll('input[name="etiqueta"]:checked');
    const btn = document.getElementById("btn_valida_musica");

    let formOk = true;

    const spanTitol = f["titol"].nextElementSibling;
    if (titol.length >= 2 && titol.length <= 20) {
        spanTitol.innerText = " OK";
        spanTitol.style.color = "green";
    } else {
        spanTitol.innerText = " Error: 2-20 caràcters";
        spanTitol.style.color = "red";
        formOk = false;
    }

    const spanFitxer = f["fitxer"].nextElementSibling;
    const extValidas = [".mp3", ".wav", ".ogg"];
    const esValido = extValidas.some(ext => fitxer.toLowerCase().endsWith(ext));

    if (esValido) {
        spanFitxer.innerText = " OK";
        spanFitxer.style.color = "green";
    } else {
        spanFitxer.innerText = " Error: Extensió no vàlida";
        spanFitxer.style.color = "red";
        formOk = false;
    }

    const spanEtiquetes = document.getElementById("error_etiquetes");
    if (checkboxes.length >= 1) {
        spanEtiquetes.innerText = " OK";
        spanEtiquetes.style.color = "green";
    } else {
        spanEtiquetes.innerText = " Tria al menys una";
        spanEtiquetes.style.color = "red";
        formOk = false;
    }

    btn.disabled = !formOk;

    if (formOk) {
        const tags = Array.from(checkboxes).map(cb => cb.value);
        const novaMusica = new Musica(titol, fitxer, tags, "audio/mpeg");

        mapLlistes.get("Disponibles").llistat_musiques.push(novaMusica);

        f.reset();
        alert("Música '" + titol + "' afegida a Disponibles!");
        
        actualitzaLlistaMusiques();
    }
}

/**
 * Pintar i actualitzar llistes desde el MAP
 */
function actualitzaLlistaMusiques(filtre = "") {
    const contenedor = document.getElementById("div_llista_musiques");
    contenedor.innerHTML = "";

    mapLlistes.forEach((llista) => {
        if (filtre !== "" && !llista.etiquetes.includes(filtre)) return;

        const divLlista = pintaLlistaIndividual(llista, filtre);
        contenedor.appendChild(divLlista);
    });

    actualitzaSelectorFiltre();
}

function pintaLlistaIndividual(llista, filtre) {
    const divLista = document.createElement("div");
    divLista.style.border = "2px solid #ccc";
    divLista.style.padding = "15px";
    divLista.style.margin = "10px 0";
    divLista.style.borderRadius = "8px";

    // Mostrar musiques
    divLista.innerHTML = llista.generaCodiHTML();

    /**
     * Per afegir MUSICA a cada llista mostrem el select per  llista (Per tindre a mà les cançons a afegir)
     */
    const label = document.createElement("label");
    label.innerText = "Tria cançó: ";
    
    const selectLocal = document.createElement("select");
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
    btnAfegir.innerText = "Afegir";
    btnAfegir.onclick = () => {
        const musicaSeleccionada = mapLlistes.get("Disponibles").llistat_musiques[selectLocal.value];
        
        llista.llistat_musiques.push(musicaSeleccionada);
        actualitzaLlistaMusiques(filtre);
    };

    // 3. Botón "Afegir Tag"
    const btnTag = document.createElement("button");
    btnTag.innerText = "Tag";
    btnTag.style.marginLeft = "10px";
    btnTag.onclick = () => {
        const nueva = prompt("Nova etiqueta:");
        if(nueva) {
            llista.etiquetes.push(nueva);
            actualitzaLlistaMusiques(filtre);
        }
    };

    // Montatge contenidor de cançons   
    const divAccions = document.createElement("div");
    divAccions.style.marginTop = "10px";
    divAccions.appendChild(label);
    divAccions.appendChild(selectLocal);
    divAccions.appendChild(btnAfegir);
    divAccions.appendChild(btnTag);

    divLista.appendChild(divAccions);
    return divLista;
}

/**
 * Función pel SELECT del filtre amb etiquetes úniques
 */
function actualitzaSelectorFiltre() {
    const selectFiltre = document.getElementById("select_filtre");
    const etiquetasUnicas = [];
    
    mapLlistes.forEach(llista => {
        llista.etiquetes.forEach(tag => {
            if (!etiquetasUnicas.includes(tag)) {
                etiquetasUnicas.push(tag);
            }
        });
    });

    selectFiltre.innerHTML = '<option value="">-- Totes les etiquetes --</option>';
    etiquetasUnicas.forEach(tag => {
        const opt = document.createElement("option");
        opt.value = tag;
        opt.text = tag;
        selectFiltre.appendChild(opt);
    });
}

window.onload = () => {
    const btnMusica = document.getElementById("btn_valida_musica");
    if(btnMusica) {
        btnMusica.onclick = crearMusica;
    }

    // Escuchar los botones de filtro (que ya tenías en el HTML)
    document.getElementById("btn_netejar_filtre").onclick = function() {
        document.getElementById("select_filtre").value = "";
        actualitzaLlistaMusiques();
    };

    document.getElementById("btn_crear_llista").onclick = () => {
    const inputNom = document.getElementById("input_nomLlista");
    const nom = inputNom.value;
    
    if(nom && !mapLlistes.has(nom)) {
        // Creamos la lista y la guardamos en el MAP
        const nova = new LlistaMusiques(nom, ["tots"], []);
        mapLlistes.set(nom, nova);
        
        inputNom.value = ""; // Limpiar
        actualitzaLlistaMusiques(); // Repintar todo
    } else {
        alert("El nom no és vàlid o la llista ja existeix");
    }};

    actualitzaLlistaMusiques();
};

/******************************************************************************************************************************************************************** */

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
