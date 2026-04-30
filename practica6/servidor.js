const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 8089;
const DATA_FILE = path.join(__dirname, 'personatges.json');
const STARWARDLE_FILE = path.join(__dirname, 'starwardle.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const PUBLIC_DIR = path.join(__dirname, 'public');

function ensureStorage() {
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    }
    if (!fs.existsSync(STARWARDLE_FILE)) {
        fs.writeFileSync(STARWARDLE_FILE, JSON.stringify({ targetName: "" }, null, 2));
    }
}

function readPersonatges() {
    ensureStorage();
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    try {
        const data = JSON.parse(raw);
        return Array.isArray(data) ? data : [];
    } catch (err) {
        return [];
    }
}

function writePersonatges(list) {
    ensureStorage();
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

function readStarwardle() {
    ensureStorage();
    const raw = fs.readFileSync(STARWARDLE_FILE, 'utf8');
    try {
        return JSON.parse(raw);
    } catch (err) {
        return { targetName: "" };
    }
}

function writeStarwardle(data) {
    ensureStorage();
    fs.writeFileSync(STARWARDLE_FILE, JSON.stringify(data, null, 2));
}

function sendJson(res, statusCode, payload) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(payload, null, 2));
}

function sendText(res, statusCode, payload) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'text/plain');
    res.end(payload);
}

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        default:
            return 'application/octet-stream';
    }
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

function parseMultipart(bodyBuffer, boundary) {
    const bodyStr = bodyBuffer.toString('latin1');
    const parts = bodyStr.split(`--${boundary}`);
    const fields = {};
    const files = [];

    parts.forEach((part) => {
        let clean = part.replace(/^\r\n/, '').replace(/\r\n$/, '');
        if (!clean || clean === '--') {
            return;
        }

        const splitIndex = clean.indexOf('\r\n\r\n');
        if (splitIndex === -1) {
            return;
        }

        const rawHeaders = clean.slice(0, splitIndex);
        let rawData = clean.slice(splitIndex + 4);
        if (rawData.endsWith('\r\n')) {
            rawData = rawData.slice(0, -2);
        }
        const headers = rawHeaders.split('\r\n');
        const disp = headers.find((h) => h.toLowerCase().startsWith('content-disposition'));
        if (!disp) {
            return;
        }

        const nameMatch = /name="([^"]+)"/.exec(disp);
        const filenameMatch = /filename="([^"]*)"/.exec(disp);
        const fieldName = nameMatch ? nameMatch[1] : null;
        if (!fieldName) {
            return;
        }

        if (filenameMatch && filenameMatch[1]) {
            const filename = path.basename(filenameMatch[1]);
            const contentTypeHeader = headers.find((h) => h.toLowerCase().startsWith('content-type'));
            const contentType = contentTypeHeader ? contentTypeHeader.split(':')[1].trim() : 'application/octet-stream';
            files.push({
                fieldName,
                filename,
                contentType,
                data: Buffer.from(rawData, 'latin1')
            });
        } else {
            fields[fieldName] = rawData;
        }
    });

    return { fields, files };
}

function saveUploadedFile(filePart) {
    ensureStorage();
    const safeName = filePart.filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storedName = `${Date.now()}_${safeName}`;
    const storedPath = path.join(UPLOAD_DIR, storedName);
    fs.writeFileSync(storedPath, filePart.data);
    return storedName;
}

