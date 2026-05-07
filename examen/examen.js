urlBase = "http://localhost/javascript/examen/servidor.php";
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