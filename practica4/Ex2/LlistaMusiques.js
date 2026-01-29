/*
    b. Crea una classe  LlistaMusiques 
        i. Getters i setters: 
            1. Titol (su nombre)
            2. Etiquetes (Tots, se pone como un array porque se pueden añadir más)
            3. Llistat de músiques (#disponibles, [tots], [musiques]) #es el nombre del objeto al crear llistat disponibles
*/

export class LlistaMusiques {
    _titol="";
    _etiquetes=[];
    _llistat_musiques=[];    

    constructor(titol = "Default", etiquetes=[], llista=[]){
        this.titol = titol
        this.etiquetes = etiquetes;
        this.llistat_musiques = llista;
    }

    /* *******************GETTERS***************** */
    get llistat(){
        return this._llistat_musiques;
    }
    get etiquetes(){
        return this._etiquetes;
    }
    get titol(){
        return this._titol;
    }

    /* *******************SETTERS***************** */
    set titol(titol){
        this._titol = titol;
    }

    set etiquetes(etiquete){
        if(Array.isArray(etiquete)){
            this._etiquetes=etiquete;
        }
    }

    set llistat(llista){
        if(Array.isArray(llista)){
            this._llistat_musiques=llista;
        }
    }    

    generaCodiHTML() {
    return `<div><h2>` + this.titol + `</h2>
                <div> Nom llista: ${this.titol}</div>
            </div>`;
}

}