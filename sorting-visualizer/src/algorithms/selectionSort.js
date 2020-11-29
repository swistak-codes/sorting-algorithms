import { swap } from "../helpers/swap";
import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

/**
 * Implementacja sortowania przez wybieranie pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* selectionSort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];
  // wyciągamy długość tablicy
  const length = elements.array.length;

  for (let i = 0; i < length - 1; i++) {
    // wyciągamy indeks elementu i, uznając go za aktualne minimum/maximum
    let currentMinIndex = i;
    for (let j = i + 1; j < length; j++) {
      // oznaczamy aktualnie brany pod uwagę element
      const current = result.array[currentMinIndex];
      current.isCurrent = true;
      // zwracamy tablicę do wizualizacji
      yield result;
      // wyciągamy referencję do aktualnie przyrównywanego elementu
      const compared = result.array[j];
      // oznaczamy element do którego porównujemy
      compared.isComparedTo = true;
      // zwiększamy licznik porównań
      result.comparisons += 1;
      // zwracamy tablicę do wizualizacji
      yield result;
      if (compare(current.value, compared.value)) {
        // zmieniamy aktualne minimum/maximum
        currentMinIndex = j;
      }
      // resetujemy oznaczenia aktualnego i porownywanego elementu
      resetResult(result);
    }

    // jezeli najmniejszy element jest inny niz aktualnie rozpatrywamy, to dokonujemy zmaiany
    if (currentMinIndex !== i) {
      // oznaczamy aktualnie brany pod uwagę element
      const current = result.array[currentMinIndex];
      current.isCurrent = true;
      // zwracamy tablicę do wizualizacji
      yield result;
      // zamieniamy element
      swap(result.array, i, currentMinIndex);
      // zwiększamy licznik zamian
      result.swaps += 1;
      // zwracamy tablicę do wizualizacji
      yield result;
      // odoznaczamy aktualnie brany pod uwagę element
      current.isCurrent = false;
    }
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

selectionSort.algorithmName = "Sortowanie przez wybieranie";

export { selectionSort };
