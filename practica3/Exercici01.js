//Permet iniciar la finestra Despertador.html en el que es mostri la hora actual
//https://www.w3schools.com/jsref/met_win_open.asp
let btn_mostra_despertador = document.getElementById("btn_mostra_despertador");
let btn_tanca_despertador = document.getElementById("btn_tanca_despertador");
let ref_window;
btn_mostra_despertador.onclick = function(){
    let altura=screen.availHeight /2;
    let amplada=screen.availWidth /2;
    let width_window=300;
    let height_window=300;
    ref_window = window.open("Despertador.html","Despertador",
        `width=`+width_window+`px,height=`+height_window+`px,toolbar=no,scrollbars=no, top=`
        +(altura-height_window/2)+`px, left=`+(amplada-width_window/2)+`px`);
    
    windown.setTimeout(function(){
        ref_window.document.body.style.backgroundColor="blue";
    }, 1000 );
}
btn_tanca_despertador.onclick = function(){
    ref_window.close();
}

const btn_set_alarma =document.getElementById("btn_set_alarma");
btn_set_alarma.onclick=function(){
    let hora = document.getElementById("inputHora").value;
    let minut = document.getElementById("inputMinut").value;
    let segon = document.getElementById("inputSegon").value;
    ref_window.document.getElementById("div_hora_alarma").innerHTML=hora+":"+minut+":"+segon;

}

let colorFilla = 'orange;';
function getColorFilla(){
    return colorFilla;
}

function mostrarHoraFilla(){
    window.setInterval(function(){
        let hora = new Date();
        ref_window.document.getElementById("div_hora_actual").innerHTML= hora.getHours()+
        ":"+hora.getMinutes()+":"+hora.getSeconds();
    }, 1000)
}


//Tpfp veure splice
llista_numeros= new Array(10);
for(let k=0;k<llista_mumeros.length;k++ ){
    llista_numeros[k]=k;

}
//splice()
// Elimina en la posicion donde se encuentre que le indicas en el primer digito y el segundo digito elimina todos los que sigan hasta ese fin
llista_numeros.splice(2,3)
console.log(llista_numeros);
llista_mumeros.splice(8,1)
console.log(llista_numeros)
//si le pones 0 no elimina
//tambien se puede usar para añadir elementos:
llista_numeros.splice(llista_numeros.length,0,"Hola");
console.log(llista_numeros)
llista_mumeros.splice(2,10)


//creaun array ex2

//guardo la primera cancion
song1= new Array();
song1=["titul",".mp3","nom"];

//guardo las canciones añadidas
reproductor= new Array();
reproductor[0]=song1;
console.log(song1)
console.log(reproductor)



/*
for(let k=0;k<llista_mumeros.length;k++ ){
    llista_numeros[k]=k;

}*/