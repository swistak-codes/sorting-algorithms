/**
 * Funkcja zwracająca losową liczbę z rozkładu Gaussa w podanym zakresie
 */
function getRandomGaussianNumber() {
  let u = 0,
    v = 0;
  // losujemy dwie wartości u i v z rozkladu jednostajnego,
  // ale upewniając się, ze będą rózne od 0
  while (u === 0) {
    u = Math.random();
  }
  while (v === 0) {
    v = Math.random();
  }
  // wzor transformacji (https://pl.wikipedia.org/wiki/Transformacja_Boxa-Mullera)
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/**
 * Generuje losowe liczby z rozkładu Gaussowskiego
 * @param {Number} count
 */
export function gaussRandom(count) {
  // tworzymy tablicę o zadanym rozmiarze a potem na kazdej pozycji losujemy element
  return [...Array(count)].map(() => getRandomGaussianNumber());
}
