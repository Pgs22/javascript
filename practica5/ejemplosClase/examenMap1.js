// Enunciado del Examen: Gestión de Concesionaria
// Creación: Crea un Map llamado concesionaria.
// Añadir Objetos: Inserta estos 3 coches usando la matrícula como clave:
// 1234BBB -> { "marca": "Seat", "model": "Ibiza" }
// 5678CCC -> { "marca": "Tesla", "model": "Model 3" }
// 9012DDD -> { "marca": "Toyota", "model": "Corolla" }
// Añadir Metadatos:
// Clave: ciutat -> Valor: Barcelona
// Clave: stock -> Valor: 45
let concesionaria =new Map();
concesionaria.set("1234BBB", {"marca": "Seat", "model": "Ibiza"});
concesionaria.set("5678CCC", {"marca": "Tesla", "model": "Model 3"});
concesionaria.set("9012DDD", {"marca": "Toyota", "model": "Corolla"});
concesionaria.set("ciutat", "Barcelona");
concesionaria.set("stock", 45);


// Acceso: Muestra por consola la marca y el modelo del coche con matrícula 5678CCC.
let coche = concesionaria.get("5678CCC");
console.log(`marca: ${coche.marca}`);
console.log(`model: ${coche.model}`);

// Metadatos: Muestra por consola el valor de la clave ciutat.
console.log(`ciutat: ${concesionaria.get("ciutat")}`);

// Bucle Keys: Haz un for of para mostrar todas las matrículas (claves) del Map.

// Borrado: Elimina el coche con matrícula 1234BBB.

// Comprobación: Muestra por consola si existe la matrícula 1234BBB y si existe la 9012DDD.

// Bucle Entries: Haz un for of que recorra las entries y pinte:

// -Matricula:- [la clave]

// -Vehicle:- [el objeto]

// Tu chuleta de apoyo (basada en tu ejemplo):
// Crear: let nombre = new Map();

// Guardar: nombre.set("clave", { "p1": "v1" });

// Obtener: nombre.get("clave").p1

// Saber si existe: nombre.has("clave")

// Borrar: nombre.delete("clave")

// Bucle entradas: for (let item of nombre.entries()) -> item[0] es clave, item[1] es valor.