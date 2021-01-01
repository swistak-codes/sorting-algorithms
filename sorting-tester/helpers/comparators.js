/**
 * Funkcja porównująca zwracająca elementy w kolejności malejącej
 * @param {Number} a
 * @param {Number} b
 */
function desc(a, b) {
  return b > a;
}

/**
 * Funkcja porównująca zwracająca elementy w kolejności rosnącej
 * @param {Number} a
 * @param {Number} b
 */
function asc(a, b) {
  return a > b;
}

module.exports = {
  desc,
  asc,
};