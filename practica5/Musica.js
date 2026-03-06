// mantenemos de la practica 4 en la practica 5 para crear objetos de tipo Musica
export class Musica {
    _titol = "";
    _nom = "";
    _etiquetes = [];
    _mediaType = "";

    constructor(titol = "Default", nom = "", etiquetes = []) {
        this.titol = titol;
        this.nom = nom;
        this.etiquetes = etiquetes;
    }

    /**
     * GETTERS
     */
    get titol() {
        return this._titol;
    }
    get nom() {
        return this._nom;
        
    }
    get etiquetes() {
        return this._etiquetes;
    }
    get mediaType() {
        return this._mediaType;        
    }

    /**
     * SETTERS
     */
    set titol(titol) {
        if (titol.length >= 2) { // Mínimo 2 caracteres
            this._titol = titol;
        }
    }
    set nom(nom) {
        if (nom.length > 1 && nom.includes(".")) {
            const validMusicExtensions = ["mp3", "wav", "ogg"];
            
            // Separamos por el punto y nos quedamos con la última parte
            const partes = nom.split('.');
            const extension = partes.pop().toLowerCase();

            if (validMusicExtensions.includes(extension)) {
                this._nom = nom;
                
                // Asignamos el mediaType según la extensión usando un switch
                switch (extension) {
                    case 'mp3':
                        this._mediaType = 'audio/mpeg';
                        break;
                    case 'ogg':
                        this._mediaType = 'audio/ogg';
                        break;
                    case 'wav':
                        this._mediaType = 'audio/wav';
                        break;
                }
            } else {
                console.error("Extensió no vàlida");
            }
        } else {
            console.error("El nom de l'arxiu no és correcte");
        }
    }
    set etiquetes(etiquete) {
        this._etiquetes = etiquete;
    }

    afegirEtiquete(etiquete) {
        if (!this._etiquetes.includes(etiquete)) {
            this._etiquetes.push(etiquete);
        }
    }

    eliminarEtiquete(etiquete) {
        const index = this._etiquetes.indexOf(etiquete);
        if (index !== -1) {
            this._etiquetes.splice(index, 1);
        }
    }

}