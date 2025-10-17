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


/******************************* PROPIETATS COMPTADOR */

let inputMinuts = document.getElementById("inputMinuts");
let inputSegons = document.getElementById("inputSegons");
let estatMinuts = document.getElementById("estatComptadorMinuts");
let estatSegons = document.getElementById("estatComptadorSegons");

let referenciaSetIntervalComptador = null;

let bton_aturar = document.getElementById("aturarComptador");
let bton_iniciar = document.getElementById("iniciarComptador");

let tempsRestant = 0;

bton_aturar.onclick=aturarComptador;
function aturarComptador(){
    //Para parar la función interval usamos el clear y establecemos a null su variable
    window.clearInterval(referenciaSetIntervalComptador);
    referenciaSetIntervalComptador = null;
    //Reseteamos todo a 0
    tempsRestant = 0;
    inputMinuts.value = "0";
    inputSegons.value = "0";
    //Llamamos a la función para mostrar contador
    mostraComptador()
}

bton_iniciar.onclick=iniciaComptaEnrere;
function iniciaComptaEnrere(){
    //Si ya hay un contador en marcha, que no se pueda iniciar y salga
    if (referenciaSetIntervalComptador !== null) {
        return;
    }   
    const minuts = parseInt(inputMinuts.value);
    const segons = parseInt(inputSegons.value);
    //Pasar los minutos a segundos para sumar el tiempo total
    tempsRestant = (minuts * 60) + segons;
    //Si el tiempo total es mayo a 0, iniciar el contador
    if(tempsRestant <= 0){
        //Falta crear función estado del contador
        return;
    }
    //Para no repetir los calculos en la función actualiza la ejecutamos antes del intervalo
    actualitzarComptador();
    //Para restar segundos al contador iniciado se llama a otra función
    referenciaSetIntervalComptador = window.setInterval(actualitzarComptador, 1000);
}

function actualitzarComptador(){
    //Para restar segundos en cada intervalo:
    tempsRestant--;
    //Para parar el contador si llega a 0
    if (tempsRestant <= 0) {
        window.clearInterval(referenciaSetIntervalComptador);
        referenciaSetIntervalComptador = null;
        tempsRestant = 0;
    }
    mostraComptador()
}

function mostraComptador() {
    if(tempsRestant <= 0){
        estatComptadorMinuts.innerHTML= `${inputMinuts} minuts i`;
        estatComptadorSegons.innerHTML = `${inputSegons} segons`;
        return;
    }
    //Convertir tempsRestant a minutos usar funcion Math.floor() que solo se queda con el numero entero
    const min = Math.floor(tempsRestant / 60);
    //Para los segundos, extraer solo el número decimal que serán los segundos, usamos el resto
    const sec = tempsRestant % 60;

    estatComptadorMinuts.innerText= `${min} minuts i`;
    estatComptadorSegons.innerText = `${sec} segons`;
}


// Element Audio afegit a l'HTML id="idAudio" src="FANFARE1.WAV">
const idAudio = document.getElementById("idAudio");



/* /****************FUNCIONS *********************** */
/*
function aturaAudio()
function iniciarCompteEnrere()
function pausarComptador()
*/





/* *************** ATURAR ÀUDIO (Funció Helper) ********************** */
function aturaAudio() {
    idAudio.pause();
    idAudio.currentTime = 0; // Reinicia l'àudio
    idAudio.loop = false;
}




/*
5. 5p] Afegeix un rellotge que mostri la hora, minuts i segons actuals i s’actualitzi cada segon.
a. Afegeix la possibilitat d’establir una alarma que avisi en una hora en concret
b. Al saltar l’alarma aconsegueix que soni una música i que es pugui aturar
c. L’usuari pot escollir entre diferents músiques
d. L’usuari pot establir el volum
e. En qualsevol moment l’usuari pot reproduir i aturar la música de l’alarma
*/
