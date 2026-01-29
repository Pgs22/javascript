/*
    b. Crea una classe  LlistaMusiques 
        i. Getters i setters: 
            1. Titol (su nombre)
            2. Etiquetes (Tots, se pone como un array porque se pueden añadir más)
            3. Llistat de músiques (#disponibles, [tots], [musiques]) #es el nombre del objeto al crear llistat disponibles
*/

class LlistaMusiques {
    _titol="";
    _etiquetes=[];
    _llistat_musica=[];    

    constructor(titol = "Default", etiquetes=[], llistat_musica=[]){
        this.titol = titol
        this.etiquetes = etiquetes;
        this.llistat_musica = llistat_musica;
    }

    /* *******************GETTERS***************** */
    get llistat(){
        return this._llistat_musica;
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
            this._etiquetes=etiquetes;
        }
    }

    set llistat(llista){
        if(Array.isArray(llista)){
            this._llistat_musicat=llista;
        }
    }    

}