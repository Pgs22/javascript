  /* Utilitza Bootstrap per donar estils als HTML.  
Exercici02.html */

/**
 * Exercici 2) 3.2p
 */

/* 3.2p] Crea un document HTML amb un div amb id “taula_propietats”.
Programa amb JS que es creï una taula formada per dos columnes.
En la primera columna has de mostrar els texts indicats a continuació, i en la segona columna els valors corresponents obtinguts dinàmicament amb JS:
a.Valor máxim que pot tenir un número JS
b.Altura total de la pantalla
c.Altura interna de la finestra
d.URL de la web*/

//Per veure al navegador: 
console.log("Taula de propietats");

//accedir a #taula_propietats
const div_taula_propietats= document.getElementById("taula_propietats");

function generaTaulaPropietats(){
//crear una taula dins #taula_propietats
div_taula_propietats.innerHTML=`
        <table>
            <tr>
                <td>Valor máxim que pot tenir un número JS </td>
                <td>`+Number.MIN_VALUE+`</td>
            </tr>
            <tr>
                <td>Altura total de la pantalla </td>
                <td>`+screen.availWidth+`</td>
            </tr>
            <tr>
                <td>Altura interna de la finestra </td>
                <td>`+window.innerWidth+`</td>
            </tr>            
            <tr>
                <td>URL de la web </td>
                <td>`+location.href+`</td>
            </tr>
            
        </table>`;

}
generaTaulaPropietats();


/**
 * Exercici 2) 4.3p
 */

/* 4.3p] Afegeix al document HTML un compte enrere inicialment a 00minuts i 00segons
a.Permet que l’usuari pugui establir quants minuts i segons vol que duri.
b.Permet que l’usuari inicií el compte enrere i el pugui aturar (restablint-lo a 0) i pausar
c.Quan el compte enrere arribi a 0, avisa amb una música i permet que es pugui aturar. */


/**
 * PROPIETATS COMPTADOR
 */

let inputMinuts = document.getElementById("inputMinuts");
let inputSegons = document.getElementById("inputSegons");
let estatMinuts = document.getElementById("estatComptadorMinuts");
let estatSegons = document.getElementById("estatComptadorSegons");

let referenciaSetIntervalComptador = null;
let tempsRestant = 0;

/**
 * BOTONS COMPTADOR
 */

let bton_aturar = document.getElementById("aturarComptador");
let bton_pausar = document.getElementById("pausarComptador");
let bton_iniciar = document.getElementById("iniciarComptador");


/**
 * FUNCIO COMPTADOR INICIAR COMPTA ENRERE
 */
bton_iniciar.onclick=iniciaComptaEnrere;
function iniciaComptaEnrere(){
    //Si el contador está a cero salir de la función (controlado por actualitzarComptador el cambiar a null)
    if (referenciaSetIntervalComptador !== null) {
        return;
    }
    //Si no estaba iniciado leerá los inputs de minutos y segundos para calcular el tiempo restante
    //Si ya estaba iniciado, seguirá con el tiempo restante donde se quedó
    if(tempsRestant <= 0){
        //Leer los imputs si el tiempo restante es igual o menor a 0
        const minuts = parseInt(inputMinuts.value);
        const segons = parseInt(inputSegons.value);
        //Pasar los minutos a segundos para sumar el tiempo total
        tempsRestant = (minuts * 60) + segons;
    }
    //Si el tiempo restante sigue en 0 después de las acciones anteriores, salimos
    if(tempsRestant <= 0){
        return;
    }

    //Para mostrar los botones habilitados y/o deshabilitados (Por defecto deshabilitados botones PAUSAR y ATURAR)
    bton_pausar.disabled = false; // Habilitado botón PAUSAR porque se ha puesto en marcha el contador
    bton_aturar.disabled = false; // Habilitado botón ATURAR porque se ha puesto en marcha el contador
    bton_iniciar.disabled = true;  // Deshabilitar porque ahora está iniciado el contador

    //Para no repetir los calculos en la función actualiza la ejecutamos antes del intervalo
    actualitzarComptador();
    //Para restar segundos llamamos a la función actualitzarComptador()
    //Para que se reste cada segundo que pasa, usamos la funcion el windows.setInterval()
    //Guardamos en la variable referenciaSetIntervalComptador actualizar contador cada segundo (1segundo = 1000milisegundos)
    referenciaSetIntervalComptador = window.setInterval(actualitzarComptador, 1000);
}

/**
 * FUNCIO COMPTADOR ACTUALITZAR QUE ES CRIDA DINTRE DE LA FUNCIO IniciaComptaEnrere()
 */
