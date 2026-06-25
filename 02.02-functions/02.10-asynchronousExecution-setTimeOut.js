'use strict';
console.clear();

// Ejemplo de ejecución asíncrona con setTimeout
console.log('1');

setTimeout(() => console.log('2 (después de 2s)'), 2000);

console.log('3');