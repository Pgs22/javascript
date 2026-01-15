    //   i. Getters i setters: 
    //         1.  Titol - mínim de dos caràcters 
    //     2. nom de l’arxiu - mínim de un caràcter i acabat amb alguna extensió correcte 
    //         a. automàticament ha d’assignar la seva extensió com a  “media type”  
    //     3. media type  - rebrà la extensió i haurà d’assignar el media type segons: 
    //         a. mp3 -> audio/mpeg 
    //         b. ogg -> audio/ogg 
    //         c. wav -> audio/wav 
    //     4. etiquetes – un array de strings per classificar la música (jazz, pop, animades..) 

class Musica {
    //Creamos una variable privada que asignamos automaticamente en el setter 
    _mediaType=""
    constructor(titol = "Default", nom, etiquetes){        
        this.titol = titol       
        this.nom = nom
        this.etiquetes = etiquetes
        this.media = media
    }

//1.  Titol - mínim de dos caràcters 
    set titol(titol){
        if(titol.length>2){
            this._titol = titol;
        }
    }
    get mediaType(){
        return this._mediaType;
    }
//2. nom de l’arxiu - mínim de un caràcter i acabat amb alguna extensió correcte
//a. automàticament ha d’assignar la seva extensió com a  “media type”
    set nom(nom){
        if(nom.length>1){
            if(nom.content(".")){
                const validMusicExtensions = ["mp3", "wav", "ogg", "flac", "m4a"];                
                const partes = fileName.split('.');
                //Nos quedamos solo conla extension:
                const extension = partes.length > 1 ? partes.pop().toLowerCase() : "";
                //Comprobamos si la extensión coincide con algun elemento del array
                if(validMusicExtensions.includes(extension)){
                    this._titol = titol;
                    //3. media type  - rebrà la extensió i haurà d’assignar el media type segons: 
                    //         a. mp3 -> audio/mpeg 
                    //         b. ogg -> audio/ogg 
                    //         c. wav -> audio/wav  
                    this._mediaType = extension;
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
                        default:
                            console.log('no tiene extension media type');
                            break;
                    }
                   

                }                
            }
        }
        
    }
    
}