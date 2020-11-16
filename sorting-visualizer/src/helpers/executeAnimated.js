let forceStop = false;

/**
 * Funkcja wykonująca algorytm krok po kroku generując animację
 * @param {Function} iterator
 * @param {Number} delay
 * @param {Function} callback
 */
export async function executeAnimated(iterator, delay = 17, callback) {
  // zmienna do przechowywania aktualnej zawartości tablicy
  let result;
  // restartujemy zmienną zatrzymującą animację
  forceStop = false;
  // przechodzimy pętlą tak długo, az otrzymamy końcowy stan
  do {
    // pobieramy kolejny krok algorytmu
    result = iterator.next();
    // przesyłamy aktualną tablicę do wykresu
    callback(result.value);
    // czekamy wskazaną wartość opóźnienia
    await new Promise((resolve) => setTimeout(() => resolve(), delay));
  } while (!result.done && !forceStop);
}

/**
 * Funkcja przerywająca animację
 */
export function stopAnimation() {
  forceStop = true;
}
