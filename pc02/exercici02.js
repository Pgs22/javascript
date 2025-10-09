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

// Elements del document html dels input
const inputMinuts = document.getElementById("inputMinuts");
const inputSegons = document.getElementById("inputSegons");
const estatComptador = document.getElementById("estatComptador");
// Elements del document html dels botons
const btnIniciar = document.getElementById("iniciarComptador")
const btnAturar = document.getElementById("aturarComptador")
const btnPausar = document.getElementById("pausarComptador")

// Element Audio (Assumeix que l'HTML té <audio id="alarmaAudio" src="FANFARE1.WAV"></audio>)
const alarmaAudio = new Audio('FANFARE1.WAV');

// Variables del comptador
let tempsRestantSegons = 0; 
let referenciaSetIntervalComptador = null;
let estaPausat = false;

/* /****************FUNCIONS *********************** */

/* *************** ACTUALITZA ********************** */
function actualitzaCompteEnrere(){
    if (estaPausat) return; // Sortir

    if (tempsRestantSegons <= 0) {
        aturaCompteEnrere(true); // El temps ha finalitzat, atura l'interval
        estatComptador.textContent = "FI"; // Missatge de finalització
        
        // C. Quan el compte enrere arribi a 0, avisa amb una música
        alarmaAudio.loop = true; // Per a que la música es repeteixi
        alarmaAudio.play().catch(e => console.error("Error al reproduir l'àudio:", e));

        // Un cop ha acabat, només pot aturar-se (el botó d'Aturar gestiona l'àudio)
        btnAturar.disabled = false;
        btnIniciar.disabled = true;
        btnPausar.disabled = true;

        return;
    }

    tempsRestantSegons--;
    mostraTemps();
}

/* *************** INICIAR COMPTADOR ********************** */
function iniciarCompteEnrere() {
    // Assegura't que l'àudio està aturat i reiniciat abans d'un nou inici/represa
    aturaAudio();

    // 1. Reprèn des de la pausa
    if (referenciaSetIntervalComptador && estaPausat) {
        estaPausat = false;
        btnPausar.textContent = 'Pausar';
        // Habilitats dels botons
        btnIniciar.disabled = true;
        btnPausar.disabled = false;
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
        btnPausar.disabled = false; // Habilita Pausar
        btnAturar.disabled = false; // Habilita Aturar
        
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
    
    // C. Atura la música si s'estava reproduint
    aturaAudio();

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
    // Si ha finalitzat, el display es manté amb el missatge "FI" (set a actualitzaCompteEnrere)
}

/* *************** ATURAR ÀUDIO (Funció Helper) ********************** */
function aturaAudio() {
    alarmaAudio.pause();
    alarmaAudio.currentTime = 0; // Reinicia l'àudio
    alarmaAudio.loop = false;
}


/* *************** MOSTRAR COMPTADOR ********************** */
function mostraTemps() {
    const min = Math.floor(tempsRestantSegons / 60);
    const sec = tempsRestantSegons % 60;

    const minutsStr = String(min).padStart(2, '0');
    const segonsStr = String(sec).padStart(2, '0');

    estatComptador.textContent = `${minutsStr} minuts i ${segonsStr} segons`;
}

// ACCIONS DELS BOTONS
btnIniciar.addEventListener('click', iniciarCompteEnrere);
btnPausar.addEventListener('click', pausarComptador);
// C. El botó Aturar també atura la música i reinicia el comptador
btnAturar.addEventListener('click', () => aturaCompteEnrere(false)); 



/*
5. 5p] Afegeix un rellotge que mostri la hora, minuts i segons actuals i s’actualitzi cada segon.
a. Afegeix la possibilitat d’establir una alarma que avisi en una hora en concret
b. Al saltar l’alarma aconsegueix que soni una música i que es pugui aturar
c. L’usuari pot escollir entre diferents músiques
d. L’usuari pot establir el volum
e. En qualsevol moment l’usuari pot reproduir i aturar la música de l’alarma
*/