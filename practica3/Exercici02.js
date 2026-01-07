
/**
 * EXERICICI 2
 * Crea i programa un reproductor de música amb les següents funcionalitats dividides en dos html:
 * a. En Exercici02.html
 * i. Hauràs de definir un array amb informació sobre el nom de diferents arxius d’àudio,
    la seva extensió i el seu títol. 
*/

//Array reproductor para guardar las canciones
const reproductor = new Array();
//Informació del llistat de cançons
reproductor[0]=["DRUMC0.WAV", "wav", "titol", ""];
reproductor[1]=["FANFARE1.WAV", "wav", "titol", ""];
reproductor[2]=["ek_raat_vilen.mp3", "mp3", "titol", ""];
//Veure en consola
console.log(reproductor)
//Recorrer el array de llistat de cançons i veure en consola
for(let k=0;k<reproductor.length;k++ ){
    console.log(k+": "+reproductor[k]);
}

/** EXERICICI 2
 * a. En Exercici02.html
 * ii. Mostra el llistat de àudios disponibles (hauràs de tenir l’arxiu i 
 * la informació a l’array)

*/

const div_llista_audios_disponibles= document.getElementById("llista_audios_disponibles");
function generaLlistaAudios(){

    let llistat = '<ul>';
    for (let i = 0; i < reproductor.length; i++) {
        const nom = reproductor[i][0];
        llistat += `<li>Nom: ${nom}
         <button onclick="veureInfo(${i})"> Veure </button>
         <button onclick="tancaInfo()"> Tancar </button>         
        </li> `;
    }
    llistat += '</ul>';
    div_llista_audios_disponibles.innerHTML = llistat;
}

if (window.opener === null) {
    generaLlistaAudios();
}


/**EXERICICI 2
 * a. En Exercici02.html
 * iii. Permet que l’usuari pugui reproduir, aturar, posar en pausa i pujar i baixar el
          volum de qualsevol àudio de l’array. 
*/

/**
 * BOTONS MUSIC
 */
const btnPlay = document.getElementById("btn_play");
const btnPause = document.getElementById("btn_pause");
const btnStop = document.getElementById("btn_stop");
/**
 * PROPIETATS MUSIC
 */
let audio_actual = "";
const idAudio = document.getElementById("idAudio");
const selectMusic = document.getElementById("LlistatAudios");
/**
 * CONTROLS VOLUM
 */
const inputVolum = document.getElementById("inp_volum_Audio");
const btnVolumUp = document.getElementById("btnVolumUp");
const btnVolumDown = document.getElementById("btnVolumDown");
const btnMute = document.getElementById("btnMute");

if (idAudio && inputVolum) {
    idAudio.volume = 0.5; 
    inputVolum.value = idAudio.volume; //Iniciar per defecte a 1 si existeix
}

let volumAbansDeSilenciar = 1; //Variable per guardar el volum abans de silenciar
/**
 * FUNCIO PLAY
 */
btnPlay.onclick=playMusic;
function playMusic() {
    //Comprovar si la musica seleccionada es la actual
    if(selectMusic.value === audio_actual){
        idAudio.play();
        return;
    }    
    //Comprovar primer si la musica es la selecciona
    if(idAudio.src != selectMusic.value){
        idAudio.src = selectMusic.value;
        idAudio.load(); //Carga la nova canço
        audio_actual = selectMusic.value;
    }
}
/**
 * FUNCIO PAUSAR
 */
btnPause.onclick = pausarMusic;
function pausarMusic() {
    idAudio.pause();
}
/**
 * FUNCIO ATURAR
 */
btnStop.onclick = aturarMusic;
function aturarMusic() {
    idAudio.pause();
    idAudio.currentTime = 0;
}
/**
 * FUNCIO VOLUM A MUTE
 */
btnMute.onclick = clk_btn_mute;
function clk_btn_mute(){
    //Es el mateix que fer un if/else i intercanviar, si es true a false, si es false a true
    idAudio.muted = !idAudio.muted;
}
/**
 * FUNCIO VOLUM A UP
 */
btnVolumUp.onclick = clk_btn_vol_up;
function clk_btn_vol_up(){    
    if(idAudio.volume<=0.9){
        idAudio.volume += 0.1;
    }
    //Per aplicar-lo a la barra desliçant del volum
    inputVolum.value = idAudio.volume;
}
/**
 * FUNCIO VOLUM A DOWN
 */
btnVolumDown.onclick = clk_btn_vol_down;
function clk_btn_vol_down(){
    if(idAudio.volume > 0){
        idAudio.volume -= 0.1;
    }
    //Per aplicar-lo a la barra desliçant del volum
    inputVolum.value = idAudio.volume;
}
/**
 * FUNCIO VOLUM A UP/DOWN
 */
