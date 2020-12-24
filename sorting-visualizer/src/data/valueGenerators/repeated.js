/**
 * Zwraca tablicę z duzą liczbą powtórzeń elementów
 * @param {Number} count
 */
export function repeated(count) {
  return [...Array(count).keys()].map((x) => ((x + 1) % (count / 5)) + 1);
}
