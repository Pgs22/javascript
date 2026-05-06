const urlBase = "http://localhost/javascript/examen/servidor.php";

document.getElementById("btn_llista_naus").addEventListener("click", function() {
    let xhr = new XmlHttpRequest();
    xhr.open("GET", urlBase + "?action=ship_list", true);
    xhr.onreadystatechange = function(){
        document.getElementById("resultat").innerHTML="";
            if (xhr.readyState === 4 && xhr.status === 200) {
                
            }
    }
});