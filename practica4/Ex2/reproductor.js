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

// Crear llista inicial con canciones
const llista_inicial = new LlistaMusiques("Disponibles", etiquetes_tots, [
    new Musica("Song 1", "song1.mp3", ["pop", "animades"]),
    new Musica("Song 2", "song2.ogg", ["rock"]),
    new Musica("Song 3", "song3.wav", ["jazz", "clasica"])
]);

llistat_disponibles.push(llista_inicial);

// Función para actualizar la vista
function actualitzaLlistaMusiques() {
    const div_llista_musiques = document.getElementById("div_llista_musiques");
    div_llista_musiques.innerHTML = "";
    llistat_disponibles.forEach(function(llistat, index) {
        div_llista_musiques.innerHTML += llistat.generaCodiHTML();
    });
}

// Evento para crear nuevas listas
document.getElementById("btn_crear_llista").onclick = function() {
    const nomLlista = document.getElementById("input_nomLlista").value;
    if (nomLlista) {
        const novaLlista = new LlistaMusiques(nomLlista, ["tots"], []);
        llistat_disponibles.push(novaLlista);
        actualitzaLlistaMusiques();
    }
};

// Render inicial
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