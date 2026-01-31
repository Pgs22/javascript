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

const etiquetes_tots = ["tots"];
const llistat_disponibles = [];

// 1. Creamos la lista inicial (el almacén de canciones)
const llista_inicial = new LlistaMusiques("Disponibles", etiquetes_tots, [
    new Musica("Song 1", "song1.mp3", ["pop", "animades"]),
    new Musica("Song 2", "song2.ogg", ["rock"]),
    new Musica("Song 3", "song3.wav", ["jazz", "clasica"])
]);

// La añadimos al array global
llistat_disponibles.push(llista_inicial);

// 2. Función para crear listas nuevas
function crearLlista() {
    const inputNom = document.getElementById("input_nomLlista");
    const nomLlista = inputNom.value;

    if (nomLlista.trim() !== "") {
        const novaLlista = new LlistaMusiques(nomLlista, ["tots"], []);
        llistat_disponibles.push(novaLlista);
        inputNom.value = ""; // Limpiamos el input
        actualitzaLlistaMusiques();
    } else {
        alert("Escriu un nom per a la llista");
    }
}

// 3. Función para actualizar la interfaz
function actualitzaLlistaMusiques() {
    const div_llista_musiques = document.getElementById("div_llista_musiques");
    div_llista_musiques.innerHTML = ""; 

    llistat_disponibles.forEach(function(llistat, index) {
        const contenedorLista = document.createElement("div");
        contenedorLista.style.border = "1px solid #444";
        contenedorLista.style.margin = "15px 0";
        contenedorLista.style.padding = "10px";
        
        // 1. Pintamos el HTML base de la clase
        contenedorLista.innerHTML = llistat.generaCodiHTML();

        // --- SECCIÓN GESTIÓN DE ETIQUETAS DE LISTA (Punto k) ---
        const divTags = document.createElement("div");
        divTags.style.marginTop = "10px";

        // Botón Añadir Etiqueta
        const btnAddTag = document.createElement("button");
        btnAddTag.innerText = "+ Etiqueta";
        btnAddTag.onclick = () => {
            const nuevaTag = prompt("Nombre de la nueva etiqueta para '" + llistat.titol + "':");
            if (nuevaTag) {
                // Usamos el setter de la clase
                let misTags = llistat.etiquetes; 
                misTags.push(nuevaTag);
                llistat.etiquetes = misTags; 
                actualitzaLlistaMusiques();
            }
        };

        // Botón Quitar Etiqueta
        const btnDelTag = document.createElement("button");
        btnDelTag.innerText = "- Etiqueta";
        btnDelTag.style.marginLeft = "5px";
        btnDelTag.onclick = () => {
            let misTags = llistat.etiquetes;
            if (misTags.length > 0) {
                const tagAEliminar = prompt("¿Qué etiqueta quieres quitar? (" + misTags.join(", ") + ")");
                const i = misTags.indexOf(tagAEliminar);
                if (i !== -1) {
                    misTags.splice(i, 1);
                    llistat.etiquetes = misTags;
                    actualitzaLlistaMusiques();
                } else {
                    alert("Etiqueta no encontrada");
                }
            }
        };

        divTags.appendChild(btnAddTag);
        divTags.appendChild(btnDelTag);
        contenedorLista.appendChild(divTags);

        // --- SECCIÓN AÑADIR MÚSICA (Lo que ya teníamos) ---
        const btnAfegirMusica = document.createElement("button");
        btnAfegirMusica.innerText = "Afegir cançó seleccionada";
        btnAfegirMusica.style.display = "block";
        btnAfegirMusica.style.marginTop = "10px";
        btnAfegirMusica.style.backgroundColor = "#e1e1e1";
        
        btnAfegirMusica.onclick = function() {
            const select = document.getElementById("select_musica_disponible");
            const musicaAñadir = llista_inicial.llistat_musiques[select.value];
            llistat.llistat_musiques.push(musicaAñadir);
            actualitzaLlistaMusiques();
        };

        contenedorLista.appendChild(btnAfegirMusica);
        div_llista_musiques.appendChild(contenedorLista);
    });
}

// 4. Rellenar el selector de canciones (solo una vez al inicio)
function inicializarSelect() {
    const select = document.getElementById("select_musica_disponible");
    llista_inicial.llistat_musiques.forEach((musica, index) => {
        const opcion = document.createElement("option");
        opcion.value = index;
        opcion.text = musica.titol;
        select.appendChild(opcion);
    });
}

// 5. Asignar eventos y arranque
document.getElementById("btn_crear_llista").onclick = crearLlista;

// Ejecución inicial
inicializarSelect();
actualitzaLlistaMusiques();

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

