// En aquesta activitat heu d’ampliar l’activitat anterior a partir dels següents requisits:
// Alarma.html
// 1. Alarma.html ha de tenir un formulari per crear alarmes noves 
// validant totes les dades abans de crear l’objecte Alarma:

    // a. El formulari ha de permetre introduir:
        // i. Títol de l’alarma (input text)
        // ii. Hora, minut i segon (inputs number)
        // iii. Música (select amb les músiques disponibles del reproductor)
        // iv. Activa (checkbox)

//Crear constructor i getters i setters per a la classe Alarma amb les següents propietats:
    // a. Títol de l’alarma (mínim 2 caràcters)
    // b. Hora, minut i segon (validar que són números i que estan dins dels rangs correctes)
    // c. Música (ha de ser un objecte del tipus Musica)
    // d. Activa (boolean)

import { Musica } from "./Musica.js";
import { LlistaMusiques } from "./LlistaMusiques.js";

// 1. Datos iniciales
const llista_inicial = new LlistaMusiques("Disponibles", ["tots"], [
    new Musica("Drum Beat", "DRUMC0.WAV", ["percusio"], "audio/wav"),
    new Musica("Fanfare", "FANFARE1.WAV", ["efectes"], "audio/wav"),
    new Musica("Ek Raat Vilen", "ek_raat_vilen.mp3", ["pop"], "audio/mpeg")
]);

// 2. Definición de la Clase Alarma
class Alarma {
    _activa = false;

    constructor(titol, hora, minut, segon, musica, activa) {
        this.titol = titol;
        this.hora = hora;
        this.minut = minut;
        this.segon = segon;
        this.musica = musica;
        this.activa = activa;
    }

    // GETTERS
    get titol() { return this._titol; }
    get hora() { return this._hora; }
    get minut() { return this._minut; }
    get segon() { return this._segon; }
    get musica() { return this._musica; }
    get activa() { return this._activa; }

    // SETTERS amb les validacions
    set titol(titol) {
        if (titol.length >= 2) {
            this._titol = titol;
        } else {
            throw new Error("El títol ha de tenir al menys 2 caràcters.");
        }
    }
    set hora(hora) {
        let n = parseInt(hora);
        if (!isNaN(n) && n >= 0 && n <= 23) {
            this._hora = n;
        } else {
            throw new Error("L'hora ha d'estar entre 0 i 23.");
        }
    }
    set minut(minut) {
        let n = parseInt(minut);
        if (!isNaN(n) && n >= 0 && n <= 59) {
            this._minut = n;
        } else {
            throw new Error("El minut ha d'estar entre 0 i 59.");
        }
    }
    set segon(segon) {
        let n = parseInt(segon);
        if (!isNaN(n) && n >= 0 && n <= 59) {
            this._segon = n;
        } else {
            throw new Error("El segon ha d'estar entre 0 i 59.");
        }
    }
    set musica(musica) { this._musica = musica; }
    set activa(activa) { this._activa = activa; }
}


let alarmes = new Map();

// Formulari per crear alarmes, capturem names dels inputs
function inicializarFormulario() {
    const form = document.forms["form_alarma"];
    const select = form["musica"];
    // Omplim el select amb les músiques disponibles del reproductor
    llista_inicial.llistat_musiques.forEach((m, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.text = m.titol;
        select.appendChild(opt);
    });
}

// Per afegir un 0 davant si té mes d'un dígit
function formatearNumero(numero) {
    if (numero < 10) {
        return "0" + numero;
    }
    return numero;
}

// Per validar alarmes abans d'enviar formulari
function clk_validaAlarma() {
    const f = document.forms["form_alarma"];
    
    // Captura nodos per name, no per id como feiam abans
    const titol = f["titol"].value; 

    // Captura valors formulari - Per capturar, entre [] tenim el name del input
    let h = f["hora"].value;
    let m = f["minut"].value;
    let s = f["segon"].value;

    // Per afegir un 0 davant si té mes d'un dígit
    const horaFormat = formatearNumero(h);
    const minutFormat = formatearNumero(m);
    const segonFormat = formatearNumero(s);

    // Ahora creamos la clave para el Map (ya se verá como 08:05:00)
    const horaCompleta = `${horaFormat}:${minutFormat}:${segonFormat}`;
    
    let formOk = true;

    // --- VALIDACIONES ---
    
    // Validació titol amb formulari
    const spanTitol = f["titol"].nextElementSibling; //Saltamos al nodo siguiente sin contar espacios
    if (titol.length < 3) {
        spanTitol.innerText = "Mínim 3 caràcters";
        spanTitol.style.color = "red";
        formOk = false;
    } else {
        spanTitol.innerText = "OK";
        spanTitol.style.color = "green";
    }

    // Validació hora completa (si ja existeix al Map)
    const spanReloj = f["segon"].nextElementSibling; //Saltamos al nodo siguiente sin contar espacios
    if (alarmes.has(horaCompleta)) {
        spanReloj.innerText = "Aquesta hora ja existeix!";
        spanReloj.style.color = "red";
        formOk = false;
    } else {
        spanReloj.innerText = "";
    }

    // crear formulari amb map si la validació és correcta
    if (formOk) {
        try {

            // Usamos la funcion llistat_musiques con el parametro entrada que ""Obtenemos el objeto Musica seleccionado capturado anteriormente como indice del select
            const musica = llista_inicial.llistat_musiques[musicaIdx];

            // Crear instancia
            const nuevaAlarma = new Alarma(titol, h, m, s, musica, activa);
            
            // Guardar en Map
            alarmes.set(horaCompleta, nuevaAlarma);
            
            console.log("Mapa actual d'alarmes:", alarmes);
            alert(`Alarma "${titol}" creada a les ${horaCompleta}`);
            
            f.reset(); // Neteja el formulari
            mostrarAlarmasConsola(); // Funció per veure el Map
            
        } catch (error) {
            alert(error.message);
        }
    }
}

// Funció per visualitzar hora alarmes guardades recorrent el Map
function mostrarAlarmasConsola() {
    console.log("--- RECORRE MAP llistat alarmes ---");
    for (let [hora, alarma] of alarmes.entries()) {
        console.log(`Clau: ${hora} | Títol: ${alarma.titol} | Música: ${alarma.musica.titol}`);
    }
}

// Events
window.onload = () => {
    inicializarFormulario();
    document.getElementById("bnt_valida").onclick = clk_validaAlarma;
};


