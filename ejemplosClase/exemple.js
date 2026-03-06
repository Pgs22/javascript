console.log("Hola Mon");
console.log("Que tal?");
//alert("Hola mon");
document.getElementById("exempleDiv").innerHTML = "Benvingut a JavaScript";
document.getElementById("btonEnviar")


//inner html me permite añadir codigo html
document.getElementById("exempleDiv").innerText="<h1>Hola</h1>" + nomusuari;
//cuando no queramos añadir codigo html, usar el innerText porque podrán añadir codigo html desde el navegador usando la consola
//el window no hace falta ponerlo, identifica desde que ventana estoy

function mostraMensaje(){

    
//let nomusuari = window.prompt("Com et dius");
let nomusuari = document.getElementById("inputNom").value;
document.getElementById("exempleDiv").innerHTML="<h1>Hola</h1>" + nomusuari;
//let edad = prompt("Cuantos años tienes");
let edad = document.getElementById("inputEdad").value;
let proximaEdad = parseInt(edad) + 10;

//parseInt sin decimales, paseFloat con decimales

if(isNaN(proximaEdad)){
    document.getElementById("exempleDiv").innerHTML="<h1>Siusplau introdueix un numero valid</h1>";
    document.getElementById("inputNom").style.backgroundColor="red";
}else{
    document.getElementById("exempleDiv").innerHTML="En 10 años tendras " + proximaEdad + "años";
    document.getElementById("inputEdad").style.backgroundColor="green";


}



}