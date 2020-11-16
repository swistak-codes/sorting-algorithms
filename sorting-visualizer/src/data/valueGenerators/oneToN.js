/**
 * Zwraca kolejne liczby od 1 do n (count)
 * @param {Number} count
 */
export function oneToN(count) {
  return [...Array(count).keys()] // dostajemy klucze kolejnych elementów czyli 0, 1, 2
    .map((x) => x + 1); // zwiększamy o 1 aby mieć odliczanie od 1
}
