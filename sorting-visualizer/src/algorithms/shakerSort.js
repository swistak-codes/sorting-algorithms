import { swap } from "../helpers/swap";
import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

/**
 * Implementacja sortowania koktajlowego pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* shakerSort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];

  // licznik początkowej pozycji
  let start = 0;
  // licznik końcowej pozycji
  let end = elements.array.length - 1;

  // pętlę wykonujemy tak długo az pozycja początkowa nie zrówna się z końcową
  while (start < end) {
    // zmienna która nam określi, czy tablica jest juz posortowana na podstawie faktu, ze nic nie zamienialiśmy
    // początkowa wartość true jest dlatego, ze będziemy ją zmieniać na false tylko przy przestawianiu elementów, dla uproszczenia
    let isSorted = true;

    // najpierw przechodzimy od początku do końca, identycznie jak w bubble sort
    for (let i = start; i < end; i++) {
      // komentarze pomijam, poniewaz kod jest identyczny jak w bubble sort
      const current = result.array[i];
      const compared = result.array[i + 1];
      current.isCurrent = true;
      yield result;

      compared.isComparedTo = true;
      result.comparisons += 1;
      yield result;

      if (compare(current.value, compared.value)) {
        swap(result.array, i, i + 1);
        result.swaps += 1;
        yield result;
        isSorted = false;
      }

      resetResult(result);
    }

    if (isSorted) {
      // jezeli w ostatnim przejsciu nie zamienialiśmy zadnych elementów oznacza to, ze tablica jest juz posortowana
      // mozemy w takim razie przerwać algorytm
      break;
    }

    // ostatni element jest na swoim miejscu więc przesuwamy koniec
    end--;

    isSorted = true;
    // teraz przechodzimy od końca do początku, tak samo jak w bubble sort, z małą róznicą przy porównaniu
    // najpierw przechodzimy od początku do końca, identycznie jak w bubble sort
    for (let i = end; i > start; i--) {
      // komentarze pomijam, poniewaz kod jest w większości identyczny jak w bubble sort
      const current = result.array[i];
      const compared = result.array[i - 1];
      current.isCurrent = true;
      yield result;

      compared.isComparedTo = true;
      result.comparisons += 1;
      yield result;

      // idąc porównaniami od tyłu musimy odwrócić warunek
      if (!compare(current.value, compared.value)) {
        swap(result.array, i, i - 1);
        result.swaps += 1;
        yield result;
        isSorted = false;
      }

      resetResult(result);
    }

    // pierwszy element jest na swoim miejscu więc przesuwamy początek
    start++;

    if (isSorted) {
      // jezeli w ostatnim przejsciu nie zamienialiśmy zadnych elementów oznacza to, ze tablica jest juz posortowana
      // mozemy w takim razie przerwać algorytm
      break;
    }
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

shakerSort.algorithmName = "Sortowanie koktajlowe";

export { shakerSort };
