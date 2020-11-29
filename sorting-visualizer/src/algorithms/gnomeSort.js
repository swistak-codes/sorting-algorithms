import { swap } from "../helpers/swap";
import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

/**
 * Implementacja sortowania gnoma pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* gnomeSort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];
  // zmienna przechowująca pozycję aktualnego elementu
  let i = 0;
  // iterujemy tak długo az pozycja aktualnego elementu zrówna się z długością tablicy
  while (i < elements.array.length) {
    // wyciągamy referencję do aktualnego elementu
    const current = result.array[i];
    // oznaczamy aktualnie brany pod uwagę element
    current.isCurrent = true;
    // zwracamy tablicę do wizualizacji
    yield result;
    if (i === 0) {
      // jezeli jesteśmy na zerowej pozycji to zwiększamy licznik i nic więcej nie robimy
      i++;
      // przeskakujemy do następnej iteracji
      continue;
    }
    // wyciągamy referencję do porównywalnego elementu
    const compared = result.array[i - 1];
    // oznaczamy element do którego porównujemy
    compared.isComparedTo = true;
    // zwiększamy licznik porównań
    result.comparisons += 1;
    // zwracamy tablicę do wizualizacji
    yield result;
    if (compare(compared.value, current.value)) {
      // zamieniamy element jezeli jest potrzeba
      swap(result.array, i, i - 1);
      // zwiększamy licznik zamian
      result.swaps += 1;
      // zwracamy tablicę do wizualizacji
      yield result;
      // cofamy się pozycją do tyłu
      i--;
    } else {
      // jezeli elementy są w dobrej kolejności to zwiększamy licznik
      i++;
    }
    // resetujemy oznaczenia aktualnego i porownywanego elementu
    resetResult(result);
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

gnomeSort.algorithmName = "Sortowanie gnoma";

export { gnomeSort };
