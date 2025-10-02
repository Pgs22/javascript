  /*  Crea un document HTML amb un div amb id “llista_propietats”. Programa amb JS que es creï una llista amb els següents missatges i amb els valors obtinguts dinàmicament:
a. Valor mínim que pot tenir un número JS
b. Amplada total de la pantalla
c. Amplada interna de la finestra
d.Títol de la web
e.Hora actual*/


//accedir a #llista_propietats
const div_llista_propietats= document.getElementById("llista_propietats");

function generaLlistPropietats(){
  let hora_actual = new Date();
//crear una llista dins #llista_propietats
div_llista_propietats.innerHTML=
`<ul> <li>valor minimo que tiene que tener`+Number.MIN_VALUE+`</li> 
<li>Amplada total de la pantalla` +screen.with +`</li>
<li>Amplada interna finestra`+window.innerHTML+`</li>
<li>titl de la web $(document.title)</li>
<li>Hora actual` + hora_actual.getHours()+ `: ` +
  hora_actual.getMinutes()+`:`+
  hora_actual.getSeconds()+`</li>
          </ul>`;
          return function(){console.log("hurray!!")};

}
generaLlistaPropietats();
window.setInterval(generaLlistaPropietats, 1000);