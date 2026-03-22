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
import { mapLlistes } from "./reproductor.js";

const llista_inicial = new LlistaMusiques("Disponibles", ["tots"], [
    new Musica("Drum Beat", "DRUMC0.WAV", ["percusio"], "audio/wav"),
    new Musica("Fanfare", "FANFARE1.WAV", ["efectes"], "audio/wav"),
    new Musica("Ek Raat Vilen", "ek_raat_vilen.mp3", ["pop"], "audio/mpeg")
]);

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

    get titol() { return this._titol; }
    get hora() { return this._hora; }
    get minut() { return this._minut; }
    get segon() { return this._segon; }
    get musica() { return this._musica; }
    get activa() { return this._activa; }


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

setInterval(() => {
    const ara = new Date();
    const h = ara.getHours().toString().padStart(2, '0');
    const m = ara.getMinutes().toString().padStart(2, '0');
    const s = ara.getSeconds().toString().padStart(2, '0');
    
    const clauHoraActual = `${h}:${m}:${s}`;

    if (alarmes.has(clauHoraActual)) {
        const alarmaAReproduir = alarmes.get(clauHoraActual);
        if (alarmaAReproduir.activa) {
            sonarAlarma(alarmaAReproduir);
        }
    }
}, 1000);

function sonarAlarma(objAlarma) {
    const canco = objAlarma.musica; 
    if (canco && canco.fitxer) {
        const audio = new Audio("audio/" + canco.fitxer);
        audio.play();
        alert(`Alarma: ${objAlarma.titol}\n ${canco.titol}`);
    }
}


function inicializarFormulario() {
    const form = document.forms["form_alarma"];
    const select = form["musica"];

    const llistaDisponibles = mapLlistes.get("Disponibles") || llista_inicial;

llistaDisponibles.llistat_musiques.forEach((m, index) => {
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

function clk_validaAlarma() {
    const f = document.forms["form_alarma"];
    const titol = f["titol"].value; 
    const h = f["hora"].value;
    const m = f["minut"].value;
    const s = f["segon"].value;
    const musicaIdx = f["musica"].value;
    const activa = f["activa"].checked;

    const horaCompleta = `${formatearNumero(h)}:${formatearNumero(m)}:${formatearNumero(s)}`;
    let formOk = true;

    // Validació títol
    const spanTitol = f["titol"].nextElementSibling;
    if (titol.length < 3) {
        spanTitol.innerText = "Mínim 3 caràcters";
        spanTitol.style.color = "red";
        formOk = false;
    } else {
        spanTitol.innerText = "OK";
        spanTitol.style.color = "green";
    }

    // Validació hora duplicada
    const spanReloj = f["segon"].nextElementSibling;
    if (alarmes.has(horaCompleta)) {
        spanReloj.innerText = "Aquesta hora ja existeix!";
        spanReloj.style.color = "red";
        formOk = false;
    } else {
        spanReloj.innerText = "";
    }

    if (formOk) {
        try {
            // Buscar select musisc
            const llistaDisponibles = mapLlistes.get("Disponibles") || llista_inicial;
            const musicaObjecte = llistaDisponibles.llistat_musiques[musicaIdx];

            const nuevaAlarma = new Alarma(titol, h, m, s, musicaObjecte, activa);
            
            // Guardar en Map
            alarmes.set(horaCompleta, nuevaAlarma);
            
            alert(`Alarma "${titol}" creada a les ${horaCompleta}`);
            f.reset();
            mostrarAlarmasConsola(); 
            
        } catch (error) {
            alert(error.message);
        }
    }
}

function mostrarAlarmasConsola() {
    console.log("Llistat alarmes");
    alarmes.forEach((alarma, clau) => {
        console.log(`Hora: ${clau} | Títol: ${alarma.titol} | Estat: ${alarma.activa ? 'Activa' : 'Inactiva'}`);
    });
}

window.onload = () => {
    inicializarFormulario();
    document.getElementById("bnt_valida").onclick = clk_validaAlarma;
}; 