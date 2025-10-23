  /* Utilitza Bootstrap per donar estils als HTML.  
Exercici02.html */

/* 
3.2p] Crea un document HTML amb un div amb id “taula_propietats”.
Programa amb JS que es creï una taula formada per dos columnes.
En la primera columna has de mostrar els texts indicats a continuació, i en la segona columna els valors corresponents obtinguts dinàmicament amb JS:
a.Valor máxim que pot tenir un número JS
b.Altura total de la pantalla
c.Altura interna de la finestra
d.URL de la web
*/

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



/*
4.3p] Afegeix al document HTML un compte enrere inicialment a 00minuts i 00segons
a.Permet que l’usuari pugui establir quants minuts i segons vol que duri.
b.Permet que l’usuari inicií el compte enrere i el pugui aturar (restablint-lo a 0) i pausar
c.Quan el compte enrere arribi a 0, avisa amb una música i permet que es pugui aturar.
*/


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
 * FUNCIONS
 * function iniciaComptaEnrere()
 * actualitzarComptador()
 * aturarComptador()
 * pausarComptador()
 * mostraComptador()
 * aturaAudio()
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
        //Si el tiempo total es mayo a 0, iniciar el contador
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

//Llamamos a esta función en el momento que iniciamos o reanudamos la cuenta atrás
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


function mostraComptador() {
    if(tempsRestant <= 0){
        estatComptadorMinuts.innerHTML= `0 minuts i`;
        estatComptadorSegons.innerHTML = `0 segons`;
        return;
    }
    //Convertir tempsRestant a minutos usar funcion Math.floor() que solo se queda con el numero entero
    const min = Math.floor(tempsRestant / 60);
    //Para los segundos, extraer solo el número decimal que serán los segundos, usamos el resto
    const sec = tempsRestant % 60;

    estatComptadorMinuts.innerText= `${min} minuts i`;
    estatComptadorSegons.innerText = `${sec} segons`;
}


/**
 * REPRODUIR AUDIO AUTOMÀTICAMENT
 */
const idAutoAudio = document.getElementById("idAutoAudio");
function reproduirAutoAudio() {
    idAutoAudio.currentTime = 0;
    idAutoAudio.loop = true;
    idAutoAudio.play();
}

/**
 * ATURAR AUDIO
 */
const btnAutoStop = document.getElementById("btn_aturaAutoAudio");
btnAutoStop.addEventListener('click', aturaAutoAudio);
function aturaAutoAudio() {
    idAutoAudio.pause();
    idAutoAudio.currentTime = 0; // Reinicia l'àudio
    idAutoAudio.loop = false;
}



/*
5. 5p] Afegeix un rellotge que mostri la hora, minuts i segons actuals i s’actualitzi cada segon.
a. Afegeix la possibilitat d’establir una alarma que avisi en una hora en concret
b. Al saltar l’alarma aconsegueix que soni una música i que es pugui aturar
c. L’usuari pot escollir entre diferents músiques
d. L’usuari pot establir el volum
e. En qualsevol moment l’usuari pot reproduir i aturar la música de l’alarma
*/

/**
 * PROPIETATS RELLOTGE I ALARMA
 */
const rellotgeActualDiv = document.getElementById("rellotgeActual");
const inputAlarmaHora = document.getElementById("inputAlarmaHora");
const inputAlarmaMinut = document.getElementById("inputAlarmaMinut");
const btnEstablirAlarma = document.getElementById("btn_establirAlarma");
const estatAlarmaDiv = document.getElementById("estatAlarma");

// Audio de la Alarma (Elemento separado del contador)
const idAlarmaAudio = document.getElementById("idAlarmaAudio"); 
const selectMusica = document.getElementById("selectMusica");
const inputVolum = document.getElementById("inputVolum");
const btnReproduirAudio = document.getElementById("btn_reproduirAudio");
const btnAturarAudio = document.getElementById("btn_aturarAudio");

let alarmaEstablerta = { hora: null, minut: null, activa: false };

// El temporizador principal del reloj (se inicia inmediatamente)
window.setInterval(actualitzarRellotge, 1000); 

//--------------------------------------------------------------------------------------

/**
 * FUNCIONES UTILITARIAS
 */

/**
 * Función para añadir un 0 inicial si el número es menor a 10 (ej: 9 -> 09)
 */
function formatDuesDigits(num) {
    return num < 10 ? '0' + num : num;
}

//--------------------------------------------------------------------------------------

/**
 * 5. RELOJ PRINCIPAL
 */

/**
 * Actualiza el reloj cada segundo y comprueba si la alarma debe sonar.
 */
