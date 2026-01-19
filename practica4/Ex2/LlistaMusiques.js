/*
    b. Crea una classe  LlistaMusiques 
        i. Getters i setters: 
            1. Titol 
            2. Etiquetes 
            3. Llistat de músiques   
*/

class LlistaMusiques {
    _llistat=[];
    _etiquetes=[];
    _titol="";

    constructor(titol = "Default", etiquetes=[], llistat=[]){
        this.titol = titol
    }

    /* *******************GETTERS***************** */
    get llistat(){
        return this._llistat;
    }
    get etiquetes(){
        return this._etiquetes;
    }
    get titol(){
        return this._titol;
    }

    /* *******************SETTERS***************** */
    set llistat(llistat=[]){
        this._llistat = llistat;
    }


    //aqui creo un objecte de musica

}