function actualitzarComptador(){
    //Para restar segundos en cada intervalo:
    tempsRestant--;
    //Para parar el contador si llega a 0
    if (tempsRestant <= 0) {
        window.clearInterval(referenciaSetIntervalComptador);
        referenciaSetIntervalComptador = null;
        tempsRestant = 0;
        //Si el comptador arriba a 0, comença la musica
        reproduirAutoAudio();     
    }
    mostraComptador();
}

/**
 * FUNCIO COMPTADOR ATURAR
 */
bton_aturar.onclick=aturarComptador;
function aturarComptador(){
    //Para parar la función interval usamos el clear y establecemos a null su variable
    window.clearInterval(referenciaSetIntervalComptador);
    referenciaSetIntervalComptador = null;

    //Reseteamos todo a 0
    tempsRestant = 0;
    inputMinuts.value = "0";
    inputSegons.value = "0";

    //Para mostrar los botones habilitados y/o deshabilitados
    bton_pausar.disabled = true; //Desactivado botón PAUSAR al estar parado
    bton_aturar.disabled = true; //Desactivado botón ATURAR al estar parado
    bton_iniciar.disabled = false; // Habilitado para poder iniciar de nuevo

    //Llamamos a la función para mostrar contador
    mostraComptador();
}

/**
 * FUNCIO COMPTADOR PAUSAR
 */
bton_pausar.onclick=pausarComptador;
function pausarComptador(){
    //Para parar la función interval usamos el clear y establecemos a null su variable
    window.clearInterval(referenciaSetIntervalComptador);
    referenciaSetIntervalComptador = null;

    //Para mostrar los botones habilitados y/o deshabilitados
    bton_pausar.disabled = true; //Desactivado botón PAUSAR al estar en pausa
    bton_aturar.disabled = true; //Desactivado botón ATURAR al estar en pausa
    bton_iniciar.disabled = false; // Habilitado para poder iniciar de nuevo

    //Llamamos a la función para mostrar contador
    mostraComptador();
}

/**
 * FUNCIO COMPTADOR QUE ES CRIDA DINTRE DE TOTES LES FUNCIONS COMPTADOR A EXCEPCIO DE IniciaComptaEnrere()
 */
function mostraComptador() {
    if(tempsRestant <= 0){
        estatComptadorMinuts.innerHTML= `0 minuts i`;
        estatComptadorSegons.innerHTML = `0 segons`;
        return;
    }
    //Convertir tempsRestant a minutos usando la funcion Math.floor() para quedarnos solo con el numero entero
    const min = Math.floor(tempsRestant / 60);
    //Para los segundos, extraer solo el número decimal que serán los segundos, usamos el resto
    const sec = tempsRestant % 60;

    estatComptadorMinuts.innerText= `${min} minuts i`;
    estatComptadorSegons.innerText = `${sec} segons`;
}

/**
 * FUNCIO DEL COMPTADOR PER REPRODUIR AUDIO AUTOMÀTICAMENT AL FINALITZAR LA COMPTA ENRERE
 */
const idAutoAudio = document.getElementById("idAutoAudio");
function reproduirAutoAudio() {
    idAutoAudio.currentTime = 0;
    idAutoAudio.loop = true;
    idAutoAudio.play();
}

/**
 * FUNCIO DEL COMPTADOR PER ATURAR AUDIO INICIAT AUTOMÀTICAMENT AL FINALITZAR LA COMPTA ENRERE
 */
const btnAutoStop = document.getElementById("btn_aturaAutoAudio");
btnAutoStop.addEventListener('click', aturaAutoAudio);
function aturaAutoAudio() {
    idAutoAudio.pause();
    idAutoAudio.currentTime = 0; // Reinicia l'àudio
    idAutoAudio.loop = false;
}

/**
 * Exercici 2) 5.5p
 */

/*5. 5p] Afegeix un rellotge que mostri la hora, minuts i segons actuals i s’actualitzi cada segon. */
console.log("Rellotge");
const div_rellotge = document.getElementById("rellotge");
function horaActual(){
    let hora_actual = new Date();
    //crear una llista per mostrar hora actual
    div_rellotge.innerHTML= 
        `<ul> <li>` +  hora_actual.getHours()+ `:` +
                                    hora_actual.getMinutes()+`:`+
                                    hora_actual.getSeconds()+`</li> 
         </ul>`;
        
}
horaActual();
let referenciaSetIntervalHora= window.setInterval(horaActual, 1000);

