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

//accedir a #taula_propietats
const div_taula_propietats= document.getElementById("taula_propietats");

function generaTaulaPropietats(){
//crear una taula dins #taula_propietats
div_taula_propietats.innerHTML=`
        <table>
            <tr>
                <td>Valor máxim que pot tenir un número JS</td>
                <td>`+Number.MIN_VALUE+`</td>
            </tr>
            <tr>
                <td>Altura total de la pantalla</td>
                <td>`+screen.availWidth+`</td>
            </tr>
            <tr>
                <td>Altura interna de la finestra</td>
                <td>`+window.innerWidth+`</td>
            </tr>            
            <tr>
                <td>URL de la web</td>
                <td>`+location.href+`</td>
            </tr>
            
        </table>`;

}


/*
Afegeix al document HTML un compte enrere inicialment a 00minuts i 00segons
a.Permet que l’usuari pugui establir quants minuts i segons vol que duri.
b.Permet que l’usuari inicií el compte enrere i el pugui aturar (restablint-lo a 0) i pausar
c.Quan el compte enrere arribi a 0, avisa amb una música i permet que es pugui aturar.
*/

//Crea un comptador
let comptador=10;

let referenciaSetIntervalHora= window.setInterval(generaContaEnrere, 60);

//Crear una funcio que aturi en interval de temps
function aturaIntervalHora(){
  window.clearInterval(referenciaSetIntervalHora);
}





//Pendent de veure 
console.log("Minuts?");
let nomusuari = document.getElementById("inputMinuts").value;
console.log("Segons?");
document.getElementById("Iniciar Comptador")
document.getElementById("Aturar Comptador")
document.getElementById("Pausar Comptador")