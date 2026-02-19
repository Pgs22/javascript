//Reproductor.html 
//2. Millora el reproductor d’àudio creant les classes Musica i Llista músiques. Segueix els següents punts:  
//    a. Crea una classe Musica amb com a mínim: 
//   i. Getters i setters: 
    //         1.  Titol - mínim de dos caràcters 
    //     2. nom de l’arxiu - mínim de un caràcter i acabat amb alguna extensió correcte 
    //         a. automàticament ha d’assignar la seva extensió com a  “media type”  
    //     3. media type  - rebrà la extensió i haurà d’assignar el media type segons: 
    //         a. mp3 -> audio/mpeg 
    //         b. ogg -> audio/ogg 
    //         c. wav -> audio/wav 
    //     4. etiquetes – un array de strings per classificar la música (jazz, pop, animades..) 


export class Musica {
    _titol ="";
    _nom = "";
    _mediaType = "";
    _etiquetes = [];

    constructor(titol, nom, etiquetes) {
        this.titol = titol;
        this.nom = nom;
        this.etiquetes = etiquetes;
    }

    get titol() {
        return this._titol;
    }
    get nom() {
        return this._nom;
    }
    get mediaType() {
        return this._mediaType;
    }
    get etiquetes(){
        return this._etiquetes;
    }

    set titol(titol) {
        if (titol.length >= 2) {
            this._titol = titol;
        }
    }
    set nom(nom){
        let ext = nom.split('.').pop();
        if (nom.length < 1 && ext === 'mp3' || ext === 'ogg' || ext === 'wav') {
            this._nom = nom;
            switch (ext) {
                case 'mp3': this._mediaType = 'audio/mp3'; break;
                case 'ogg': this._mediaType = 'audio/ogg'; break;
                case 'wav': this._mediaType = 'audio/wav'; break;
                default: break;
            }
        }else{
            console.log("El nom de l'arxiu no és vàlid");
        }
    }
    set etiquetes(etiquetes){
        this._etiquetes = etiquetes;
    }


    /**
     * Funcio per mostrar la informacio d'una musica
     * @returns {string} - Informacion de la musica
     */
    mostrarMusica() {
        //Obtenir llista de etiquetes de cada canço
        let etiquetesHTML = "";        
        this._etiquetes.forEach(function (etiqueta, index) {
            etiquetesHTML += etiqueta;
            //Per afegir una coma i un espai a cada volta que no sigui l'ultima
            if(index < this._etiquetes.length -1){
                etiquetesHTML += ", ";
            }
        });
        
        return `
        <div style="border:1px solid black">
            Titol: ${this.titol} <br>
            <span style="color:blue;"> Nom: ${this.nom} </span><br>
            Media Type: ${this.mediaType} <br>
            Etiquetes: ${etiquetesHTML} <br>
        </div>
        `;
    }
     

}