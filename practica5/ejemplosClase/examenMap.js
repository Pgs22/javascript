// Instrucciones para tu código:
// Creación del Map: Crea un Map llamado biblioteca.

// Añadir Datos (Objetos): Inserta estos 3 libros usando el código como clave:

// Clave: LIB001 -> Valor: { "titol": "El Quixot", "autor": "Cervantes" }

// Clave: LIB002 -> Valor: { "titol": "1984", "autor": "George Orwell" }

// Clave: LIB003 -> Valor: { "titol": "L'alquimista", "autor": "Paulo Coelho" }

// Añadir Metadatos: Inserta dos claves simples al mismo Map:

// Clave: seccio -> Valor: Ficció

// Clave: total_llibres -> Valor: 3

// Acceso Individual: Muestra por consola (usando console.log) el título y el autor únicamente del libro con clave LIB002.

// Consulta de Metadatos: Muestra por consola el valor de la clave seccio.

// Bucle de Claves: Realiza un for...of que recorra solo las claves (.keys()) de la biblioteca y las pinte por consola.

// Eliminación: Borra de la biblioteca el libro con clave LIB001.

// Comprobación: Muestra por consola si el libro LIB001 todavía existe en el Map y si el LIB003 existe (usando .has()).

// Bucle Completo: Realiza un for...of que recorra todas las entradas (.entries()) del Map.

// Por cada entrada, debe pintar: -Codi:- [la clau] y -Detalls:- [l'objecte].

// Recordatorio técnico del ejemplo:
// Para acceder a una propiedad de un objeto dentro del Map: mapa.get("clau").propietat

// Para recorrer entradas: for (let variable of mapa.entries()) donde variable[0] es la clave y variable[1] es el valor.