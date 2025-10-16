  /* Utilitza Bootstrap per donar estils als HTML.  
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
generaTaulaPropietats();



/*
4.3p] Afegeix al document HTML un compte enrere inicialment a 00minuts i 00segons
a.Permet que l’usuari pugui establir quants minuts i segons vol que duri.
b.Permet que l’usuari inicií el compte enrere i el pugui aturar (restablint-lo a 0) i pausar
c.Quan el compte enrere arribi a 0, avisa amb una música i permet que es pugui aturar.
*/

// Elements del document html dels input
const inputMinuts = document.getElementById("inputMinuts");
const inputSegons = document.getElementById("inputSegons");
const estatComptador = document.getElementById("estatComptador");
// Elements del document html dels botons
const btnIniciar = document.getElementById("iniciarComptador")
const btnAturar = document.getElementById("aturarComptador")
const btnPausar = document.getElementById("pausarComptador")

// Element Audio afegit a l'HTML id="idAudio" src="FANFARE1.WAV">
const idAudio = document.getElementById("idAudio");

// Variables del comptador
let tempsRestantSegons = 0; 
let referenciaSetIntervalComptador = null;
let estaPausat = false;

/* /****************FUNCIONS *********************** */
/*
function mostraTemps()
function aturaAudio()
function aturaCompteEnrere(haFinalitzat = false)
function actualitzaCompteEnrere()
function iniciarCompteEnrere()
function pausarComptador()
*/



/* *************** MOSTRAR COMPTADOR ********************** */
function mostraTemps() {
    const min = Math.floor(tempsRestantSegons / 60);
    const sec = tempsRestantSegons % 60;

    const minutsStr = String(min).padStart(2, '0');
    const segonsStr = String(sec).padStart(2, '0');

    estatComptador.textContent = `${minutsStr} minuts i ${segonsStr} segons`;
}

/* *************** ATURAR ÀUDIO (Funció Helper) ********************** */
function aturaAudio() {
    idAudio.pause();
    idAudio.currentTime = 0; // Reinicia l'àudio
    idAudio.loop = false;
}

/* *************** ATURAR COMPTADOR ********************** */
function aturaCompteEnrere(haFinalitzat = false) {
    window.clearInterval(referenciaSetIntervalComptador);
    referenciaSetIntervalComptador = null;
    estaPausat = false;
    
    if (idAudio.paused === false) { aturaAudio(); }

    inputMinuts.disabled = false;
    inputSegons.disabled = false;
    btnIniciar.disabled = false;
    btnPausar.disabled = true;
    btnPausar.textContent = 'PAUSAR';
    btnAturar.disabled = true; 

    if (!haFinalitzat) {
        tempsRestantSegons = 0;
        mostraTemps(); 
    } else {
        btnAturar.disabled = false;
    }
}

/* *************** ACTUALITZA ********************** */
function actualitzaCompteEnrere(){
    if (estaPausat) return;

    if (tempsRestantSegons <= 0) {
        // Atura l'interval
        window.clearInterval(referenciaSetIntervalComptador);
        referenciaSetIntervalComptador = null;

        estatComptador.textContent = "FI! 🎶"; 
        
        // Activar alarma (Punt c)
        idAudio.loop = true;
        idAudio.src = "FANFARE1.WAV"; 
        idAudio.load();
        idAudio.play(); 
        
        btnIniciar.disabled = true;
        btnPausar.disabled = true;
        btnAturar.disabled = false;
        
        return;
    }

    tempsRestantSegons--;
    mostraTemps();
}

/* *************** INICIAR COMPTADOR ********************** */
function iniciarCompteEnrere() {
    // 1. Reprendre des de pausa
    if (estaPausat) {
        estaPausat = false;
        btnPausar.textContent = 'PAUSAR';
        btnIniciar.disabled = true;
        btnPausar.disabled = false;
        return;
    }
    
    // 2. Primer Inici (Només si no hi ha un interval actiu)
    if (referenciaSetIntervalComptador === null) {
        // LLEGIM ELS VALORS DE L'USUARI (Punt a)
        const minuts = parseInt(inputMinuts.value) || 0;
        const segons = parseInt(inputSegons.value) || 0;
        
        tempsRestantSegons = (minuts * 60) + segons;
        
        if (tempsRestantSegons <= 0) {
            alert("Si us plau, introdueix un temps major a zero.");
            return;
        }

        // Configuració d'inputs i botons
        inputMinuts.disabled = true;
        inputSegons.disabled = true;
        btnIniciar.disabled = true;
        btnPausar.disabled = false; 
        btnAturar.disabled = false; 
        
        mostraTemps();
        
        // ** INICI DE L'INTERVAL per capturar el temps inicial **
        referenciaSetIntervalComptador = window.setInterval(actualitzaCompteEnrere, 1000);
    }
}

/* *************** PAUSAR COMPTADOR ********************** */
function pausarComptador() {
    if (referenciaSetIntervalComptador) {
        estaPausat = !estaPausat; 
        
        if (estaPausat) {
            btnPausar.textContent = 'REPRENDRE';
            btnIniciar.disabled = false; 
        } else {
            btnPausar.textContent = 'PAUSAR';
            btnIniciar.disabled = true;
        }
    }
}


// ACCIONS DELS BOTONS
btnIniciar.addEventListener('click', iniciarCompteEnrere);
btnPausar.addEventListener('click', pausarComptador);
// Stura la música i reinicia el comptador
btnAturar.addEventListener('click', () => aturaCompteEnrere(false)); 

//Executar inici de comptador a 00:00 i controls per aturar la música
document.addEventListener('DOMContentLoaded', () => {
    // Inicialitza l'estat dels botons i el display a 00:00
    aturaCompteEnrere(false); 
});




/*
5. 5p] Afegeix un rellotge que mostri la hora, minuts i segons actuals i s’actualitzi cada segon.
a. Afegeix la possibilitat d’establir una alarma que avisi en una hora en concret
b. Al saltar l’alarma aconsegueix que soni una música i que es pugui aturar
c. L’usuari pot escollir entre diferents músiques
d. L’usuari pot establir el volum
e. En qualsevol moment l’usuari pot reproduir i aturar la música de l’alarma
*/