import { swap } from "../helpers/swap";
import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

/**
 * Implementacja sortowania bąbelkowego pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* bubbleSort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];
  const length = elements.array.length;

  for (let iteration = 0; iteration < length; iteration++) {
    for (let i = 0; i < length - 1; i++) {
      // wyciągamy referencję do elementów które ze sobą porównujemy
      const current = result.array[i];
      const compared = result.array[i + 1];
      // oznaczamy aktualnie brany pod uwagę element
      current.isCurrent = true;
      // zwracamy tablicę do wizualizacji
      yield result;
      // oznaczamy element do którego porównujemy
      compared.isComparedTo = true;
      // zwiększamy licznik porównań
      result.comparisons += 1;
      // zwracamy tablicę do wizualizacji
      yield result;
      if (compare(current.value, compared.value)) {
        // zamieniamy element jezeli jest potrzeba
        swap(result.array, i, i + 1);
        // zwiększamy licznik zamian
        result.swaps += 1;
        // zwracamy tablicę do wizualizacji
        yield result;
      }
      // resetujemy oznaczenia aktualnego i porownywanego elementu
      resetResult(result);
    }
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

bubbleSort.algorithmName = "Sortowanie bąbelkowe (brak optymalizacji)";

export { bubbleSort };
