const urlBase = "http://localhost/javascript/examen/servidor.php";
// codigo 
document.getElementById("btn_crea_crew").addEventListener("click", function (){
    let name = document.getElementById("inp_crew_name").value;
    let age = document.getElementById("inp_crew_age").value;
    let race = document.getElementById("inp_crew_race").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", urlBase, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 201)){
            response = JSON.parse(xhr.responseText);
            let html = "";
            html += response.message;
            document.getElementById("div_output").innerHTML = html;
        }
    };
    console.log("Enviando petición..");
    let parametros = "action=crew_create" + "&name=" + name + "&age=" + age + "&race=" + race;
    xhr.send(parametros);
});