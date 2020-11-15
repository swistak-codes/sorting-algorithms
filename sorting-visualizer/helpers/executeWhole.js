/**
 * Funkcja wykonująca całość algorytmu na raz
 * @param {Function} iterator
 * @param {Function} callback
 */
export function executeWhole(iterator, callback) {
  // zmienna do przechowywania aktualnej zawartości tablicy
  let result;
  // przechodzimy pętlą tak długo, az otrzymamy końcowy stan
  do {
    // pobieramy kolejny krok algorytmu
    result = iterator.next();
  } while (!result.done);

  // przesyłamy ostateczną tablicę do wykresu
  callback(result.value);
}
