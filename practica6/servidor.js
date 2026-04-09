const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Configuració de les capçaleres CORS (opcional però útil)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Gestionem els paràmetres i l'endpoint amb el mòdul url
    // El segon paràmetre 'true' indica que volem que 'query' sigui un objecte
    let url_parse = url.parse(req.url, true);

    let info_peticio = {
        "req_method": req.method,
        "req_url": req.url,
        "req_url_decoded": decodeURIComponent(req.url),
        "url_parse_pathname": url_parse.pathname,
        "url_parse_search": url_parse.search,
        "url_parse_query": url_parse.query
    };

    // Indiquem que la resposta és un JSON i el codi d'estat és 200 (OK)
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    // Escrivim el contingut i tanquem la connexió
    res.write(JSON.stringify(info_peticio, null, 2)); // El 'null, 2' és per formatar el JSON
    res.end();
});

// El servidor escolta al port 8089
server.listen(8089, () => {
    console.log('Servidor iniciat a http://localhost:8089');
});