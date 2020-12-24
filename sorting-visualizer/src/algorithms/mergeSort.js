import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

let result = {};
let compare = () => {};

/**
 * Funkcja scalająca elementy.
 * @param {Number} start
 * @param {Number} middle
 * @param {Number} end
 */
function* merge(start, middle, end) {
  // tymczasowa tablica do przechowania posortowanych elementów
  const tempArray = [...new Array(end - start - 1)];
  // licznik odliczający pierwszy wycinek tablicy
  let i = start;
  // licznik odliczający drugi wycinek tablicy
  let j = middle + 1;
  // licznik tablicy tymczasowej
  let k = 0;

  // pętla scalająca obie tablice
  while (i <= middle && j <= end) {
    // wyciągamy referencję do elementów które ze sobą porównujemy
    const current = result.array[i];
    const compared = result.array[j];
    // oznaczamy aktualnie brany pod uwagę element
    current.isCurrent = true;
    // oznaczamy element do którego porównujemy
    compared.isComparedTo = true;
    // zwiększamy licznik porównań
    result.comparisons += 1;
    // zwracamy tablicę do wizualizacji
    yield result;
    // scalamy elementy w odpowiedniej kolejności wykorzystując tymczasową tablicę
    if (compare(compared.value, current.value)) {
      tempArray[k] = result.array[i];
      k++;
      i++;
    } else {
      tempArray[k] = result.array[j];
      k++;
      j++;
    }
    // resetujemy oznaczenia aktualnego i porownywanego elementu
    resetResult(result);
    // zwracamy tablicę do wizualizacji
    yield result;
  }

  // kopiujemy pozostałe elementy
  while (i <= middle) {
    tempArray[k] = result.array[i];
    k++;
    i++;
  }
  while (j <= end) {
    tempArray[k] = result.array[j];
    k++;
    j++;
  }

  // przenosimy posortowane elementy do tablicy wynikowej
  k--;
  while (k >= 0) {
    result.array[start + k] = tempArray[k];
    // zwiększamy licznik zamian
    result.swaps += 1;
    // zwracamy tablicę do wizualizacji
    yield result;
    k--;
  }
}

/**
 * Właściwa funkcja odpowiadająca za sortowanie przez scalanie, wywołująca się rekurencyjnie
 * @param {Number} start
 * @param {Number} end
 */
function* mergeSortInternal(start, end) {
  // wykonujemy podział tylko wtedy, gdy wskaźniki początka i końca się nie spotkały
  if (start < end) {
    // dzielimy tablicę na dwie równe połowy
    const middle = Math.floor((start + end) / 2);
    // wywołujemy sortowanie na pierwszej i drugiej połowie
    yield* mergeSortInternal(start, middle);
    yield* mergeSortInternal(middle + 1, end);
    // scalamy posortowane połowy
    yield* merge(start, middle, end);
    // resetujemy oznaczenia aktualnego i porownywanego elementu
    resetResult(result);
  }
}

/**
 * Implementacja sortowania przez scalanie pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* mergeSort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  compare = comparators[comparator];
  // uruchamiamy sortowanie
  yield* mergeSortInternal(0, result.array.length - 1);
  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

mergeSort.algorithmName = "Sortowanie przez scalanie";

export { mergeSort };