inputVolum.onchange = clk_inp_vol_Audio;
function clk_inp_vol_Audio(){
    const nuevoVolumen = parseFloat(inputVolum.value);
    idAudio.volume = nuevoVolumen;
    if (nuevoVolumen > 0) {
        idAudio.muted = false;
        volumAbansDeSilenciar = nuevoVolumen;
    }
}


/**EXERICICI 2
 * a. En Exercici02.html
 * v. Permet que l’usuari pugui tancar i obrir “Info.html” per veure la informació de
qualsevol àudio.
*/

//Afegim botó per tancar i obrir “Info.html” a la funció generaLlistaAudios()

let ref_info;
let id_song_actual;
function veureInfo(id_song) { //parametre d'entrada es la posicio on tenim les dades
    id_song_actual = id_song;
    let altura = screen.availHeight;
    let amplada = screen.availWidth;
    let width_window = 600; 
    let height_window = 400;

    ref_info = window.open("info.html", "Info",
        `width=`+width_window+`px,height=`+height_window+`px,toolbar=no,scrollbars=no, top=`
        +(altura-height_window/2)+`px, left=`+(amplada-width_window/2)+`px`);  


    window.setTimeout(function(){ 
        actualitzarInfo(id_song_actual); // Crida a la nova funció per generar el contingut
    }, 1000 );
}


function tancaInfo() {
    ref_info.close();
}

/**EXERICICI 2
 * a. En Exercici02.html
 * v. 1p] Mostrar els àudios que l’usuari hagi marcat com a preferit.
*/
const div_llista_favorits = document.getElementById("llista_favorits");
function llistaFavorits(){
    let llistat = '<ul>';
    for(let i = 0; i < reproductor.length; i++){
        const favorit = reproductor[i][3] === "preferit"; // Per que entri al següent if, si es preferit
        if(favorit){
            console.log(reproductor[i][0]);
            const nom = reproductor[i][0];
            llistat += `
                <li>Nom: ${nom} </li>
                `;
        }
    }
    llistat += '</ul>'; // Ho afegin a la variable per tancar llistat
    div_llista_favorits.innerHTML = llistat; // per canviar valor de fora la funció amb tota la llista feta
}

/**EXERICICI 2
 * a. En Exercici02.html
 * vi. 1,5] Permet afegir/treure i ordenar l’àudio d’una llista privada de reproducció.
*/
let llistes_privades = new Array; // Per guarrdar les llistes privadas
let llista_actual_index = -1; // Farem servir com a index
const div_llista_reproduccio = document.getElementById("gestionar_llistas_reproduccio");
function generaLlistaReproduccio(){
    let llistat = '<ul>';
    for (let i = 0; i < reproductor.length; i++) {
        const nom = reproductor[i][0];
        llistat += `<li>Nom: ${nom}
         <button onclick="afegirAudio(${i})"> Afegir </button>
         <button onclick="treureAudio(${i})"> Treure </button>
        </li> `;
    }
    llistat += '</ul>';
    div_llista_reproduccio.innerHTML = llistat;   
}
/**
 * Afegir a la llista de reproduccio
 * @param {posicio} id_song 
 */
function afegirAudio(id_song){
    if (llista_actual_index < 0) {
        return; 
    }
    const audioActiva = llistes_privades[llista_actual_index][1];
    const audio = reproductor[id_song][0];
    let existeix = audioActiva.indexOf(audio);
    
    if(existeix === -1){
        audioActiva.push(audio);
        mostrarLlistaReproduccio(); 
    }
}

function treureAudio(id_song){
    if (llista_actual_index === -1) return;
    const audioActiva = llistes_privades[llista_actual_index][1];
    const audio = reproductor[id_song][0];
    let audioLlista = audioActiva.indexOf(audio); // Si la trova retorna posicio, si no retorna -1, si la posicio es 0 el boolean sería flase

    if(audioLlista >= 0){
        audioActiva.splice(audioLlista,1);
        mostrarLlistaReproduccio()
    }
}

function pujar(id_song){ //parametre entrada de la posicio audio
    if (llista_actual_index === -1){
        return;
    }
    const audioActiva = llistes_privades[llista_actual_index][1];
    let posNova = id_song - 1; // Posicio nova
    if(posNova >= 0){ //Per controlar si hi ha posicio anterior
        let origen = audioActiva.splice(id_song, 1); //Elimina, retorna eliminat convertit en array i el guardem, i mou posicions d'elements
        let nomOrigen = origen[0];//Ens retorna el contingut del array origen esborrat, aixi obtenim sol el valor
        audioActiva.splice(posNova, 0, nomOrigen);//Guardo element origen al destí, si està ocupat, mou tot a la dreta una posició
    }
    mostrarLlistaReproduccio();
}

