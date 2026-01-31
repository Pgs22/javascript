/*Reproductor.html 
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
*/
import { Musica } from "./Musica.js";
import { LlistaMusiques } from "./LlistaMusiques.js";

const llistat_disponibles = [];

// 1. Datos iniciales
const llista_inicial = new LlistaMusiques("Disponibles", ["tots"], [
    new Musica("Song 1", "song1.mp3", ["pop"]),
    new Musica("Song 2", "song2.ogg", ["rock"]),
    new Musica("Song 3", "song3.wav", ["jazz"])
]);
llistat_disponibles.push(llista_inicial);

// 2. Eventos de la interfaz superior
document.getElementById("btn_crear_llista").onclick = () => {
    const nom = document.getElementById("input_nomLlista").value;
    if(nom) {
        llistat_disponibles.push(new LlistaMusiques(nom, ["tots"], []));
        document.getElementById("input_nomLlista").value = ""; // Limpiar
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

// 3. Función de renderizado (Aquí están tus botones de etiquetas)
function actualitzaLlistaMusiques(filtre = "") {
    const contenedorPrincipal = document.getElementById("div_llista_musiques");
    contenedorPrincipal.innerHTML = "";

    llistat_disponibles.forEach((llista) => {
        // Filtrado
        if (filtre && !llista.etiquetes.some(e => e.toLowerCase().includes(filtre.toLowerCase()))) {
            return; 
        }

        const divLista = document.createElement("div");
        divLista.style.border = "2px solid #ccc";
        divLista.style.padding = "15px";
        divLista.style.margin = "10px 0";
        divLista.style.borderRadius = "8px";
        
        // HTML de la clase (Título, etiquetas actuales y canciones con audio)
        divLista.innerHTML = llista.generaCodiHTML();

        // --- BOTONES DE ETIQUETAS (Punto k) ---
        const btnAddTag = document.createElement("button");
        btnAddTag.innerText = "＋ Etiqueta";
        btnAddTag.onclick = () => {
            const nueva = prompt("Nueva etiqueta para " + llista.titol);
            if(nueva) {
                let t = llista.etiquetes;
                t.push(nueva);
                llista.etiquetes = t; // Llama al setter
                actualitzaLlistaMusiques(filtre);
            }
        };

        const btnDelTag = document.createElement("button");
        btnDelTag.innerText = "－ Etiqueta";
        btnDelTag.style.marginLeft = "5px";
        btnDelTag.onclick = () => {
            let t = llista.etiquetes;
            if(t.length > 0) {
                t.pop(); // Quita la última
                llista.etiquetes = t;
                actualitzaLlistaMusiques(filtre);
            }
        };

        // --- BOTÓN AÑADIR CANCIÓN (Punto j) ---
        const btnAfegirMusica = document.createElement("button");
        btnAfegirMusica.innerText = "🎵 Afegir cançó seleccionada";
        btnAfegirMusica.style.display = "block";
        btnAfegirMusica.style.marginTop = "10px";
        btnAfegirMusica.onclick = () => {
            const index = document.getElementById("select_musica_disponible").value;
            llista.llistat_musiques.push(llista_inicial.llistat_musiques[index]);
            actualitzaLlistaMusiques(filtre);
        };

        // Añadir botones al div de la lista
        divLista.appendChild(btnAddTag);
        divLista.appendChild(btnDelTag);
        divLista.appendChild(btnAfegirMusica);
        
        contenedorPrincipal.appendChild(divLista);
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

/*
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




//aqui creo un objecte de llistamusques
//aqui creo un objecte de musica

