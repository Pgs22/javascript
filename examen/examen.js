//GET sense parametres
document.getElementById("btn_llista_naus").addEventListener("click", function () {

    let xhr = new XMLHttpRequest();

    xhr.open("GET", urlBase + "?action=ship_list", true);
    xhr.onreadystatechange = function () {

      if (xhr.readyState === 4 && xhr.status === 200) {

        try {

          const response = JSON.parse(xhr.responseText);

          let html = "";

          response.data.forEach(function(nau) {
            html += "<p>" + nau.id + " - " + nau.name + "</p>";
          });

          document.getElementById("div_output").innerHTML = html;

        } catch (e) {

          console.error("Error JSON:", e);
        }
      }
    };

    xhr.send(null);

});


// GET con parámetros
// Ejemplo de HTML: <input type="text" id="inp_id">

// <button id="btn_info_nau">
//  Mostrar nave
// </button>

document.getElementById("btn_info_nau")
  .addEventListener("click", function () {

    let xhr = new XMLHttpRequest();

    // PARÁMETRO DEL USUARIO
    let id = document.getElementById("inp_id").value;

    xhr.open( "GET", urlBase + "?action=ship_info&id=" + encodeURIComponent(id), true);

    xhr.onreadystatechange = function () {

      if (xhr.readyState === 4 && xhr.status === 200) {

        try {

          const response = JSON.parse(xhr.responseText);

          let html = "";

          html += "<h3>" + response.data.name + "</h3>";
          html += "<p>ID: " + response.data.id + "</p>";
          html += "<p>Univers: " + response.data.universe + "</p>";
          html += "<p>Armament: " + response.data.armament + "</p>";

          document.getElementById("div_output").innerHTML = html;

        } catch (e) {

          console.error("Error JSON:", e);
        }
      }
    };

    xhr.send(null);

});


// POST crear un tripulante: ejemplo de htlml
//<input type="text" id="inp_name">
//<input type="text" id="inp_age">

//<button id="btn_crea_crew">
//  Crear tripulante
//</button>

document.getElementById("btn_crea_crew")
  .addEventListener("click", function () {

    let xhr = new XMLHttpRequest();

    // DATOS USUARIO
    let name = document.getElementById("inp_name").value;

    let age = document.getElementById("inp_age").value;

    // CONFIGURAR POST
    xhr.open("POST", urlBase, true);

    // CABECERA
    xhr.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    // RESPUESTA
    xhr.onreadystatechange = function () {

      if (xhr.readyState === 4 && xhr.status === 200) {

        try {

          const response = JSON.parse(xhr.responseText);

          let html = "";

          html += "<h3>Tripulante creado</h3>";
          html += "<p>ID: " + response.data.id + "</p>";
          html += "<p>Nom: " + response.data.name + "</p>";
          html += "<p>Edat: " + response.data.age + "</p>";

          document.getElementById("div_output").innerHTML = html;

        } catch (e) {

          console.error("Error JSON:", e);
        }
      }
    };

    // PARÁMETROS POST
    let parametros =
      "action=crew_create" +
      "&name=" + encodeURIComponent(name) +
      "&age=" + encodeURIComponent(age);

    // ENVIAR POST
    xhr.send(parametros);

});


// copia similar a foto menos foreach
const urlBase = "http://localhost/javascript/examen/servidor.php";

document.getElementById("btn_llista_naus").addEventListener("click", function() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", urlBase + "?action=ship_list", true);
    xhr.onreadystatechange = function(){
        document.getElementById("resultat").innerHTML="";
        if (xhr.readyState === 4 && xhr.status === 200) {
            try{
                const response = JSON.parse(xhr.responseText);

                let html = "";
                response.data.forEach((nau) => {
                    html += `<p>${nau.id} - ${nau.name}</p>`;
                });

                document.getElementById("resultat").innerHTML = html;

            } catch (e){
                console.log("Error al convertir de Json a objeto js");
            }
        }
    }
    console.log("Enviando petición AJAX");
    xhr.send();
});