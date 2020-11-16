import { swap } from "../helpers/swap";
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

  // co iterację będziemy skracać rozpatrywaną tablicę o jeden element
  // wynika to z faktu, ze na koniec zawsze trafiają elementy posortowane
  for (let length = elements.array.length - 1; length > 1; length--) {
    // zmienna która nam określi, czy tablica jest juz posortowana na podstawie faktu, ze nic nie zamienialiśmy
    // początkowa wartość true jest dlatego, ze będziemy ją zmieniać na false tylko przy przestawianiu elementów, dla uproszczenia
    let isSorted = true;
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
        // ustawiamy, ze tablica nie jest posortowana
        isSorted = false;
      }
      // resetujemy oznaczenia aktualnego i porownywanego elementu
      result.array = result.array.map((x) => ({
        ...x,
        isCurrent: false,
        isComparedTo: false
      }));
    }
    if (isSorted) {
      // jezeli w ostatnim przejsciu nie zamienialiśmy zadnych elementów oznacza to, ze tablica jest juz posortowana
      // mozemy w takim razie przerwać algorytm
      break;
    }
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

bubbleSort.algorithmName = "Sortowanie bąbelkowe";

export { bubbleSort };
