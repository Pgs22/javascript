<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');

if (strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

session_start();

header('Content-Type: application/json; charset=utf-8');

/* =========================================================
 *  DADES INICIALS GLOBALS
 * =========================================================
 *  'crew' a cada nau és un array d'IDs de tripulants.
 * ========================================================= */

$INITIAL_SHIPS = [
    [
        'id'       => 1,
        'name'     => 'Millennium Falcon',
        'universe' => 'Star Wars',
        'armament' => 'Canons làser quàdruples, míssils de concussió',
        'crew'     => [1, 2],
    ],
    [
        'id'       => 2,
        'name'     => 'USS Enterprise NCC-1701',
        'universe' => 'Star Trek',
        'armament' => 'Phasers, torpedes fotònics',
        'crew'     => [3, 4],
    ],
    [
        'id'       => 3,
        'name'     => 'Serenity',
        'universe' => 'Firefly',
        'armament' => 'Defenses improvisades',
        'crew'     => [5, 6],
    ],
    [
        'id'       => 4,
        'name'     => 'Galactica',
        'universe' => 'Battlestar Galactica',
        'armament' => 'Bateries cinètiques, míssils, Vipers',
        'crew'     => [10, 11],
    ],
    [
        'id'       => 5,
        'name'     => 'Rocinante',
        'universe' => 'The Expanse',
        'armament' => 'Canó PDC, torpedes',
        'crew'     => [7, 8],
    ],
    [
        'id'       => 6,
        'name'     => 'Normandy SR-2',
        'universe' => 'Mass Effect',
        'armament' => 'Canó Thanix, bateries Javelin',
        'crew'     => [9],
    ],
    [
        'id'       => 7,
        'name'     => 'Bebop',
        'universe' => 'Cowboy Bebop',
        'armament' => 'Armes lleugeres de suport',
        'crew'     => [12, 13],
    ],
    [
        'id'       => 8,
        'name'     => 'TARDIS',
        'universe' => 'Doctor Who',
        'armament' => 'Sense armament directe',
        'crew'     => [14],
    ],
];

$INITIAL_CREW = [
    [
        'id'      => 1,
        'name'    => 'Han Solo',
        'age'     => 35,
        'race'    => 'Human',
        'ship_id' => 1,
    ],
    [
        'id'      => 2,
        'name'    => 'Chewbacca',
        'age'     => 200,
        'race'    => 'Wookiee',
        'ship_id' => 1,
    ],
    [
        'id'      => 3,
        'name'    => 'James T. Kirk',
        'age'     => 34,
        'race'    => 'Human',
        'ship_id' => 2,
    ],
    [
        'id'      => 4,
        'name'    => 'Spock',
        'age'     => 35,
        'race'    => 'Vulcan/Human',
        'ship_id' => 2,
    ],
    [
        'id'      => 5,
        'name'    => 'Malcolm Reynolds',
        'age'     => 34,
        'race'    => 'Human',
        'ship_id' => 3,
    ],
    [
        'id'      => 6,
        'name'    => 'Zoe Washburne',
        'age'     => 32,
        'race'    => 'Human',
        'ship_id' => 3,
    ],
    [
        'id'      => 7,
        'name'    => 'James Holden',
        'age'     => 33,
        'race'    => 'Human',
        'ship_id' => 5,
    ],
    [
        'id'      => 8,
        'name'    => 'Naomi Nagata',
        'age'     => 35,
        'race'    => 'Belter',
        'ship_id' => 5,
    ],
    [
        'id'      => 9,
        'name'    => 'Commander Shepard',
        'age'     => 29,
        'race'    => 'Human',
        'ship_id' => 6,
    ],
    [
        'id'      => 10,
        'name'    => 'William Adama',
        'age'     => 58,
        'race'    => 'Human',
        'ship_id' => 4,
    ],
    [
        'id'      => 11,
        'name'    => 'Kara Thrace',
        'age'     => 30,
        'race'    => 'Human',
        'ship_id' => 4,
    ],
    [
        'id'      => 12,
        'name'    => 'Spike Spiegel',
        'age'     => 27,
        'race'    => 'Human',
        'ship_id' => 7,
    ],
    [
        'id'      => 13,
        'name'    => 'Faye Valentine',
        'age'     => 23,
        'race'    => 'Human',
        'ship_id' => 7,
    ],
    [
        'id'      => 14,
        'name'    => 'The Doctor',
        'age'     => 900,
        'race'    => 'Time Lord',
        'ship_id' => 8,
    ],
];

/* =========================================================
 *  HELPERS
 * ========================================================= */

function jsonResponse(int $httpCode, bool $ok, string $message, array $extra = []): void
{
    http_response_code($httpCode);
    echo json_encode(array_merge([
        'ok'      => $ok,
        'message' => $message,
    ], $extra), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;
}

function resetSessionData(): void
{
    global $INITIAL_SHIPS, $INITIAL_CREW;
    $_SESSION['ships']        = $INITIAL_SHIPS;
    $_SESSION['crew']         = $INITIAL_CREW;
    $_SESSION['next_ship_id'] = 9;
    $_SESSION['next_crew_id'] = 15;
}

function ensureSessionData(): void
{
    if (!isset($_SESSION['ships'], $_SESSION['crew'], $_SESSION['next_ship_id'], $_SESSION['next_crew_id'])) {
        resetSessionData();
    }
}

function getRequestData(): array
{
    $raw  = file_get_contents('php://input') ?: '';
    $json = json_decode($raw, true);
    return is_array($json) ? $json : $_POST;
}

function findShipIndexById(int $id): int
{
    foreach ($_SESSION['ships'] as $i => $ship) {
        if ((int) $ship['id'] === $id) {
            return (int) $i;
        }
    }
    return -1;
}

function findCrewIndexById(int $id): int
{
    foreach ($_SESSION['crew'] as $i => $member) {
        if ((int) $member['id'] === $id) {
            return (int) $i;
        }
    }
    return -1;
}

function paginate(array $items, int $page, int $perPage): array
{
    $total      = count($items);
    $totalPages = max(1, (int) ceil($total / $perPage));
    $page       = min(max(1, $page), $totalPages);
    $offset     = ($page - 1) * $perPage;

    return [
        'items'      => array_values(array_slice($items, $offset, $perPage)),
        'pagination' => [
            'page'        => $page,
            'per_page'    => $perPage,
            'total_items' => $total,
            'total_pages' => $totalPages,
            'has_prev'    => $page > 1,
            'has_next'    => $page < $totalPages,
        ],
    ];
}

/* =========================================================
 *  DOCUMENTACIO DE L'API
 * =========================================================
 *  Tipus de peticions admeses:
 *  - GET
 *  - POST
 *
 *  Format general de resposta JSON:
 *  - ok: boolea que indica si la peticio ha anat be
 *  - message: missatge descriptiu
 *  - data: dades retornades quan toca
 *  - pagination: metadades de paginacio en els llistats
 *  - session_id: identificador de sessio en el llistat de naus
 *
 *  Model de dades:
 *  - Nau:
 *      id, name, universe, armament, crew
 *  - El camp crew d'una nau es un array amb IDs de tripulants.
 *    Exemple: 'crew' => [10, 11]
 *  - Tripulant:
 *      id, name, age, race, ship_id
 *
 *  ENDPOINTS GET
 *
 *  1) GET ?action=ship_list
 *     Llista les naus de la sessio actual.
 *     Parametres opcionals:
 *     - page: pagina actual. Per defecte 1.
 *     - per_page: elements per pagina. Entre 1 i 50. Per defecte 5.
 *     - search: text per filtrar per name o universe.
 *
 *     Exemple:
 *     - ?action=ship_list&page=1&per_page=5
 *     - ?action=ship_list&search=star
 *
 *  2) GET ?action=ship_read&id={id}
 *     Retorna una nau concreta pel seu identificador.
 *     Parametres obligatoris:
 *     - id: ID numeric de la nau.
 *
 *  3) GET ?action=crew_list
 *     Llista els tripulants de la sessio actual.
 *     Parametres opcionals:
 *     - ship_id: filtra els tripulants d'una nau concreta.
 *     - page: pagina actual. Per defecte 1.
 *     - per_page: elements per pagina. Entre 1 i 50. Per defecte 10.
 *     - search: text per filtrar per name o race.
 *
 *     Exemple:
 *     - ?action=crew_list
 *     - ?action=crew_list&ship_id=4
 *     - ?action=crew_list&search=human
 *
 *  4) GET ?action=crew_read&id={id}
 *     Retorna un tripulant concret pel seu identificador.
 *     Parametres obligatoris:
 *     - id: ID numeric del tripulant.
 *
 *  5) GET ?action=reset_session
 *     Reinicia la sessio i carrega les dades inicials globals.
 *
 *  6) GET ?action=help
 *     Retorna un resum basic dels endpoints en format JSON.
 *     Parametre opcional:
 *     - scope: all (per defecte), ship o crew
 *       Exemple: ?action=help&scope=ship
 *
 *  ENDPOINTS POST
 *
 *  Nota:
 *  - El cos pot arribar com a JSON o com a formulari POST.
 *  - Sempre cal enviar el camp action.
 *  - No s'admet pujada de fitxers via $_FILES.
 *
 *  1) action=ship_create
 *     Crea una nova nau.
 *     Camps obligatoris:
 *     - name
 *     Camps opcionals:
 *     - universe
 *     - armament
 *     Valor intern generat:
 *     - crew: sempre es crea com a array buit []
 *
 *     Exemple JSON:
 *     {
 *       "action": "ship_create",
 *       "name": "Andromeda",
 *       "universe": "Gene Roddenberry's Andromeda"
 *     }
 *
 *  2) action=ship_update
 *     Actualitza una nau existent.
 *     Camps obligatoris:
 *     - id
 *     Camps actualitzables:
 *     - name
 *     - universe
 *     - armament
 *
 *  3) action=ship_delete
 *     Elimina una nau existent.
 *     Camps obligatoris:
 *     - id
 *     Efecte addicional:
 *     - elimina tambe tots els tripulants associats a aquesta nau.
 *
 *  4) action=crew_create
 *     Crea un nou tripulant.
 *     Camps obligatoris:
 *     - name
 *     - age
 *     - race
 *     Camps opcionals:
 *     - ship_id
 *     Efecte addicional:
 *     - si ship_id es valid, l'ID del nou tripulant s'afegeix al camp crew de la nau.
 *
 *     Exemple JSON:
 *     {
 *       "action": "crew_create",
 *       "ship_id": 7,
 *       "name": "Jet Black",
 *       "age": 36,
 *       "race": "Human"
 *     }
 *
 *  5) action=crew_update
 *     Actualitza un tripulant existent.
 *     Camps obligatoris:
 *     - id
 *     Camps actualitzables:
 *     - name
 *     - age
 *     - race
 *     - ship_id
 *     Efecte addicional:
 *     - si canvia ship_id, el tripulant es mou de la nau antiga a la nova
 *       i s'actualitzen els arrays crew de totes dues naus.
 *     - si ship_id = 0, el tripulant queda sense nau associada.
 *
 *  6) action=crew_delete
 *     Elimina un tripulant existent.
 *     Camps obligatoris:
 *     - id
 *     Efecte addicional:
 *     - es retira tambe el seu ID de l'array crew de la nau associada.
 *
 *  7) action=reset_session
 *     Reinicia la sessio amb les dades inicials globals.
 *
 *  Errors habituals:
 *  - 400: accio no suportada o pujada de fitxers no permesa
 *  - 404: nau o tripulant no trobat
 *  - 405: metode HTTP no permes
 *  - 422: falten parametres obligatoris o son invalids
 * ========================================================= */

/* =========================================================
 *  BOOTSTRAP
 * ========================================================= */

ensureSessionData();

if (!empty($_FILES)) {
    jsonResponse(400, false, 'La pujada de fitxers no està permesa en aquest endpoint.');
}

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

if ($method !== 'GET' && $method !== 'POST') {
    jsonResponse(405, false, 'Només es permeten peticions GET i POST.', [
        'allowed_methods' => ['GET', 'POST'],
    ]);
}

/* =========================================================
 *  GET
 * ========================================================= */

if ($method === 'GET') {
    $action = strtolower(trim((string) ($_GET['action'] ?? 'ship_list')));

    /* --- help --- */
    if ($action === 'help') {
        $scope = strtolower(trim((string) ($_GET['scope'] ?? 'all')));
        if (!in_array($scope, ['all', 'ship', 'crew'], true)) {
            jsonResponse(422, false, "El paràmetre scope ha de ser: all, ship o crew.");
        }

        $shipEndpoints = [
            'GET  ?action=ship_list&page=1&per_page=5&search=text  → llistat de naus (crew = array IDs)',
            'GET  ?action=ship_read&id=3                           → nau per ID',
            'POST {"action":"ship_create","name":"...","universe":"...","armament":"...",}  → crea nau (crew es crea com a array buit)',
            'POST {"action":"ship_update","id":3, "name":"...","universe":"...","armament":"..."}  → actualitza nau (només els camps enviats)',
            'POST {"action":"ship_delete","id":3}',
        ];

        $crewEndpoints = [
            'GET  ?action=crew_list&ship_id=1&page=1          → llistat de tripulants',
            'GET  ?action=crew_read&id=2                      → tripulant per ID',
            'POST {"action":"crew_create","ship_id":1,"name":"...","age":30,"race":"..."}',
            'POST {"action":"crew_update","id":2,"race":"..."}',
            'POST {"action":"crew_update","id":2,"ship_id":4}',
            'POST {"action":"crew_delete","id":2}',
        ];

        $commonEndpoints = [
            'GET  ?action=reset_session                       → reinicia la sessió',
            'POST {"action":"reset_session"}',
        ];

        $endpoints = [];
        if ($scope === 'all' || $scope === 'ship') {
            $endpoints = array_merge($endpoints, $shipEndpoints);
        }
        if ($scope === 'all' || $scope === 'crew') {
            $endpoints = array_merge($endpoints, $crewEndpoints);
        }

        jsonResponse(200, true, 'Endpoint de proves AJAX (GET/POST) per a CRUD de naus i tripulants.', [
            'scope' => $scope,
            'endpoints' => array_merge($endpoints, $commonEndpoints),
        ]);
    }

    /* --- reset_session --- */
    if ($action === 'reset_session') {
        resetSessionData();
        jsonResponse(200, true, 'Sessió reiniciada amb les dades inicials.');
    }

    /* --- ship_read --- */
    if ($action === 'ship_read') {
        $id = (int) ($_GET['id'] ?? 0);
        if ($id <= 0) {
            jsonResponse(422, false, 'Cal enviar un id vàlid.');
        }
        $idx = findShipIndexById($id);
        if ($idx < 0) {
            jsonResponse(404, false, 'Nau no trobada.');
        }
        jsonResponse(200, true, 'Nau trobada.', ['data' => $_SESSION['ships'][$idx]]);
    }

    /* --- crew_list --- */
    if ($action === 'crew_list') {
        $shipId  = (int) ($_GET['ship_id'] ?? 0);
        $search  = trim((string) ($_GET['search'] ?? ''));
        $page    = max(1, (int) ($_GET['page'] ?? 1));
        $perPage = min(max(1, (int) ($_GET['per_page'] ?? 10)), 50);

        $crew = $_SESSION['crew'];

        if ($shipId > 0) {
            $crew = array_values(array_filter($crew, static fn(array $m): bool => (int) $m['ship_id'] === $shipId));
        }

        if ($search !== '') {
            $crew = array_values(array_filter($crew, static function (array $m) use ($search): bool {
                $haystack = strtolower($m['name'] . ' ' . $m['race']);
                return str_contains($haystack, strtolower($search));
            }));
        }

        $result = paginate($crew, $page, $perPage);
        jsonResponse(200, true, 'Llistat de tripulants.', [
            'data'       => $result['items'],
            'pagination' => $result['pagination'],
        ]);
    }

    /* --- crew_read --- */
    if ($action === 'crew_read') {
        $id = (int) ($_GET['id'] ?? 0);
        if ($id <= 0) {
            jsonResponse(422, false, 'Cal enviar un id vàlid.');
        }
        $idx = findCrewIndexById($id);
        if ($idx < 0) {
            jsonResponse(404, false, 'Tripulant no trobat.');
        }
        jsonResponse(200, true, 'Tripulant trobat.', ['data' => $_SESSION['crew'][$idx]]);
    }

    /* --- ship_list (default) --- */
    if ($action !== 'ship_list') {
        jsonResponse(400, false, 'Acció GET no suportada. Usa: ship_list, ship_read, crew_list, crew_read, reset_session, help.');
    }

    $search  = trim((string) ($_GET['search'] ?? ''));
    $page    = max(1, (int) ($_GET['page'] ?? 1));
    $perPage = min(max(1, (int) ($_GET['per_page'] ?? 5)), 50);

    $ships = $_SESSION['ships'];

    if ($search !== '') {
        $ships = array_values(array_filter($ships, static function (array $s) use ($search): bool {
            $haystack = strtolower(implode(' | ', [
                (string) ($s['name'] ?? ''),
                (string) ($s['universe'] ?? ''),
            ]));
            return str_contains($haystack, strtolower($search));
        }));
    }

    $result = paginate($ships, $page, $perPage);
    jsonResponse(200, true, 'Llistat de naus.', [
        'data'       => $result['items'],
        'pagination' => $result['pagination'],
        'session_id' => session_id(),
    ]);
}

/* =========================================================
 *  POST
 * ========================================================= */

$input  = getRequestData();
$action = strtolower(trim((string) ($input['action'] ?? '')));

if ($action === '') {
    jsonResponse(422, false, 'Cal enviar el camp action a la petició POST.');
}

/* --- reset_session --- */
if ($action === 'reset_session') {
    resetSessionData();
    jsonResponse(200, true, 'Sessió reiniciada amb les dades inicials.');
}

/* --- ship_create --- */
if ($action === 'ship_create') {
    $name = trim((string) ($input['name'] ?? ''));

    if ($name === '') {
        jsonResponse(422, false, 'Per crear una nau cal enviar almenys el camp name.');
    }

    $newShip = [
        'id'       => (int) $_SESSION['next_ship_id'],
        'name'     => $name,
        'universe' => trim((string) ($input['universe'] ?? 'Univers desconegut')),
        'armament' => trim((string) ($input['armament'] ?? 'No especificat')),
        'crew'     => [],
    ];

    $_SESSION['next_ship_id'] = (int) $_SESSION['next_ship_id'] + 1;
    $_SESSION['ships'][]      = $newShip;

    jsonResponse(201, true, 'Nau creada correctament.', ['data' => $newShip]);
}

/* --- ship_update --- */
if ($action === 'ship_update') {
    $id = (int) ($input['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(422, false, 'Per actualitzar cal enviar un id vàlid.');
    }

    $idx = findShipIndexById($id);
    if ($idx < 0) {
        jsonResponse(404, false, 'Nau no trobada.');
    }

    $allowedFields = ['name', 'universe', 'armament'];
    $updated       = $_SESSION['ships'][$idx];
    $hasChanges    = false;

    foreach ($allowedFields as $field) {
        if (!array_key_exists($field, $input)) {
            continue;
        }
        $hasChanges     = true;
        $updated[$field] = trim((string) $input[$field]);
    }

    if (!$hasChanges) {
        jsonResponse(422, false, "No s'ha enviat cap camp actualitzable. Camps vàlids: " . implode(', ', $allowedFields));
    }

    $_SESSION['ships'][$idx] = $updated;
    jsonResponse(200, true, 'Nau actualitzada correctament.', ['data' => $updated]);
}

/* --- ship_delete --- */
if ($action === 'ship_delete') {
    $id = (int) ($input['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(422, false, 'Per eliminar cal enviar un id vàlid.');
    }

    $idx = findShipIndexById($id);
    if ($idx < 0) {
        jsonResponse(404, false, 'Nau no trobada.');
    }

    $deleted = $_SESSION['ships'][$idx];

    /* Elimina tripulants associats */
    $_SESSION['crew'] = array_values(
        array_filter($_SESSION['crew'], static fn(array $m): bool => (int) $m['ship_id'] !== $id)
    );

    array_splice($_SESSION['ships'], $idx, 1);

    jsonResponse(200, true, 'Nau i tripulants associats eliminats correctament.', ['data' => $deleted]);
}

/* --- crew_create --- */
if ($action === 'crew_create') {
    $shipId = (int) ($input['ship_id'] ?? 0);
    $name   = trim((string) ($input['name'] ?? ''));
    $age    = (int) ($input['age'] ?? 0);
    $race   = trim((string) ($input['race'] ?? ''));

    if ($name === '' || $race === '') {
        jsonResponse(422, false, 'Per crear un tripulant calen com a mínim name i race.');
    }

    if ($age <= 0) {
        jsonResponse(422, false, 'Cal enviar una edat (age) vàlida per al tripulant.');
    }

    if ($shipId > 0) {
        $shipIdx = findShipIndexById($shipId);
        if ($shipIdx < 0) {
            jsonResponse(404, false, 'La nau indicada (ship_id) no existeix.');
        }
    }

    $newMember = [
        'id'      => (int) $_SESSION['next_crew_id'],
        'name'    => $name,
        'age'     => $age,
        'race'    => $race,
        'ship_id' => $shipId > 0 ? $shipId : null,
    ];

    $_SESSION['next_crew_id'] = (int) $_SESSION['next_crew_id'] + 1;
    $_SESSION['crew'][]       = $newMember;

    /* Actualitza array crew de la nau */
    if ($shipId > 0) {
        $shipIdx = findShipIndexById($shipId);
        $_SESSION['ships'][$shipIdx]['crew'][] = $newMember['id'];
    }

    jsonResponse(201, true, 'Tripulant creat correctament.', ['data' => $newMember]);
}

/* --- crew_update --- */
if ($action === 'crew_update') {
    $id = (int) ($input['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(422, false, 'Per actualitzar un tripulant cal enviar un id vàlid.');
    }

    $crewIdx = findCrewIndexById($id);
    if ($crewIdx < 0) {
        jsonResponse(404, false, 'Tripulant no trobat.');
    }

    $updated    = $_SESSION['crew'][$crewIdx];
    $hasChanges = false;

    if (array_key_exists('name', $input) && trim((string) $input['name']) !== '') {
        $updated['name'] = trim((string) $input['name']);
        $hasChanges = true;
    }

    if (array_key_exists('age', $input) && (int) $input['age'] > 0) {
        $updated['age'] = (int) $input['age'];
        $hasChanges = true;
    }

    if (array_key_exists('race', $input) && trim((string) $input['race']) !== '') {
        $updated['race'] = trim((string) $input['race']);
        $hasChanges = true;
    }

    /* Canvi de nau */
    if (array_key_exists('ship_id', $input)) {
        $newShipId = (int) $input['ship_id'];
        $oldShipId = (int) ($updated['ship_id'] ?? 0);

        if ($newShipId !== $oldShipId) {
            /* Treu de la nau antiga */
            if ($oldShipId > 0) {
                $oldIdx = findShipIndexById($oldShipId);
                if ($oldIdx >= 0) {
                    $_SESSION['ships'][$oldIdx]['crew'] = array_values(
                        array_filter($_SESSION['ships'][$oldIdx]['crew'], static fn($cid): bool => (int) $cid !== $id)
                    );
                }
            }

            /* Afegeix a la nau nova */
            if ($newShipId > 0) {
                $newIdx = findShipIndexById($newShipId);
                if ($newIdx < 0) {
                    jsonResponse(404, false, 'La nova nau indicada (ship_id) no existeix.');
                }
                if (!in_array($id, $_SESSION['ships'][$newIdx]['crew'], true)) {
                    $_SESSION['ships'][$newIdx]['crew'][] = $id;
                }
            }

            $updated['ship_id'] = $newShipId > 0 ? $newShipId : null;
            $hasChanges = true;
        }
    }

    if (!$hasChanges) {
        jsonResponse(422, false, "No s'ha enviat cap camp actualitzable. Camps vàlids: name, age, race, ship_id.");
    }

    $_SESSION['crew'][$crewIdx] = $updated;
    jsonResponse(200, true, 'Tripulant actualitzat correctament.', ['data' => $updated]);
}

/* --- crew_delete --- */
if ($action === 'crew_delete') {
    $id = (int) ($input['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(422, false, 'Per eliminar un tripulant cal enviar un id vàlid.');
    }

    $crewIdx = findCrewIndexById($id);
    if ($crewIdx < 0) {
        jsonResponse(404, false, 'Tripulant no trobat.');
    }

    $deleted   = $_SESSION['crew'][$crewIdx];
    $shipId    = (int) ($deleted['ship_id'] ?? 0);

    /* Treu l'ID de la nau */
    if ($shipId > 0) {
        $shipIdx = findShipIndexById($shipId);
        if ($shipIdx >= 0) {
            $_SESSION['ships'][$shipIdx]['crew'] = array_values(
                array_filter($_SESSION['ships'][$shipIdx]['crew'], static fn($cid): bool => (int) $cid !== $id)
            );
        }
    }

    array_splice($_SESSION['crew'], $crewIdx, 1);

    jsonResponse(200, true, 'Tripulant eliminat correctament.', ['data' => $deleted]);
}

jsonResponse(400, false, 'Acció POST no suportada. Usa: ship_create, ship_update, ship_delete, crew_create, crew_update, crew_delete, reset_session.');