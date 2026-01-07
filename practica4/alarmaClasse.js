/* ARRAYS I WINDOW 
• Classes 
• Objectes 
• Mòduls 
Programa els següents documents HTML amb els seus arxius JS corresponents. */ 

/*Alarma.html  
1. Millorarem la estructura de alarmes programant el seu codi en un mòdul, creant la classe Alarma i 
permetent crear una llista d’alarmes 
    a. Crea una classe Alarma amb com a mínim 
        i. Getter i Setter: 
            1. Títol 
            2. Hora 
            3. Minut 
            4. Segon 
            5. Hora_completa 
            6. Musica 
            7. Activa 
        ii. Afegeix els mètodes: 
            1. generaCodiHTML 
    b. Guarda-ho en un mòdul i des de un mòdul principal utilitza Alarma per crear varies alarmes 
*/

class ClasseAlarma{
    titol = ""; 
    hora;
    minut; 
    segon;
    hora_completa = "Hora: " +hora+ ":" +minut+ ":" +segon;
    musica = "";
    activa = "";
    constructor(titol="", hora=0, minut=0, segon=0, musica="", activa=""){
        this.titol=titol;
        this.hora=hora;
        this.minut=minut;
        this.segon=segon;
        this.musica=musica;
        this.activa=activa;
    }

}