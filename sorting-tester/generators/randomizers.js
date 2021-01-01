const swap = require('../helpers/swap');
const { asc, desc } = require('../helpers/comparators');

/**
 * Zwraca elementy w losowej kolejności
 * @param {Number[]} elements
 */
function shuffle(elements) {
  // robimy kopie otrzymanej tablicy
  const result = [...elements];

  // implementacja algoytmu Fishera-Yatesa
  for (let i = elements.length - 1; i >= 0; i--) {
    // losujemy jeden z elementów tablicy
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // zamieniamy go miejscami z aktualnym elementem
    swap(result, i, randomIndex);
  }

  // zwracamy przemieszaną tablicę
  return result;
}

/**
 * Zwraca elementy posortowane od najmniejszego do największego
 * @param {Number[]} elements
 */
function sortAsc(elements) {
  // dość przewrotnie uzyjemy domyślny algorytm sortowania w JS
  return elements.sort(asc);
}

/**
 * Zwraca elementy posortowane od największego do najmniejszego
 * @param {Number[]} elements
 */
function sortDesc(elements) {
  // dość przewrotnie uzyjemy domyślny algorytm sortowania w JS
  return elements.sort(desc);
}

module.exports = {
  shuffle,
  sortAsc,
  sortDesc,
}