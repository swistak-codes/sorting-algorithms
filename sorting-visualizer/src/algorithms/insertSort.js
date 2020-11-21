import { swap } from "../helpers/swap";
import * as comparators from "../helpers/comparators";

/**
 * Implementacja sortowania przez wstawianie pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* insertSort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];
  // zmienna przechowująca pozycję aktualnego elementu
  let i = 0;
  // iterujemy tak długo az pozycja aktualnego elementu zrówna się z długością tablicy
  while (i < elements.array.length) {
    // ustawiamy pozycję przesuwanego elementu
    let j = i;
    // zmienna określająca czy musimy jeszcze przesuwać elementy
    let needsSwap = true;
    while (j > 0 && needsSwap) {
      // wyciągamy referencję do aktualnego elementu
      const current = result.array[j];
      // oznaczamy aktualnie brany pod uwagę element
      current.isCurrent = true;
      // zwracamy tablicę do wizualizacji
      yield result;
      // wyciągamy referencję do porównywalnego elementu
      const compared = result.array[j - 1];
      // oznaczamy element do którego porównujemy
      compared.isComparedTo = true;
      // zwiększamy licznik porównań
      result.comparisons += 1;
      // zwracamy tablicę do wizualizacji
      yield result;
      if (!compare(current.value, compared.value)) {
        // zamieniamy element jezeli jest potrzeba
        swap(result.array, j, j - 1);
        // zwiększamy licznik zamian
        result.swaps += 1;
        // zwracamy tablicę do wizualizacji
        yield result;
        // cofamy się pozycją do tyłu
        j--;
      } else {
        // jezeli juz nie trzeba zamieniać, to mozemy przerwać pętlę
        needsSwap = false;
      }
      // resetujemy oznaczenia aktualnego i porownywanego elementu
      result.array = result.array.map((x) => ({
        ...x,
        isCurrent: false,
        isComparedTo: false
      }));
    }
    // przesuwamy aktualnie rozpatrywany element
    i++;
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

insertSort.algorithmName = "Sortowanie przez wstawianie";

export { insertSort };
