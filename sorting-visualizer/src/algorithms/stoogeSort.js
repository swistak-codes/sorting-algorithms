import { swap } from "../helpers/swap";
import * as comparators from "../helpers/comparators";

let result = {};
let compare = () => true;

/**
 * Implementacja sortowania bąbelkowego pozwalająca na wizualizację krok po kroku
 * @param {Number} i
 * @param {Number} j
 */
function* stoogeSortInternal(i, j) {
  // wyciągamy referencję do elementów które ze sobą porównujemy
  const current = result.array[i];
  const compared = result.array[j];
  // oznaczamy aktualnie brany pod uwagę element
  current.isCurrent = true;
  // zwracamy tablicę do wizualizacji
  yield result;
  // oznaczamy element do którego porównujemy
  compared.isComparedTo = true;
  // zwiększamy licznik porównań
  result.comparisons++;
  // zwracamy tablicę do wizualizacji
  yield result;
  if (compare(current.value, compared.value)) {
    // zamieniamy element jezeli jest potrzeba
    swap(result.array, i, j);
    // zwiększamy licznik zamian
    result.swaps++;
    // zwracamy tablicę do wizualizacji
    yield result;
  }
  // resetujemy oznaczenia aktualnego i porownywanego elementu
  result.array = result.array.map((x) => ({
    ...x,
    isCurrent: false,
    isComparedTo: false
  }));

  if (i + 1 < j) {
    // jezeli istnieje cokolwiek między aktualnymi elementami, to zawęzamy przedziały
    const t = Math.floor((j - i + 1) / 3);
    // sortujemy najpierw pierwsze 2/3 tablicy
    yield* stoogeSortInternal(i, j - t);
    // sortujemy ostatnie 2/3 tablicy
    yield* stoogeSortInternal(i + t, j);
    // ponownie sortujemy pierwsze 2/3 tablicy
    yield* stoogeSortInternal(i, j - t);
  }
}

/**
 * Funkcja wywołująca sortowanie stooge
 * @param {{}} elements
 * @param {Function} comparator
 */
function* stoogeSort(elements, comparator) {
  result = {
    array: [...elements.array],
    comparisons: 0,
    swaps: 0
  };
  compare = comparators[comparator];
  yield* stoogeSortInternal(0, elements.array.length - 1);
  return result;
}

stoogeSort.algorithmName = "Stooge sort";

export { stoogeSort };
