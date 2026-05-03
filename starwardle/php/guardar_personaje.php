<?php

header('Content-Type: application/json');

$jsonFile = "../data/personajes.json";

// leer contenido actual
$personajes = json_decode(file_get_contents($jsonFile), true);

// leer JSON recibido
$input = json_decode(file_get_contents("php://input"), true);

// añadir personaje
$personajes[] = $input;

// guardar
file_put_contents($jsonFile, json_encode($personajes, JSON_PRETTY_PRINT));

// respuesta
echo json_encode([
    "status" => "ok",
    "personaje" => $input
]);