import { swap } from "../helpers/swap";
import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

/**
 * Funkcja przestawiająca elementy tablicy
 * @param {*} result
 * @param {Number} start
 * @param {Number} end
 * @param {Function} compare
 */
function* partition(result, start, end, compare) {
  // ustalamy element pivot na pierwszym elemencie
  let pivotPosition = start;
  let pivot = result.array[pivotPosition];
  // ustawiamy, ze pivot jest aktualnie rozpatrywanym elementem
  pivot.isCurrent = true;
  // zwracamy tablicę do wizualizacji
  yield result;
  // inicjalizujemy liczniki pętli które wskazują na porównywane elementy
  let i = start - 1;
  let j = end + 1;
  while (true) {
    let compared;
    // szukamy elementu większego od pivota po jego lewej stronie
    do {
      i++;
      // wyciągamy referencję do elementu który porównujemy
      compared = result.array[i];
      pivot = result.array[pivotPosition];
      // oznaczamy elementy które porównujemy
      compared.isComparedTo = true;
      pivot.isCurrent = true;
      // zwiększamy licznik porównań
      result.comparisons += 1;
      // zwracamy tablicę do wizualizacji
      yield result;
      // resetujemy oznaczenia aktualnego i porownywanego elementu
      resetResult(result);
    } while (compare(pivot.value, compared.value));
    // szukamy elementu mniejszego od pivota po jego prawej stronie
    do {
      j--;
      // wyciągamy referencję do elementu który porównujemy
      compared = result.array[j];
      pivot = result.array[pivotPosition];
      // oznaczamy elementy które porównujemy
      compared.isComparedTo = true;
      pivot.isCurrent = true;
      // zwiększamy licznik porównań
      result.comparisons += 1;
      // zwracamy tablicę do wizualizacji
      yield result;
      // resetujemy oznaczenia aktualnego i porownywanego elementu
      resetResult(result);
    } while (compare(compared.value, pivot.value));
    // jezeli wskaźniki elementów się nie spotkały, zamieniamy elementy które wskazują
    if (i < j) {
      // wyciągamy referencję do elementów które ze sobą porównujemy
      const current = result.array[i];
      compared = result.array[j];
      // oznaczamy aktualnie brany pod uwagę element
      current.isCurrent = true;
      compared.isCurrent = true;
      // zamieniamy element jezeli jest potrzeba
      swap(result.array, i, j);
      // zwiększamy licznik zamian
      result.swaps += 1;
      // zwracamy tablicę do wizualizacji
      yield result;
      // resetujemy oznaczenia aktualnego i porownywanego elementu
      resetResult(result);
    } else {
      // jezeli wskaźniki się spotkały, to zwracamy pozycję na której to się stało
      return j;
    }
  }
}

/**
 * Właściwa funkcja odpowiadająca za sortowanie szybkie, wywołująca się rekurencyjnie
 * @param {*} result
 * @param {Number} start
 * @param {Number} end
 * @param {Function} compare
 */
function* quickSortInternal(result, start, end, compare) {
  if (start < end) {
    // szukamy punktu podziału na mniejsze tablice
    const divisionPoint = yield* partition(result, start, end, compare);
    // sortujemy lewą stronę
    yield* quickSortInternal(result, start, divisionPoint, compare);
    // sortujemy prawą stronę
    yield* quickSortInternal(result, divisionPoint + 1, end, compare);
  }
  return result;
}

/**
 * Implementacja sortowania szybkiego pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* quickSort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  let result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];
  // uruchamiamy sortowanie
  result = yield* quickSortInternal(
    result,
    0,
    result.array.length - 1,
    compare
  );
  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

quickSort.algorithmName = "Sortowanie szybkie";

export { quickSort };
