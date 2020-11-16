/**
 * Generuje losowe liczby z rozkładu jednostajnego
 * @param {Number} count
 */
export function random(count) {
  // tworzymy tablicę o zadanym rozmiarze a potem na kazdej pozycji losujemy element
  return [...Array(count)].map(() => Math.random());
}
