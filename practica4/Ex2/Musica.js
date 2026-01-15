class Musica {
    constructor(titol = "Default", nom, etiquetes){        
        this.titol = titol       
        this.nom = nom
        this.etiquetes = etiquetes



    }

    set titol(titol){
        if(titol.length>2){
            this._titol = titol;
        }
    }

    mediaType(nom) {
        if(nom.length>2){
            this._nom = nom
        }
    }
    
}