function baixar(id_song){
    if (llista_actual_index === -1) return;
    const audioActiva = llistes_privades[llista_actual_index][1];
    let posNova = id_song + 1; // Posicio nova
    if(posNova <= audioActiva.length){
        let origen = audioActiva.splice(id_song, 1); //Elimina, retorna eliminat convertit en array i el guardem, i mou posicions d'elements
        let nomOrigen = origen[0]; //Ens retorna el contingut del array origen esborrat, aixi obtenim sol el valor
        audioActiva.splice(posNova, 0, nomOrigen); //Guardo element origen al destí, si està ocupat, mou tot a la dreta una posició
    }
    mostrarLlistaReproduccio()
}
/**
 * Mostrar llista privada de reproducció
 */
const div_llista_privada_reproduccio = document.getElementById("llista_privada_reproduccio");
function mostrarLlistaReproduccio(){
    if (llista_actual_index === -1) {
        return;
    }
    const audioActiva = llistes_privades[llista_actual_index][1];
    let llistat = '<ul>';
    for(let k = 0; k < audioActiva.length; k++){ 
        const nom = audioActiva[k];
        const pujarId = k;
        const baixarId = k;
        llistat += `
            <li>Nom: ${nom} </li>
            <button onclick="pujar(${pujarId})">Pujar</button>
            <button onclick="baixar(${baixarId})">Baixar</button>
        </li> `;
    }
    llistat += '</ul>';
    div_llista_privada_reproduccio.innerHTML = llistat;
}

/**EXERICICI 2
 * a. En Exercici02.html
 * vii. 1,5] Permet crear/esborrar vàries llistes de reproducció. 
*/
let llistatComplet = false; // Per si esborra totes les llistes
let btn_crear_llista = document.getElementById("btn_crear_llista");
btn_crear_llista.onclick = crearLlista;
function crearLlista(){
    let nouIndex = llistes_privades.length;
    let nomLlista = `Llista ${nouIndex +1}`;
    llistes_privades[nouIndex] = [nomLlista, []];
    llista_actual_index = nouIndex;

    //Comprovació si hi ha alguna llista creada per afegir la llista reproduccio
    if (llistatComplet === false) {
        generaLlistaReproduccio();
        llistatComplet = true;
    }
    mostrarLlistesPrivades();
    mostrarLlistaReproduccio();
}
function eliminar(id_llista){
    llistes_privades.splice(id_llista,1);
    if (id_llista === llista_actual_index) {
        llista_actual_index = llistes_privades.length > 0 ? 0 : -1;
    }
    mostrarLlistesPrivades();
    mostrarLlistaReproduccio();
}

function seleccionarLlista(id_llista){
    llista_actual_index = id_llista;
    mostrarLlistesPrivades();
    mostrarLlistaReproduccio();
}

/**
 * mostrar llistes privade creades
 */
const div_llistes_privades = document.getElementById("llistes_privades");
function mostrarLlistesPrivades(){
    let llistat = '<ul>';
    for(let k = 0; k < llistes_privades.length; k++){ 
        const llista = llistes_privades[k];
        const nom = llista[0]; // Posicio

        llistat += `
        <li>
        <div onclick="seleccionarLlista(${k})"> ${nom} </div>
        <button onclick="eliminar(${k})">Eliminar</button>
        <button onclick="seleccionarLlista(${k})">Editar/Seleccionar</button>
        </li> `;
    } 
    llistat += '</ul>';
    div_llistes_privades.innerHTML = llistat;
}


/**EXERICICI 2
 * b.En Info.html
 * i. 1p] Mostra la informació de l’àudio seleccionat per l’usuari.
 * ii. 1] Mostra si l’àudio s’ha marcat com a preferit o no.
 * iii. 2p] Permet marcar o desmarcar l’àudio com a preferit.
*/


/**
 * Afegit a la funció ja creada en aquest fixer: veureInfo(id_song)
 */ 

function afegirFavorit(id_song) { //parametre d'entrada es la posicio on tenim la cançó
    reproductor[id_song][3] = "preferit";
    llistaFavorits();
    if (ref_info && !ref_info.closed) { // <--- Afegeix això!
        actualitzarInfo(id_song); 
    }
}   

function eliminarFavorit(id_song) { //parametre d'entrada es la posicio on tenim la cançó
    reproductor[id_song][3] = "";
    llistaFavorits();
    if (ref_info && !ref_info.closed) { // <--- Afegeix això!
        actualitzarInfo(id_song); 
    }
}

//Per afegir a la finestra info.html el canvi del favorit
function actualitzarInfo(id_song) {
    let nom = reproductor[id_song];
    
    ref_info.document.getElementById("div_infoSong").innerHTML = `
        <h3>Informació de la cançó</h3>
        Nom: ${nom[0]} <br>
        Extensió: ${nom[1]} <br>
        Títol: ${nom[2]} <br>
        Favorit: ${nom[3]}
        `;

    ref_info.document.getElementById("div_favorit_control").innerHTML = `
        <button onclick="window.opener.afegirFavorit(${id_song})"> Marcar favorit </button>
        <button onclick="window.opener.eliminarFavorit(${id_song})"> Desmarcar favorit </button>
    `;
}

