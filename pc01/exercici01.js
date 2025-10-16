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
let referenciaSetIntervalHora= window.setInterval(generaLlistaPropietats, 1000);

//Afegir audio part 2 exercici 1
let audio = new Audio();
audio.src="DRUMC0.WAV";
AudioBufferSourceNode.canPlayType("audio/wav; codecs=1");
//audio.play();
//audio.loop=true;
const btn_play = document.getElementById("bton_play");
const btn_stop = document.getElementById("bton_stop");
const btn_pause = document.getElementById("bton_pause");

bton_play.style.backgroundColor="orange";
bton_play.onclick=playMusic;
let audio_actual="";
function playMusic(){
  const select_music=document.getElementById("select_music");
  if(audio.src!= select_music.value){
    audio.src=select_music.value;
    audio_actual=select_music.value;
  }
    
  audio.play();
}

bton_stop.onclick=stopMusic;
function stopMusic(){
  audio.pause();
  audio.currentTime=0;
}

/*
bton_stop.onclick=stopMusic;
stopMusic=function (){
  audio.pause();
  audio.currentTime=0;
}

Funció anónima:
bton_stop.onclick= function (){
  audio.pause();
  audio.currentTime=0;
}
  */

btn_pause.onclick=pauseMusic;
function pauseMusic(){
  audio.pause();
}