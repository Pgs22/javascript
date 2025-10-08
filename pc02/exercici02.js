  /*  
Exercici02.html
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
//generaTaulaPropietats();


/*
4.3p] Afegeix al document HTML un compte enrere inicialment a 00minuts i 00segons
a.Permet que l’usuari pugui establir quants minuts i segons vol que duri.
b.Permet que l’usuari inicií el compte enrere i el pugui aturar (restablint-lo a 0) i pausar
c.Quan el compte enrere arribi a 0, avisa amb una música i permet que es pugui aturar.
*/

//Elements del document html dels input
const inputMinuts = document.getElementById('inputMinuts');
const inputSegons = document.getElementById('inputSegons');
const estatComptador = document.getElementById('estatComptador');
//Elements del document html dels botons
const btnIniciar = document.getElementById("Iniciar Comptador")
const btnAturar = document.getElementById("Aturar Comptador")
const btnPausar =  document.getElementById("Pausar Comptador")
//Variables
let tempsRestantSegons = 0; 
let referenciaSetIntervalComptador = null;
let estaPausat = false;
/* /****************FUNCIONS *********************** 
function actualitzaCompteEnrere()
function iniciarCompteEnrere()
function pausarComptador()
function aturaCompteEnrere()
function mostraTemps()
btnIniciar.addEventListener('click', iniciarCompteEnrere);
*/

/* *************** ACTUALITZA ********************** */
function actualitzaCompteEnrere(){
    if (estaPausat) return; // Sortir

    if (tempsRestantSegons <= 0) {
        aturaCompteEnrere(true); // temps consumit
        estatComptador.textContent = "00minuts i 00segons"; // Mostrar estat comptador 0
        return;
    }

    tempsRestantSegons--;
    mostraTemps();
}

/* *************** INICIAR COMPTADOR ********************** */
function iniciarCompteEnrere() {
    // 1. Reprèn des de la pausa
    if (referenciaSetIntervalComptador && estaPausat) {
        estaPausat = false;
        btnPausar.textContent = 'Pausar';
        // Habilitats dels botons
        btnIniciar.disabled = true;
        btnPausar.disabled = false;
        // Quan es reprèn, no s'actualitza tempsRestantSegons des dels inputs
        return;
    }
    
    // 2. Primer Inici
    if (referenciaSetIntervalComptador === null) {
        // LLEGIM ELS VALORS DE L'USUARI
        const minuts = parseInt(inputMinuts.value) || 0;
        const segons = parseInt(inputSegons.value) || 0;
        
        tempsRestantSegons = (minuts * 60) + segons;
        
        if (tempsRestantSegons <= 0) {
            alert("Si us plau, introdueix un temps major a zero (minuts o segons).");
            return;
        }

        // Configuració inicial
        inputMinuts.disabled = true;
        inputSegons.disabled = true;
        btnIniciar.disabled = true;
        btnPausar.disabled = false;
        
        mostraTemps();
        
        // Inicia l'interval a 1000ms (1 segon)
        referenciaSetIntervalComptador = window.setInterval(actualitzaCompteEnrere, 1000);
    }
}

/* *************** PAUSAR COMPTADOR ********************** */
function pausarComptador() {
    if (referenciaSetIntervalComptador) {
        estaPausat = !estaPausat; 
        
        if (estaPausat) {
            btnPausar.textContent = 'Reprendre';
            btnIniciar.disabled = false; // Permet iniciar (o reprendre) si està pausat
        } else {
            btnPausar.textContent = 'Pausar';
            btnIniciar.disabled = true;
        }
    }
}

/* *************** ATURAR COMPTADOR ********************** */
function aturaCompteEnrere(haFinalitzat = false) {
    window.clearInterval(referenciaSetIntervalComptador);
    referenciaSetIntervalComptador = null;
    estaPausat = false;

    // Restableix l'estat dels controls
    inputMinuts.disabled = false;
    inputSegons.disabled = false;
    btnIniciar.disabled = false;
    btnPausar.disabled = true;
    btnPausar.textContent = 'Pausar';

    if (!haFinalitzat) {
        // Si s'atura manualment, reinicia el display a 00:00
        tempsRestantSegons = 0;
        estatComptador.textContent = "00 minuts i 00 segons"; 
    }
}


/* *************** MOSTRAR COMPTADOR ********************** */
function mostraTemps() {
    const min = Math.floor(tempsRestantSegons / 60);
    const sec = tempsRestantSegons % 60;

    const minutsStr = String(min).padStart(2, '0');
    const segonsStr = String(sec).padStart(2, '0');

    estatComptador.textContent = `${minutsStr} minuts i ${segonsStr} segons`;
}

//ACCIONS
btnIniciar.addEventListener('click', iniciarCompteEnrere);
btnPausar.addEventListener('click', pausarComptador);
btnAturar.addEventListener('click', () => aturaCompteEnrere(false)); 


/* *************** PARTE AUDIO ********************** */
/*

let audio = document.getElementById("audio");
audio.addEventListener("canplaythrough", function(){
    timer.max=audio.duration;
    timer_span.max=audio.duration;
    let ref_interval = window.setInterval(function(){
        timer.value = audio.currentTime;
        timer_span.innerText=audio.currentTime
        if(audio.currentTime== audio.duration){
            window.clearInterval(ref_interval)
        }
    } ,1000)
})
const timer = document.getElementById("timer");
const timer_span=document.getElementById("timer_span");

function playAudio(){
    audio.src="DRUMC0.WAV";
    audio.play();
}
function playAudio2(){
    audio.src="FANFARE1.WAV";
    audio.play();
}
function clk_btn_stopAudio(){
    audio.pause()
    audio.currentTime=0;
}
function clk_btn_mute(){
    audio.muted=!audio.muted;
}
function clk_btn_volUp(){
    try{
        audio.volume +=0.2
    }catch(e){
        audio.volume=1
    }    
    document.getElementById("vol").value=audio.volume;
}
function clk_btn_volDown(){
    try{
        audio.volume-=0.2
    }catch(e){
        audio.volume=0
    }
    document.getElementById("vol").value=audio.volume;
}

function change_inp_vol(){
    audio.volume= document.getElementById("vol").value;
}

window.setTimeout(
    function(){
        document.getElementById("timer_span").innerText = audio.duration;
    },500
);


*/



/*
5. 5p] Afegeix un rellotge que mostri la hora, minuts i segons actuals i s’actualitzi cada segon.
a. Afegeix la possibilitat d’establir una alarma que avisi en una hora en concret
b. Al saltar l’alarma aconsegueix que soni una música i que es pugui aturar
c. L’usuari pot escollir entre diferents músiques
d. L’usuari pot establir el volum
e. En qualsevol moment l’usuari pot reproduir i aturar la música de l’alarma
*/