function upsertPersona(list, persona) {
    const idx = list.findIndex((p) => (p.name || '').toLowerCase() === (persona.name || '').toLowerCase());
    if (idx >= 0) {
        list[idx] = { ...list[idx], ...persona };
    } else {
        list.push(persona);
    }
    return list;
}

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }

    const urlParse = url.parse(req.url, true);
    const pathname = decodeURIComponent(urlParse.pathname || '/');

    if (req.method === 'GET' && (pathname === '/' || !pathname.startsWith('/persona/') && !pathname.startsWith('/uploads/') && !pathname.startsWith('/starwardle/'))) {
        const relPath = pathname === '/' ? 'async.html' : pathname.replace(/^\//, '');
        const filePath = path.join(PUBLIC_DIR, relPath);
        if (!filePath.startsWith(PUBLIC_DIR)) {
            sendText(res, 403, 'Forbidden');
            return;
        }
        if (!fs.existsSync(filePath)) {
            sendText(res, 404, 'Not found');
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', getMimeType(filePath));
        fs.createReadStream(filePath).pipe(res);
        return;
    }

    if (req.method === 'GET' && pathname.startsWith('/uploads/')) {
        const relPath = pathname.replace(/^\/uploads\//, '');
        const filePath = path.join(UPLOAD_DIR, relPath);
        if (!filePath.startsWith(UPLOAD_DIR)) {
            sendText(res, 403, 'Forbidden');
            return;
        }
        if (!fs.existsSync(filePath)) {
            sendText(res, 404, 'Not found');
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', getMimeType(filePath));
        fs.createReadStream(filePath).pipe(res);
        return;
    }

    if (req.method === 'GET' && pathname.toLowerCase().startsWith('/persona/')) {
        const name = pathname.replace(/^\/persona\//i, '').trim();
        if (!name) {
            sendJson(res, 400, { error: 'Nom de persona buit.' });
            return;
        }
        const list = readPersonatges();
        const found = list.find((p) => (p.name || '').toLowerCase() === name.toLowerCase());
        if (!found) {
            sendJson(res, 404, { error: 'Persona no trobada.' });
            return;
        }
        sendJson(res, 200, found);
        return;
    }

    if (req.method === 'POST' && pathname.toLowerCase() === '/persona/') {
        const contentType = req.headers['content-type'] || '';
        const bodyBuffer = await readBody(req);
        let persona = {};
        let storedFileName = null;

        if (contentType.startsWith('application/json')) {
            try {
                persona = JSON.parse(bodyBuffer.toString('utf8'));
            } catch (err) {
                sendJson(res, 400, { error: 'JSON invalid.' });
                return;
            }
        } else if (contentType.startsWith('multipart/form-data')) {
            const boundaryMatch = /boundary=([^;]+)/i.exec(contentType);
            if (!boundaryMatch) {
                sendJson(res, 400, { error: 'Boundary no trobat.' });
                return;
            }
            const boundary = boundaryMatch[1];
            const parsed = parseMultipart(bodyBuffer, boundary);
            persona = parsed.fields;
            if (parsed.files.length > 0) {
                storedFileName = saveUploadedFile(parsed.files[0]);
                persona.image = storedFileName;
                persona.imageUrl = `/uploads/${storedFileName}`;
            }
        } else {
            sendJson(res, 415, { error: 'Tipus de contingut no suportat.' });
            return;
        }

        if (!persona.name) {
            sendJson(res, 400, { error: 'Falta el camp name.' });
            return;
        }

        const list = readPersonatges();
        const updated = upsertPersona(list, persona);
        writePersonatges(updated);

        sendJson(res, 200, {
            ok: true,
            message: 'Persona guardada correctament.',
            persona
        });
        return;
    }

    if (req.method === 'POST' && pathname.toLowerCase() === '/starwardle/start') {
        const list = readPersonatges();
        if (!list.length) {
            sendJson(res, 400, { error: 'No hi ha personatges guardats.' });
            return;
        }
        const random = list[Math.floor(Math.random() * list.length)];
        writeStarwardle({
            targetName: random.name || "",
            startedAt: new Date().toISOString()
        });
        sendJson(res, 200, { ok: true, message: 'Starwardle iniciat.' });
        return;
    }

    if (req.method === 'GET' && pathname.toLowerCase() === '/starwardle/search') {
        const query = (urlParse.query.query || '').toString().trim().toLowerCase();
        if (!query) {
            sendJson(res, 200, { results: [] });
            return;
        }
        const list = readPersonatges();
        const results = list
            .map((p) => p.name || '')
            .filter((name) => name.toLowerCase().startsWith(query));
        sendJson(res, 200, { results });
        return;
    }

    if (req.method === 'POST' && pathname.toLowerCase() === '/starwardle/check') {
        const bodyBuffer = await readBody(req);
        let payload = {};
        try {
            payload = JSON.parse(bodyBuffer.toString('utf8'));
        } catch (err) {
            sendJson(res, 400, { error: 'JSON invalid.' });
            return;
        }
        const name = (payload.name || '').toString().trim();
        if (!name) {
            sendJson(res, 400, { error: 'Falta el nom.' });
            return;
        }
        const stored = readStarwardle();
        if (!stored.targetName) {
            sendJson(res, 400, { error: 'Starwardle no iniciat.' });
            return;
        }
        const list = readPersonatges();
        const target = list.find((p) => (p.name || '').toLowerCase() === stored.targetName.toLowerCase());
        if (!target) {
            sendJson(res, 404, { error: 'Personatge objectiu no trobat.' });
            return;
        }
        const guess = list.find((p) => (p.name || '').toLowerCase() === name.toLowerCase());
        if (!guess) {
            sendJson(res, 404, { error: 'Personatge no trobat.' });
            return;
        }

        const fields = ['name', 'height', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'];
        const comparisons = fields.map((field) => {
            const guessValue = (guess[field] || '').toString();
            const targetValue = (target[field] || '').toString();
            const match = guessValue.toLowerCase() === targetValue.toLowerCase();
            return { field, guess: guessValue, target: targetValue, match };
        });

        const correct = comparisons.every((item) => item.match);
        sendJson(res, 200, { ok: true, correct, comparisons });
        return;
    }

    sendJson(res, 404, { error: 'Endpoint no trobat.' });
});

server.listen(PORT, () => {
    console.log(`Servidor iniciat a http://localhost:${PORT}`);
});