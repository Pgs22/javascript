
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

    // Validación Título (2-20)
    const spanTitol = f["titol"].nextElementSibling;
    if (titol.length >= 2 && titol.length <= 20) {
        spanTitol.innerText = " OK";
        spanTitol.style.color = "green";
    } else {
        spanTitol.innerText = " Error: 2-20 caràcters";
        spanTitol.style.color = "red";
        formOk = false;
    }

    // Validación Archivo (Extensión)
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

    // Validación Etiquetas (Mínimo 1)
    const spanEtiquetes = document.getElementById("error_etiquetes");
    if (checkboxes.length >= 1) {
        spanEtiquetes.innerText = " OK";
        spanEtiquetes.style.color = "green";
    } else {
        spanEtiquetes.innerText = " Tria al menys una";
        spanEtiquetes.style.color = "red";
        formOk = false;
    }

    // Feedback: Bloquear botón si está mal
    btn.disabled = !formOk;

    if (formOk) {
        // 1. Extraer etiquetas en un array
        const tags = Array.from(checkboxes).map(cb => cb.value);
        
        // 2. Crear objeto Musica
        const novaMusica = new Musica(titol, fitxer, tags, "audio/mpeg");

        // 3. Añadir a la lista "Disponibles" que está en el Map
        mapLlistes.get("Disponibles").llistat_musiques.push(novaMusica);

        f.reset();
        alert("Música '" + titol + "' afegida a Disponibles!");
        
        // 4. Actualizar la vista
        actualitzaLlistaMusiques();
    }
}

/**
 * ADAPTACIÓN: Pintar las listas desde el MAP
 */
function actualitzaLlistaMusiques(filtre = "") {
    const contenedor = document.getElementById("div_llista_musiques");
    contenedor.innerHTML = "";

    // Como ahora es un Map, lo recorremos así:
    mapLlistes.forEach((llista) => {
        // Filtro (si existe)
        if (filtre !== "" && !llista.etiquetes.includes(filtre)) return;

        // Reutilizamos tu función pintaLlistaIndividual
        const divLlista = pintaLlistaIndividual(llista, filtre);
        contenedor.appendChild(divLlista);
    });

    actualitzaSelectorFiltre();
}

// ... (Aquí irían tus funciones pintaLlistaIndividual y actualitzaSelectorFiltre)

/**
 * Afegim el codi HTML quan es crea una llista
 */
function pintaLlistaIndividual(llista, filtre) {
    const divLista = document.createElement("div");
    divLista.style.border = "2px solid #ccc";
    divLista.style.padding = "15px";
    divLista.style.margin = "10px 0";
    divLista.style.borderRadius = "8px";

    // Mostrar musiques amb els stils de la llista individual
    divLista.innerHTML = llista.generaCodiHTML();

    /**
     * Per afegir MUSICA a cada llista mostrem el select per  llista (Per tindre a mà les cançons a afegir)
     */
    const label = document.createElement("label");
    label.innerText = "Tria cançó: ";
    
    const selectLocal = document.createElement("select");
    llista_inicial.llistat_musiques.forEach((musica, i) => {
        const opt = document.createElement("option");
        opt.value = i;
        opt.text = musica.titol;
        selectLocal.appendChild(opt);
    });

    const btnAfegir = document.createElement("button");
    btnAfegir.innerText = "Afegir";
    btnAfegir.onclick = () => {
        llista.llistat_musiques.push(llista_inicial.llistat_musiques[selectLocal.value]);
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
    return divLista; // Per pintar totalment la llista
}

/**
 * Función pel SELECT del filtre amb etiquetes úniques
 */
function actualitzaSelectorFiltre() {
    const selectFiltre = document.getElementById("select_filtre");
    const etiquetasUnicas = [];
    //Per entrar en cada llista i subllista
    llistat_disponibles.forEach(llista => {
        llista.etiquetes.forEach(tag => {
            if (etiquetasUnicas.indexOf(tag) === -1) {
                etiquetasUnicas.push(tag);
            }
        });
    });

    // Implementem les dades al SELECT
    selectFiltre.innerHTML = '<option value="">-- Totes les etiquetes --</option>';
    
    etiquetasUnicas.forEach(tag => {
        const opt = document.createElement("option");
        opt.value = tag;
        opt.text = tag;
        selectFiltre.appendChild(opt);
    });
}

// Solo asegúrate de que pintaLlistaIndividual use 'mapLlistes.get("Disponibles")'
// para llenar su select de canciones.

window.onload = () => {
    document.getElementById("btn_valida_musica").onclick = crearMusica;
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












/******************************************************************************** */

/**
 * Crear llista nova
 */
document.getElementById("btn_crear_llista").onclick = () => {
    const nom = document.getElementById("input_nomLlista").value;
    if(nom) {
        llistat_disponibles.push(new LlistaMusiques(nom, ["tots"], []));
        document.getElementById("input_nomLlista").value = "";
        actualitzaLlistaMusiques();
    }
};



/**
 * Etiquetes i llistes
 * Selecció de música per llista individual, permet afegir cançons a cada llista per tindre a mà el selector
 * @param {*} filtre pot estar vuit per netetjar filtre o omplir amb el nom per filtrar les llistes
 */  
function actualitzaLlistaMusiques(filtre = "") {
    const contenedorPrincipal = document.getElementById("div_llista_musiques");

    actualitzaSelectorFiltre();

    contenedorPrincipal.innerHTML = ""; // Neteja el contenidor

    // Actualizar el selector de filtres
    llistat_disponibles.forEach((llista) => {
        if (filtre !== "" && !llista.etiquetes.includes(filtre)) return;

        // Mostra resultats
        const elementoLlista = pintaLlistaIndividual(llista, filtre);
        contenedorPrincipal.appendChild(elementoLlista);
    });
}



// Filtrar al canviar el selector
document.getElementById("select_filtre").onchange = function() {
    actualitzaLlistaMusiques(this.value);
};

// Netejar filtre i actualitzar llista
document.getElementById("btn_netejar_filtre").onclick = function() {
    document.getElementById("select_filtre").value = "";
    actualitzaLlistaMusiques();
};

//Per mostrar la llista inicial
actualitzaLlistaMusiques();



