let form_ext = document.forms["form_practica"];
form_ext["codigo"].addEventListener("input", valida_codigo);
form_ext.addEventListener("submit", valida_formulario);
function valida_formulario(evt) {
    let formk = true;
    valida_codigo() ? formk : formk = false;
    valida_formulario() ? formk : formk = false;
    if (!formk){
        evt.preventDefault();
    }
}

function valida_codigo() {
    form_ext["codigo"].setCustomValidity("");
    if(!form_ext["codigo"].checkValidity()){
        if(form_ext["codigo"].validity.patternMismatch){
            form_ext["codigo"].nextElementSibling.innerText = "minimo 3 letras y mayus";
            form_ext["codigo"].setCustomValidity("3 letras mayus");
            form_ext["codigo"].reportValidity();
        } 
        return false;
    } else {
        form_ext["codigo"].nextElementSibling.innerText = "";
    }
    return true;
}

function valida_pass() {
    form_ext["pass"].setCustomValidity("");
    if(!form_ext["pass"].checkValidity()){
        if(form_ext["pass"].validity.patternMismatch){
            form_ext["pass"].nextElementSibling.innerText = "minimo 4 numeros y max 8";
            form_ext["pass"].setCustomValidity("minimo 4 numeros y max 8");
            form_ext["pass"].reportValidity();
        } 
        return false;
    } else {
        form_ext["pass"].nextElementSibling.innerText = "";
    }
    return true;
}

function valida_formulario() {
    form_ext["terminos"].setCustomValidity("");
    if (form_ext["terminos"].value == "no") {
        form_ext["terminos"].nextElementSibling.innerText = "Debe aceptar los terminos";
        form_ext["terminos"].setCustomValidity("Debe aceptar los terminos");
        form_ext["terminos"].validity.valid = false;
        form_ext["termino"].reportValidity();
        return false;
    } 
    return true;
}
