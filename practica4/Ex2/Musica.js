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

//2. Millora el reproductor d’àudio creant les classes Musica i Llista músiques. Segueix els següents punts:  
//    a. Crea una classe Musica amb com a mínim: 
class Musica {
    //Creamos una variable privada que asignamos automaticamente en el setter 
    _mediaType="";
    _etiquetes=[];
    //_etiquetes=["jazz", "pop", "animades", "rock", "clasica"];
    
    //Creamos el constructor
    constructor(titol = "Default", nom="", etiquetes=[]){        
        this.titol = titol       
        this.nom = nom
        this.etiquetes = etiquetes // Seleccionar más de un choisse del html
    }
//2.a.i. Getters i setters:
    get mediaType(){
        return this._mediaType;
    }
    get titol(){
        return this._titol;
    }
    get nom(){
        return this._nom;
    }
    get etiquetes(){
        return this._etiquetes;
    }

//2.a.i.1.  Titol - mínim de dos caràcters 
    set titol(titol){
        if(titol.length>2){
            this._titol = titol;
        }
    }

//2.a.2. nom de l’arxiu - mínim de un caràcter i acabat amb alguna extensió correcte
//2.a.2.a. automàticament ha d’assignar la seva extensió com a  “media type”
    set nom(nom){
        if((nom.length>1) & (nom.includes("."))){
                const validMusicExtensions = ["mp3", "wav", "ogg", "flac", "m4a"];    
                //Para separar donde encuentre punto en un array y elimina el punto         
                const partes = fileName.split('.'); //La extension esta al final del array
                //Nos quedamos solo con la extension si tiene más de un caracter:
                const extension = partes.length > 1 ? partes.pop().toLowerCase() : "";
                //Comprobamos si la extensión coincide con algun elemento del array
                if(validMusicExtensions.includes(extension)){
                    this._titol = titol;
                    //2.a.3. media type  - rebrà la extensió i haurà d’assignar el media type segons: 
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
            console.log("No contiene . el nombre del archivo");
        }        
    }

//2.a.4. etiquetes – un array de strings per classificar la música (jazz, pop, animades..) 
    set etiquetes(etiquetes){
        if(etiquetes.includes(etiquetes=[])){
            this._etiquetes=etiquetes;
        }
    }

}