/*
a. Afegeix la possibilitat d’establir una alarma que avisi en una hora en concret
b. Al saltar l’alarma aconsegueix que soni una música i que es pugui aturar
c. L’usuari pot escollir entre diferents músiques
d. L’usuari pot establir el volum
e. En qualsevol moment l’usuari pot reproduir i aturar la música de l’alarma
*/

/**
 * PROPIETATS ALARMA
 */
let inputHoraAlarma = document.getElementById("inputHoraAlarma");
let inputMinutsAlarma = document.getElementById("inputMinutsAlarma");
let inputSegonsAlarma = document.getElementById("inputSegonsAlarma");

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
const selectMusic = document.getElementById("select_music");
const idAudio = document.getElementById("idAudio");

/**
 * PROPIETATS ALARMA
 */
let alarma = null;

/**
 * BOTONS ALARMA
 */
const btnActivarAlarma = document.getElementById("btnActivarAlarma");
const btnCancelarAlarma = document.getElementById("btnCancelarAlarma");

/**
 * FUNCIO ALARMA
 */
function alarmaProgramada(){
    //Leer los imputs de la alarma
    const hora = parseInt(inputHoraAlarma.value);
    const minuts = parseInt(inputMinutsAlarma.value);
    const segons = parseInt(inputSegonsAlarma.value);
    //Convertimos la hora alarma en milisegundos para usar la funcion windowsSetInterval()
    const horaAlarma = (hora *3600*1000) + (minuts * 60*1000) + segons*1000;
    const hora_actual = new Date();
    //Convertimos la hora actual en milisegundos para comparar con la conversion anterior
    const horaActualEnMs = 
                    parseInt(hora_actual.getHours()*3600*1000)+ 
                    parseInt(hora_actual.getMinutes())*60*1000+ 
                    parseInt(hora_actual.getSeconds())*1000;
    //Ahora si restamos alarma de la hora actual, si el resultado es menor a 1ms, reproducir:
    if((Math.abs(horaAlarma - horaActualEnMs))<1000){
        console.log("Alarma");
        idAudio.play();
        //Paramos alarma una vez ha sonado
        clearInterval(alarma);
        alarma=null;
    }
}

/**
 * FUNCIO CONFIGURAR ALARMA
 */
btnActivarAlarma.onclick=activarAlarma;
function activarAlarma(){
    if(alarma !== null){
        clearInterval(alarma);
    }
    alarma = window.setInterval(alarmaProgramada, 1000);
    console.log("Alarma programada");
}

/**
 * CANCELAR ALARMA
 */
btnCancelarAlarma.onclick=cancelarAlarma;
function cancelarAlarma(){
    if(alarma !== null){
        window.clearInterval(alarma);
        alarma = null;
        console.log("Alarma cancelada");
    }
}

/**
 * FUNCIO PLAY
 */
btn_play.onclick=playMusic;
function playMusic() {
    //Comprobamos si la musica seleccionada es la actual
    if(selectMusic.value === audio_actual){
        idAudio.play();
        return;
    }    
    //Comprobamos primero si la musica es la selecciona
    if(idAudio.src!= selectMusic.value){
        idAudio.src = selectMusic.value;
        idAudio.load(); //Carga la nueva cancion
        audio_actual = selectMusic.value;
    }
}

/**
 * FUNCIO PAUSAR
 */
btn_pause.onclick=pausarMusic;
function pausarMusic() {
    idAudio.pause();
}

/**
 * FUNCIO ATURAR
 */
btn_stop.onclick=aturarMusic;
function aturarMusic() {
    idAudio.pause();
    idAudio.currentTime = 0;
    idAudio.loop = false;
}

/**
 * CONTROLS VOLUM
 */
// Elementos de control de volumen
const inputVolum = document.getElementById("inp_volum_Audio");
const btnVolumUp = document.getElementById("btnVolumUp");
const btnVolumDown = document.getElementById("btnVolumDown");
const btnMute = document.getElementById("btnMute");

// Variable para guardar el volumen antes de silenciar
let volumAbansDeSilenciar = 1;

/**
 * FUNCIO VOLUM A MUTE
 */
btnMute.onclick = clk_btn_mute;
function clk_btn_mute(){
    //Es lo mismo que hacer un if/else e intercambiar, si es true a false, si es false a true
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
    //Para aplicarlo a la barra deslizante del volumen
    inputVolum.value = idAudio.volume;
}

/**
 * FUNCIO DVOLUM A DOWN
 */
btnVolumDown.onclick = clk_btn_vol_down;
function clk_btn_vol_down(){
    if(idAudio.volume>=0.1){
        idAudio.volume -= 0.1;
    }
    //Para aplicarlo a la barra deslizante del volumen
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


