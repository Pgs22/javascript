/*
    b. Crea una classe  LlistaMusiques 
        i. Getters i setters: 
            1. Titol (su nombre)
            2. Etiquetes (Tots, se pone como un array porque se pueden añadir más)
            3. Llistat de músiques (#disponibles, [tots], [musiques]) #es el nombre del objeto al crear llistat disponibles
*/

export class LlistaMusiques {
    _titol = "";
    _etiquetes = [];
    _llistat_musiques = [];

    constructor(titol = "Default", etiquetes = [], llista = []) {
        this.titol = titol;
        this.etiquetes = etiquetes;
        this.llistat_musiques = llista;
    }

    get llistat_musiques() { return this._llistat_musiques; }
    get etiquetes() { return this._etiquetes; }
    get titol() { return this._titol; }

    set titol(titol) { this._titol = titol; }
    set etiquetes(etiquete) { if (Array.isArray(etiquete)) this._etiquetes = etiquete; }
    set llistat_musiques(llista) { if (Array.isArray(llista)) this._llistat_musiques = llista; }

    mostraMusiques() {
        let llistatHTML = "<ul>";
        this.llistat_musiques.forEach((musica) => {
            llistatHTML += `
                <li>
                    <strong>${musica.titol}</strong> (${musica.mediaType})<br>
                    <audio controls>
                        <source src="${musica.nom}" type="${musica.mediaType}">
                        Tu navegador no soporta audio.
                    </audio>
                    <p>Etiquetas: ${musica.etiquetes.join(", ")}</p>
                </li>`;
        });
        llistatHTML += "</ul>";
        return llistatHTML;
    }

    generaCodiHTML() {
        return `
            <div style="border-bottom: 2px solid black; padding: 10px;">
                <h2>Llista: ${this.titol}</h2>
                <div><strong>Etiquetes:</strong> ${this.etiquetes.join(", ")}</div>
                <div><strong>Cançons:</strong><br> ${this.mostraMusiques()}</div>
            </div>`;
    }
}