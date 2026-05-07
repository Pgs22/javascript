// GET Lista
// crear xhr
// open GET
// parse JSON
// forEach
// innerHTML
// send(null)

// GET detalle
// leer input
// parámetro URL
// GET
// mostrar objeto
// send(null)


// POST
// leer formulario
// POST
// setRequestHeader
// crear parámetros
// send(parametros)

//GET sense parametres
const urlBase = "http://localhost/javascript/examen/servidor.php";
document.getElementById("btn_llista_naus").addEventListener("click", function () {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", urlBase + "?action=ship_list", true);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200){
      try{
        const response = JSON.parse(xhr.responseText);
        let html="";
        response.data.forEach(function (nau){
          html += "<p>" + nau.id + " - " + nau.name + "</p>"
        });
        document.getElementById("div_output").innerHTML = html;
      } catch (e) {
        console.log("Error paseando a JSON", e);
      }
    }
  };
  console.log("Enviando peticion..");
  xhr.send();
});


// GET con parámetros
// Ejemplo de HTML: <input type="text" id="inp_id">

// <button id="btn_info_nau">
//  Mostrar nave
// </button>

document.getElementById("btn_info_nau").addEventListener("click", function () {

    let xhr = new XMLHttpRequest();

    xhr.open("GET", urlBase + "?action=ship_read&id=3", true);

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {

            const response = JSON.parse(xhr.responseText);

            let html = "";
            html += "<h3>" + response.data.name + "</h3>";
            html += "<p>ID: " + response.data.id + "</p>";
            html += "<p>Univers: " + response.data.universe + "</p>";
            html += "<p>Armament: " + response.data.armament + "</p>";

            document.getElementById("div_output").innerHTML = html;
        }
    };

    xhr.send();
});


// POST crear un tripulante: ejemplo de htlml
//<input type="text" id="inp_name">
//<input type="text" id="inp_age">

//<button id="btn_crea_crew">
//  Crear tripulante
//</button>

document.getElementById("btn_crea_crew").addEventListener("click", function () {

    let xhr = new XMLHttpRequest();

    let name = document.getElementById("inp_name").value;
    let age = document.getElementById("inp_age").value;

    xhr.open("POST", urlBase, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {

            const response = JSON.parse(xhr.responseText);

            let html = "";
            html += "<h3>Tripulante creado</h3>";
            html += "<p>ID: " + response.data.id + "</p>";
            html += "<p>Nom: " + response.data.name + "</p>";
            html += "<p>Edat: " + response.data.age + "</p>";

            document.getElementById("div_output").innerHTML = html;
        }
    };

    let parametros =
        "action=crew_create" +
        "&name=" + name +
        "&age=" + age;

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



// POST de crear nave:
document.getElementById("btn_crear_nau").addEventListener("click", function () {

  let xhr = new XMLHttpRequest();

  let name = document.getElementById("inp_name_ship").value;
  let universe = document.getElementById("inp_universe").value;
  let armament = document.getElementById("inp_armament").value;

  xhr.open("POST", urlBase, true);

  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {

    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {
      console.log("Respuesta del servidor:", xhr.responseText);
      const response = JSON.parse(xhr.responseText);

      let html = "";
      html += "<h3>Nau creada</h3>";
      html += "<p>ID: " + response.data.id + "</p>";
      html += "<p>Nom: " + response.data.name + "</p>";
      html += "<p>Univers: " + response.data.universe + "</p>";
      html += "<p>Armament: " + response.data.armament + "</p>";

      document.getElementById("div_output").innerHTML = html;
    }
  };

  let parametros =
      "action=ship_create" +
      "&name=" + name +
      "&universe=" + universe +
      "&armament=" + armament;

  xhr.send(parametros);

});