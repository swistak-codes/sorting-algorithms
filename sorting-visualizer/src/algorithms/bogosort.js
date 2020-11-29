import { shuffle } from "../data/randomizers/shuffle";
import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

/**
 * Implementacja bogosort pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* bogosort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];
  // zmienna która nam określi, czy tablica jest juz posortowana
  let isSorted = false;

  // pętlę wykonujemy tak długo a dane będą posortowane
  while (!isSorted) {
    // mieszamy elementy tablicy
    result.array = shuffle(result.array);
    // zamian jest zawsze tyle ile elementów tablicy
    result.swaps += result.array.length;
    // zwracamy tablicę do wizualizacji
    yield result;
    // tymczasowo uznajemy dane za posortowane dla ułatwienia
    isSorted = true;
    // sprawdzamy czy elementy są posortowane
    for (let i = 0; i < result.array.length - 1; i++) {
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
        // jezeli kolejność nie jest zachowana, oznaczamy to i przerywamy przechodzenie dalej
        isSorted = false;
        break;
      }
    }
    // resetujemy oznaczenia akutalnego i porownywanego elementu
    resetResult(result);
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

bogosort.algorithmName = "Bogosort";

export { bogosort };
