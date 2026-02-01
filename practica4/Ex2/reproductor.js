/**
 * EXERCICI 2 PRACTICA 4
  Reproductor d’àudio millorad

    Reproductor.html 
    2. Millora el reproductor d’àudio creant les classes Musica i Llista músiques. Segueix els següents punts:  
        
        {{ ARXIU musica }} 
        a. Crea una classe Musica

        {{ ARXIU llistaMusiques }} 
        b. Crea una classe  LlistaMusiques 
        
        {{ ARXIU reproductor.html y reproductor.js }}    
        c. Crea un objecte del tipus LlistaMusiques amb: 
            i. Getters i setters: 
                1. Titol: “disponibles” 
                2. Etiquetes “tots” 
                3. Llistat de músiques: ha de contenir la informació de totes les músiques 
                disponibles 
        
        d. Permet mostrar la informació d’un àudio 
        e. Permet que l’usuari pugui reproduir, aturar, posar en pausa i pujar i baixar el volum de  
        qualsevol àudio de l’array. 
        f. Permet que l’usuari pugui crear vàries llistes de músiques  
        g. Permet afegir i treure etiquetes a un àudio 
        h. Permet filtrar els àudios per etiquetes 
        i. Permet crear noves llistes de músiques 
        j. Permet afegir i treure músiques a  les noves llistes de músiques 
        k. Permet afegir i treure etiquetes a una llista de músiques 
        l. Permet filtrar les llistes de músiques per etiquetes
 */

import { Musica } from "./Musica.js";
import { LlistaMusiques } from "./LlistaMusiques.js";

const llistat_disponibles = [];

/**
 * Musiques inicials
 */
const llista_inicial = new LlistaMusiques("Disponibles", ["tots"], [
    new Musica("Drum Beat", "DRUMC0.WAV", ["percusio"], "audio/wav"),
    new Musica("Fanfare", "FANFARE1.WAV", ["efectes"], "audio/wav"),
    new Musica("Ek Raat Vilen", "ek_raat_vilen.mp3", ["pop"], "audio/mpeg")
]);
llistat_disponibles.push(llista_inicial);

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

document.getElementById("btn_filtrar").onclick = () => {
    const filtre = document.getElementById("input_filtre").value;
    actualitzaLlistaMusiques(filtre);
};

document.getElementById("btn_netejar_filtre").onclick = () => {
    document.getElementById("input_filtre").value = "";
    actualitzaLlistaMusiques();
};

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

    // 4. Montaje de la caja de acciones
    const divAccions = document.createElement("div");
    divAccions.style.marginTop = "10px";
    divAccions.appendChild(label);
    divAccions.appendChild(selectLocal);
    divAccions.appendChild(btnAfegir);
    divAccions.appendChild(btnTag);

    divLista.appendChild(divAccions);
    return divLista; // Devolvemos el elemento listo para ser colgado en el DOM
}

/**
 * Etiquetes i llistes
 * Selecció de música per llista individual, permet afegir cançons a cada llista per tindre a mà el selector
 * @param {*} filtre pot estár vuit per netetjar filtre o omplir amb el nom per filtrar les llistes
 */  
function actualitzaLlistaMusiques(filtre = "") {
    const contenedorPrincipal = document.getElementById("div_llista_musiques");
    contenedorPrincipal.innerHTML = ""; // Limpiar pantalla

    // Actualizar el selector de filtros (si lo usas como select)
    if(typeof actualitzaSelectorFiltre === "function") actualitzaSelectorFiltre();

    llistat_disponibles.forEach((llista) => {
        // ¿Pasa el filtro?
        if (filtre && !llista.etiquetes.includes(filtre)) {
            return; 
        }

        // Llamamos a la función de pintura y colgamos el resultado
        const elementoLlista = pintaLlistaIndividual(llista, filtre);
        contenedorPrincipal.appendChild(elementoLlista);
    });
}

// 4. Inicialización
function init() {
    const select = document.getElementById("select_musica_disponible");
    llista_inicial.llistat_musiques.forEach((m, i) => {
        const opt = document.createElement("option");
        opt.value = i;
        opt.text = m.titol;
        select.appendChild(opt);
    });
    actualitzaLlistaMusiques();
}

init();

/**
 * Función para llenar el SELECT del filtro con etiquetas únicas
 */
function actualitzaSelectorFiltre() {
    const selectFiltre = document.getElementById("select_filtre");
    const valorActual = selectFiltre.value; // Guardamos lo que estaba seleccionado
    
    // Obtenemos todas las etiquetas de todas las listas y las aplanamos en un array único
    const todasLasTags = llistat_disponibles.flatMap(l => l.etiquetes);
    const etiquetasUnicas = [...new Set(todasLasTags)]; // Eliminamos duplicados

    selectFiltre.innerHTML = '<option value="">-- Totes les etiquetes --</option>';
    etiquetasUnicas.forEach(tag => {
        const opt = document.createElement("option");
        opt.value = tag;
        opt.text = tag;
        if(tag === valorActual) opt.selected = true;
        selectFiltre.appendChild(opt);
    });
}

// Evento: Filtrar cuando el usuario cambia la opción del selector
document.getElementById("select_filtre").onchange = function() {
    actualitzaLlistaMusiques(this.value);
};

// Evento: Limpiar filtro
document.getElementById("btn_netejar_filtre").onclick = function() {
    document.getElementById("select_filtre").value = "";
    actualitzaLlistaMusiques();
};


