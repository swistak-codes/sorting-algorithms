import { swap } from "../helpers/swap";
import * as comparators from "../helpers/comparators";

/**
 * Implementacja sortowania bąbelkowego pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* bubbleSortOptimized1(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];

  // co iterację będziemy skracać rozpatrywaną tablicę o jeden element
  // wynika to z faktu, ze na koniec zawsze trafiają elementy posortowane
  for (let length = elements.array.length - 1; length > 1; length--) {
    for (let i = 0; i < length; i++) {
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
      result.array = result.array.map((x) => ({
        ...x,
        isCurrent: false,
        isComparedTo: false
      }));
    }
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

bubbleSortOptimized1.algorithmName = "Sortowanie bąbelkowe (optymalizacja 1)";

export { bubbleSortOptimized1 };
