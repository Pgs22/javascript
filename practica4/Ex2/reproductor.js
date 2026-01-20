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
import {Musica} from "./Musicajs"
const etiquetes_disponibles=["jazz", "pop", "animades", "rock", "clasica"];
const etiquetes_tots=["tots"]

const novaMusica = new Musica("disponibles", "musica", etiquetes_tots)
console.log(novaMusica.titol);

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