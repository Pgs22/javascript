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

class Alarma {
    constructor(titulo, hora, minuto, segundo, musica, activa) {
        this.titulo = titulo;
        this.hora = hora;
        this.minuto = minuto;
        this.segundo = segundo;
        this.musica = musica;
        this.activa = activa;
    }
}

// Map per guardar alarmes
let alarmes = new Map();

// formulari html
const form = document.getElementById("form_alarma");

document.getElementById("bnt_valida").onclick = clk_validaNomInput;

alarmes.set("alarma 1", 0, 0, 0, "DRUMC0.WAV", true);
alarmes.set("alarma 2", 12, 30, 0, "DRUMC0.WAV", true);
alarmes.set("alarma 3", 1, 0, 0, "DRUMC0.WAV", true);


