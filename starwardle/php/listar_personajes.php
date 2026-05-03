<?php

header('Content-Type: application/json');

$jsonFile = "../data/personajes.json";

if (!file_exists($jsonFile)) {
    file_put_contents($jsonFile, json_encode([]));
}

$personajes = json_decode(file_get_contents($jsonFile), true);

echo json_encode($personajes);