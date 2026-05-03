<?php

header('Content-Type: application/json');

$jsonFile = "../data/personajes.json";
$uploadsDir = "../uploads/";

if (!file_exists($jsonFile)) {
    file_put_contents($jsonFile, json_encode([]));
}

if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0777, true);
}

$personajes = json_decode(file_get_contents($jsonFile), true);

$rutaImagen = "";

if (isset($_FILES["arxiu"]) && $_FILES["arxiu"]["error"] === 0) {

    $nombreOriginal = basename($_FILES["arxiu"]["name"]);
    $nombreSeguro = time() . "_" . str_replace(" ", "_", $nombreOriginal);

    $rutaServidor = $uploadsDir . $nombreSeguro;

    if (move_uploaded_file($_FILES["arxiu"]["tmp_name"], $rutaServidor)) {
        $rutaImagen = "uploads/" . $nombreSeguro;
    }
}

$personaje = [
    "name" => $_POST["name"] ?? "",
    "height" => $_POST["height"] ?? "",
    "hair_color" => $_POST["hair_color"] ?? "",
    "skin_color" => $_POST["skin_color"] ?? "",
    "eye_color" => $_POST["eye_color"] ?? "",
    "birth_year" => $_POST["birth_year"] ?? "",
    "gender" => $_POST["gender"] ?? "",
    "image" => $rutaImagen
];

$personajes[] = $personaje;

file_put_contents($jsonFile, json_encode($personajes, JSON_PRETTY_PRINT));

echo json_encode([
    "status" => "ok",
    "personaje" => $personaje
]);