document.body.style.backgroundColor = window.opener.colorFilla;
//cridem a mostrarHora Filla de la finestra mare
window.opener.mostrarHoraFilla();
//Quan el despertador arribi a l'hora establerta, fes vibrar el despertador
window.setInterval(checkHoraAlarma, 1000);
function checkHoraAlarma() {
    let hora_alarma = document.getElementById("div_hora_alarma").innerText;
    let hora_actual = document.getElementById("div_hora_actual").innerText;
    if (hora_actual == hora_alarma && hora_actual != "") {
        window.setInterval(function () {
            window.document.body.style.backgroundColor = llista_colors[numeroColor % 4]; //truco!! per no tenir que fer un if, fem agrupacions de 4 numeros amb la resta %
            numeroColor++;
        }, 500)

    }
}
let llista_colors = new Array();
llista_colors[0] = "yellow";
llista_colors[1] = "orange";
llista_colors[2] = "pink";
llista_colors[3] = "red";
let numeroColor = 0;

/**
 * teoria
let sta_numeros = new Array(5,3,"Hola");
llista_numeros.length=10; //añade las posiciones que faltan vacias hasta llegar a 10
llista_numeros[20]="ultim"; //posicion 20 añado 1
llista_numeros.length=3; //se elimina todo hasta que solo tenga 3 posiciones
llista_numeros[9]=new Array("Jose","Lito");
console.log(llista_numeros); //nos muestra lo que hay en el array
console.log(llista_numeros[9][1]); //veremos Lito

let llista_valors = ["hello","array"];
console.log(llista_valors);
llista_valors[1] = ["Maria", "Antonia"]; // me crea un array en la posicion 1 donde tenia un string 

for(let k=0; k < llista_numeros.length;k++){
    console.log(k+"-"+llista_numeros[k]);
}

llista_numeros.forEach( function(value,index){
    console.log(index+"::"+value);
});

llista_numeros["titol"]=["llista numeros"];
llista_numeros["modul"]=" entorn client";
console.log(llista_numeros);
console.log(llista_numeros["titol"]);/*Un objeto solo tiene funciones y atributos
//A cualquier objeto le puedo crear nuevos atributos 
console.log(llista_numeros.titol); /*Un objeto solo tiene funciones y atributos
//A cualquier objeto le puedo crear nuevos atributos 
//En un array los numeros son enteros de los indices
*/



