'use strict';
console.clear();

// ============================================================
// CONSUMO DE UNA API REAL con fetch + async/await
// ============================================================
// fetch() hace una petición HTTP y devuelve una Promise. Está
// disponible de forma global en el navegador y en Node.js 18+.
// Es el caso real más común de asincronía: pedir datos a un
// servidor y esperar la respuesta.
//
// OJO: fetch SOLO rechaza la promesa si falla la red. Un status
// HTTP de error (404, 500, etc.) NO la rechaza: hay que revisar
// response.ok a mano.

const API = "https://jsonplaceholder.typicode.com";

async function obtenerPublicacion(id) {
  // 1) fetch devuelve una Promise<Response>. Esperamos la respuesta.
  const response = await fetch(`${API}/posts/${id}`);

  // 2) Chequeamos el status HTTP (fetch no lo hace por nosotros).
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} al pedir la publicación ${id}`);
  }

  // 3) response.json() TAMBIÉN es asíncrono (devuelve otra Promise).
  return response.json();
}

async function main() {
  try {
    // --- Una sola petición ---
    const publicacion = await obtenerPublicacion(1);
    console.log("Publicación obtenida:");
    console.log("  Título:", publicacion.title);

    // --- Varias en PARALELO con Promise.all (ver 02.18) ---
    const ids = [2, 3, 4,5,6,7,8,9,10];
    const publicaciones = await Promise.all(
      ids.map((id) => obtenerPublicacion(id))
    );
    console.log(`\nSe obtuvieron ${publicaciones.length} publicaciones en paralelo:`);
    publicaciones.forEach((p) => console.log(`  #${p.id} - ${p.title}`));

    // --- Caso de error: un id que no existe -> status 404 -> throw ---
    await obtenerPublicacion(999999);
  } catch (error) {
    // Acá caen tanto los errores de red como los HTTP que lanzamos.
    console.log("\nOcurrió un error:", error.message);
  }
}

main();
