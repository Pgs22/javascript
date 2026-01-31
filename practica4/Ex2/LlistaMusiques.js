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
        let llistatString = "";
        this.llistat_musiques.forEach(function(musica) {
            llistatString += `
                <div style="margin-bottom: 10px; border-top: 1px dashed #ccc;">
                    <p><strong>${musica.titol}</strong> (${musica.etiquetes.join(", ")})</p>
                    <audio controls style="height: 30px;">
                        <source src="${musica.nom}" type="${musica.mediaType}">
                        El teu navegador no suporta audio.
                    </audio>
                </div>`;
        });
        return llistatString || "<p>Llista buida</p>";
    }

    generaCodiHTML() {
        return `
            <h2>Llista: ${this.titol}</h2>
            <p><strong>Etiquetes de llista:</strong> ${this.etiquetes.length > 0 ? this.etiquetes.join(", ") : "Cap"}</p>
            <div>${this.mostraMusiques()}</div>
        `;
    }
}