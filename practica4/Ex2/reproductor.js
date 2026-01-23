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
const llista_musiques= new LlistaMusiques("disponibles", etiquetes_tots, []);


document.getElementById("btn_crear_musica").onclick=crearMusica;
function crearMusica(){
    const titol = document.getElementById("input_titol").value;
    const nom = document.getElementById("input_nom").value;
    const novaMusica = new Musica("disponibles", "musica", etiquetes_tots)
    llista_musiques.llistat_musica.push(novaMusica);
/*
    const minut= document.getElementById("input_minut").value;
    const segon = document.getElementById("input_segon").value;
    const musica = document.getElementById("input_musica").value;
    const novaAlarma = new Alarma(titol, hora, minut,segon, musica)

    alarmes.push(novaAlarma);
    actualitzaLlistaAlarmes();

    */
}

function actualitzaLlistaMusiques(){
    const div_llista_musiques= document.getElementById("div_llista_musiques")
    div_llista_musiques.innerHTML=""
    llista_musiques.forEach(function(titol, index){
        //div_llista_musiques.innerHTML+=index+"-"+musica.generaCodiHTML(index)
    })
}

/*
generaCodiHTML(index) {
    return `<div><h2>` + this.titol + `</h2>
                <div> hora alarma: ${this.hora_completa} </div>
                <div> musica: ${this.musica}</div>
                <div> activa:${this.activa}</div>
                <button onclick="activaAlarma(${index})">ACTIVA</button>
                    <button onclick="desactivaAlarma(${index})">DESACTIVA</button>
            </div>`;
}
*/

/*
const novaMusica = new Musica("disponibles", "musica", etiquetes_tots)
console.log(novaMusica.titol);
*

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