/**
 * Funkcja dokonująca zamiany elementów w tablicy
 * @param {Array} array
 * @param {Number} first
 * @param {Number} second
 */
export function swap(array, first, second) {
  const temp = array[first];
  array[first] = array[second];
  array[second] = temp;
}
