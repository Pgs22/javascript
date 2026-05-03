const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");


const PORT = 8089;
const PERSONAJES_FILE = path.join(__dirname, "personajes.json");
const UPLOADS_DIR = path.join(__dirname, "uploads");
const PUBLIC_DIR = path.join(__dirname, "public");

function enviarArchivo(res, filePath) {
  const ext = path.extname(filePath);

  const tipos = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg"
  };

  fs.readFile(filePath, (error, contenido) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Archivo no encontrado");
      return;
    }

    res.writeHead(200, {
      "Content-Type": tipos[ext] || "text/plain; charset=utf-8"
    });

    res.end(contenido);
  });
}

function enviarJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  res.end(JSON.stringify(data, null, 2));
}

function leerBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", reject);
  });
}

function leerPersonajes() {
  if (!fs.existsSync(PERSONAJES_FILE)) {
    fs.writeFileSync(PERSONAJES_FILE, "[]", "utf8");
  }

  return JSON.parse(fs.readFileSync(PERSONAJES_FILE, "utf8"));
}

function guardarPersonajes(personajes) {
  fs.writeFileSync(PERSONAJES_FILE, JSON.stringify(personajes, null, 2), "utf8");
}

const server = http.createServer(async (req, res) => {
  const urlParseada = url.parse(req.url, true);

  if (req.method === "OPTIONS") {
    enviarJson(res, 200, { status: "ok" });
    return;
  }

  if (req.method === "GET" && urlParseada.pathname === "/") {
    enviarArchivo(res, path.join(PUBLIC_DIR, "index.html"));
    return;
  }

  if (req.method === "GET" && urlParseada.pathname === "/css/style.css") {
    enviarArchivo(res, path.join(PUBLIC_DIR, "css", "style.css"));
    return;
  }

  if (req.method === "GET" && urlParseada.pathname === "/js/app.js") {
    enviarArchivo(res, path.join(PUBLIC_DIR, "js", "app.js"));
    return;
  }

  // POST /persona
  if (req.method === "POST" && urlParseada.pathname === "/persona/") {
    try {
      const body = await leerBody(req);
      const personaje = JSON.parse(body);

      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR);
      }

      let rutaImagen = "";

      if (personaje.imageBase64 && personaje.imageName) {
        const partes = personaje.imageBase64.split(",");

        const infoBase64 = partes[0];
        const datosBase64 = partes[1];

        const extension = infoBase64.includes("png") ? "png" : "jpg";

        const nombreSeguro = personaje.name.replace(/\s+/g, "_").toLowerCase();
        const nombreArchivo = `${Date.now()}_${nombreSeguro}.${extension}`;

        const rutaServidor = path.join(UPLOADS_DIR, nombreArchivo);

        fs.writeFileSync(rutaServidor, Buffer.from(datosBase64, "base64"));

        rutaImagen = `/uploads/${nombreArchivo}`;
      }

      const personajes = leerPersonajes();

      const personajeGuardar = {
        name: personaje.name,
        height: personaje.height,
        hair_color: personaje.hair_color,
        skin_color: personaje.skin_color,
        eye_color: personaje.eye_color,
        birth_year: personaje.birth_year,
        gender: personaje.gender,
        image: rutaImagen
      };

      personajes.push(personajeGuardar);

      guardarPersonajes(personajes);

      enviarJson(res, 200, {
        status: "ok",
        message: "Personaje guardado correctamente",
        personaje: personajeGuardar
      });

    } catch (error) {
      enviarJson(res, 500, {
        status: "error",
        message: "Error al guardar personaje",
        error: error.message
      });
    }

    return;
  }

  // GET /personajes
  if (req.method === "GET" && urlParseada.pathname === "/personajes") {
    const personajes = leerPersonajes();
    enviarJson(res, 200, personajes);
    return;
  }

  if (req.method === "GET" && urlParseada.pathname.startsWith("/uploads/")) {
    enviarArchivo(res, path.join(__dirname, urlParseada.pathname));
    return;
  }

  // GET /persona/Nom Persona
  if (req.method === "GET" && urlParseada.pathname.startsWith("/persona/")) {
    const nombreUrl = urlParseada.pathname.replace("/persona/", "");
    const nombreBuscado = decodeURIComponent(nombreUrl).toLowerCase();

    const personajes = leerPersonajes();

    const personajeEncontrado = personajes.find(personaje =>
      personaje.name.toLowerCase() === nombreBuscado
    );

    if (!personajeEncontrado) {
      enviarJson(res, 404, {
        status: "error",
        message: "Personaje no encontrado"
      });
      return;
    }

    enviarJson(res, 200, personajeEncontrado);
    return;
  }

  enviarJson(res, 404, { error: "Ruta no encontrada" });
});

server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});