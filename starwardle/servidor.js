const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 8089;

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

const server = http.createServer((req, res) => {
  const urlParseada = url.parse(req.url, true);

  let pathname = urlParseada.pathname;

  if (pathname === "/") {
    pathname = "/index.html";
  }

  const filePath = path.join(PUBLIC_DIR, pathname);

  enviarArchivo(res, filePath);
});

server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});