import { swap } from "../helpers/swap";
import * as comparators from "../helpers/comparators";
import * as generators from "../helpers/shellSortGapsGenerators";

/**
 * Implementacja sortowania Shella pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 * @param {String} generator
 */
function* shellSort(elements, comparator, generator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];
  // generujemy odstępy w jakich będziemy sprawdzać elementy
  const gaps = generators[generator](elements.array.length);
  // iterujemy po odstępach od największego do najmniejszego
  for (const gap of gaps) {
    // wykonujemy sortowanie przez wstawianie dla zadanego odstępu
    // zmienna przechowująca pozycję aktualnego elementu
    let i = gap;
    // iterujemy tak długo az pozycja aktualnego elementu zrówna się z długością tablicy
    while (i < elements.array.length) {
      // ustawiamy pozycję przesuwanego elementu
      let j = i;
      // zmienna określająca czy musimy jeszcze przesuwać elementy
      let needsSwap = true;
      while (j >= gap && needsSwap) {
        // wyciągamy referencję do aktualnego elementu
        const current = result.array[j];
        // oznaczamy aktualnie brany pod uwagę element
        current.isCurrent = true;
        // zwracamy tablicę do wizualizacji
        yield result;
        // wyciągamy referencję do porównywalnego elementu
        const compared = result.array[j - gap];
        // oznaczamy element do którego porównujemy
        compared.isComparedTo = true;
        // zwiększamy licznik porównań
        result.comparisons += 1;
        // zwracamy tablicę do wizualizacji
        yield result;
        if (!compare(current.value, compared.value)) {
          // zamieniamy element jezeli jest potrzeba
          swap(result.array, j, j - gap);
          // zwiększamy licznik zamian
          result.swaps += 1;
          // zwracamy tablicę do wizualizacji
          yield result;
          // cofamy się pozycją do tyłu o wielkość odstępu
          j -= gap;
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
  }
  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

shellSort.algorithmName = "Sortowanie Shella";

export { shellSort };
