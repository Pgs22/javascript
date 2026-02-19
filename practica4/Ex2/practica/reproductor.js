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

//Llistat de musiques:
const musica1 = new Musica("cancion1", "cancion1.mp3", ["Pop", "2024"]);
const musica2 = new Musica("cancion2", "cancion2.ogg", ["preferida", "2026"]);
const musica3 = new Musica("cancion3", "cancion3.wav", ["2000", "rock"]);

// Crea un objecte del tipus LlistaMusiques amb totes les musiques disponibles:
const llistaInicial = new LlistaMusiques("disponibles", [tots], [musica1, musica2, musica3]);

const contenedor = document.getElementById("div_llista_musiques");
contenedor.innerHTML = llistaInicial.generaCodiHTML();