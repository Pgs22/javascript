<?php

header('Content-Type: application/json');

$jsonFile = "../data/personajes.json";

$personajes = json_decode(file_get_contents($jsonFile), true);

echo json_encode($personajes);