function actualitzarRellotge() {
    const ara = new Date();
    const hora = ara.getHours();
    const minut = ara.getMinutes();
    const segon = ara.getSeconds();

    // 5. Muestra la hora, minutos y segundos actuales
    rellotgeActualDiv.textContent = 
        `${formatDuesDigits(hora)}:${formatDuesDigits(minut)}:${formatDuesDigits(segon)}`;

    // 5.a Comprueba si la alarma ha de sonar (sólo en el segundo 00)
    if (alarmaEstablerta.activa && 
        alarmaEstablerta.hora === hora && 
        alarmaEstablerta.minut === minut && 
        segon === 0) {
        
        activaAlarma();
    }
}

//--------------------------------------------------------------------------------------

/**
 * 5.a ESTABLECER Y CANCELAR ALARMA
 */

btnEstablirAlarma.onclick = establirAlarma;

function establirAlarma() {
    // Si el botón está en modo "CANCEL·LAR", llamamos a esa función
    if (btnEstablirAlarma.textContent === "Cancel·lar Alarma") {
        cancelaAlarma();
        return;
    }
    
    const hora = parseInt(inputAlarmaHora.value);
    const minut = parseInt(inputAlarmaMinut.value);

    if (isNaN(hora) || isNaN(minut) || hora < 0 || hora > 23 || minut < 0 || minut > 59) {
        alert("Si us plau, introdueix una hora i un minut vàlids (HH:MM).");
        return;
    }

    alarmaEstablerta = {
        hora: hora,
        minut: minut,
        activa: true
    };
    
    estatAlarmaDiv.textContent = 
        `Alarma establerta per a les ${formatDuesDigits(hora)}:${formatDuesDigits(minut)}`;
    
    // Cambia la UI
    inputAlarmaHora.disabled = true;
    inputAlarmaMinut.disabled = true;
    btnEstablirAlarma.textContent = "Cancel·lar Alarma";
}

function cancelaAlarma() {
    aturarAudioAlarma(); // 5.b: Asegura que el audio se detiene si estaba sonando
    
    alarmaEstablerta.activa = false;
    alarmaEstablerta.hora = null;
    alarmaEstablerta.minut = null;
    
    estatAlarmaDiv.textContent = "Alarma no establerta";
    
    // Restaura la UI
    inputAlarmaHora.disabled = false;
    inputAlarmaMinut.disabled = false;
    btnEstablirAlarma.textContent = "Establir Alarma";
}

//--------------------------------------------------------------------------------------

/**
 * 5.b ACTIVACIÓN Y 5.c, 5.d, 5.e CONTROL DE AUDIO DE LA ALARMA
 */

function activaAlarma() {
    // 5.b: Alarma ha saltado
    reproduirAudioAlarma(); 
    estatAlarmaDiv.textContent = "!!! ALARMA SONANT !!! (Prem 'Aturar Música' o 'Cancel·lar Alarma')";
}

btnReproduirAudio.onclick = reproduirAudioAlarma;
function reproduirAudioAlarma() {
    // 5.c: Carrega la música seleccionada
    const musicaSrc = selectMusica.value;
    
    // Solo actualiza el src si es diferente
    if (idAlarmaAudio.src.indexOf(musicaSrc) === -1) {
        idAlarmaAudio.src = musicaSrc;
        idAlarmaAudio.load(); // Vuelve a cargar el archivo
    }

    // 5.d: Estableix el volum
    idAlarmaAudio.volume = parseFloat(inputVolum.value);
    idAlarmaAudio.loop = true; // La alarma siempre debe sonar en bucle
    
    idAlarmaAudio.play()
        .catch(error => {
            // Manejo de error si el navegador bloquea el auto-play
            console.warn("Reproducció d'àudio bloquejada. L'usuari ha de fer clic.", error);
        });
}

btnAturarAudio.onclick = aturarAudioAlarma;
function aturarAudioAlarma() {
    idAlarmaAudio.pause();
    idAlarmaAudio.currentTime = 0; // Reinicia l'àudio
    idAlarmaAudio.loop = false;
}

/**
 * 5.d GESTIÓN DEL VOLUMEN (Actualización en tiempo real)
 */
inputVolum.oninput = function() {
    idAlarmaAudio.volume = parseFloat(inputVolum.value);
};

//--------------------------------------------------------------------------------------

/**
 * INICIALIZACIÓN
 */
actualitzarRellotge(); // Llama una vez para mostrar la hora al cargar

// Configuración inicial del audio de la alarma
const musicaInicial = selectMusica.value;
idAlarmaAudio.src = musicaInicial;
idAlarmaAudio.volume = parseFloat(inputVolum.value);