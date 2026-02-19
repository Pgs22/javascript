/*
    b. Crea una classe  LlistaMusiques 
        i. Getters i setters: 
            1. Titol (su nombre)
            2. Etiquetes (Tots, se pone como un array porque se pueden añadir más)
            3. Llistat de músiques (#disponibles, [tots], [musiques]) #es el nombre del objeto al crear llistat disponibles
*/
import { Musica } from "./Musica.js";
export class LlistaMusiques{
    _titol = "";
    _etiquetes = [];
    _llistatMusiques = [];

    constructor (titol, etiquetes, llistatMusiques){
        this.titol = titol;
        this.etiquetes = etiquetes;
        this.LlistaMusiques = llistatMusiques;
    }

    get titol(){
        return this._titol;
    }
    get etiquestes(){
        return this._etiquetes;
    }
    get llistatMusiques(){
        return this._llistatMusiques;
    }

    set titol(titol){
        this._titol = titol;
    }
    set etiquetes(etiquetes){
        this._etiquetes = etiquetes;
    }
    set llistatMusiques(llistatMusiques){
        this._llistatMusiques = llistatMusiques;
    }

    /**
     * Funcion para mostrar listas de listas de musica
     * @param {LlistaMusiques[]} llistat - Array de listas de musica
     */
generaCodiHTML() {
    let llistaHTML = `<div> Titol llista: ${this.titol} <br>`; // Usa el getter
    this._llistatMusiques.forEach(function(musica) {
        llistaHTML += musica.mostrarMusica();
    }, this); // <-- ¡Añade este 'this' aquí!
    llistaHTML += `</div><hr>`; // Usa el mismo nombre de variable
    return llistaHTML;
}

}