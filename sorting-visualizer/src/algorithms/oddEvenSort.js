import { swap } from "../helpers/swap";
import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

/**
 * Implementacja sortowania nieparzyste-parzyste pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* oddEvenSort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];
  // zmienna która nam określi, czy tablica jest juz posortowana na podstawie faktu, ze nic nie zamienialiśmy
  let isSorted = false;

  // sortujemy tak długo, az przestaniemy wykonywać zamiany
  while (!isSorted) {
    // załózmy na razie, ze tablica jest posortowana
    isSorted = true;
    // najpierw iterujemy po nieparzystych elementach
    for (let i = 1; i < elements.array.length - 1; i += 2) {
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
        // ustawiamy, ze tablica nie jest posortowana
        isSorted = false;
      }
      // resetujemy oznaczenia aktualnego i porownywanego elementu
      resetResult(result);
    }
    // teraz iterujemy po parzystych elementach
    // kod w tej pętli to kopiuj-wklej z poprzedniej
    for (let i = 0; i < elements.array.length - 1; i += 2) {
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
        // ustawiamy, ze tablica nie jest posortowana
        isSorted = false;
      }
      // resetujemy oznaczenia aktualnego i porownywanego elementu
      resetResult(result);
    }
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

oddEvenSort.algorithmName = "Sortowanie odd-even";

export { oddEvenSort };
