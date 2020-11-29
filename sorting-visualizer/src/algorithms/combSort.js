import { swap } from "../helpers/swap";
import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

/**
 * Implementacja sortowania grzebieniowego pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* combSort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];
  // zmienna która nam określi, czy tablica jest juz posortowana na podstawie faktu, ze nic nie zamienialiśmy
  let isSorted = false;
  // zmienna określająca rozpiętość sprawdzanych danych
  let gap = elements.array.length;
  // iterujemy dopóki nie dojdziemy do rozpiętości 1 i az tablica zostanie posortowana
  while (gap > 1 || !isSorted) {
    // obliczamy nową rozpiętość porównywania dzieląc poprzednią przez stały współczynnik 1.3, po czym zaokrąglamy w dół
    gap = Math.floor(gap / 1.3);
    // jezeli współczynnik wynosi 0, cofamy jego wartość na 1
    if (gap === 0) {
      gap = 1;
    }
    // tymczasowo załózmy, ze tablica jest posortowana
    isSorted = true;
    // iterujemy po kolei po elementach w taki sposób, zeby odliczyć elementy biorąc pod uwagę rozpiętość
    for (let i = 0; i + gap < elements.array.length; i++) {
      // wyciągamy referencję do elementów które ze sobą porównujemy
      const current = result.array[i];
      const compared = result.array[i + gap];
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
        swap(result.array, i, i + gap);
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

combSort.algorithmName = "Sortowanie grzebieniowe";

export { combSort };
