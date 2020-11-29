import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

/**
 * Implementacja cycle sort pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* cycleSort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];
  // wyciągamy długość tablicy
  const length = elements.array.length;

  for (let cycleStart = 0; cycleStart <= length - 2; cycleStart++) {
    // wyciągamy referencję do początkowego elementu
    let current = result.array[cycleStart];
    // w tej zmiennej przechowamy pozycję na którą przeniesiemy element
    let position = cycleStart;
    // szukamy pozycji dla elementu
    for (let i = cycleStart + 1; i < length; i++) {
      // oznaczamy aktualnie brany pod uwagę element
      current.isCurrent = true;
      // zwracamy tablicę do wizualizacji
      yield result;
      // wyciągamy referencję do elementu który porównujemy
      const compared = result.array[i];
      // oznaczamy element do którego porównujemy
      compared.isComparedTo = true;
      // zwiększamy licznik porównań
      result.comparisons += 1;
      // zwracamy tablicę do wizualizacji
      yield result;
      // zwiększamy pozycję jeśli trzeba
      if (compare(current.value, compared.value)) {
        position++;
      }
      // resetujemy oznaczenia
      resetResult(result);
    }
    // jezeli pozycja się nie zmieniła, przechodzimy do następnego cyklu
    if (position === cycleStart) {
      continue;
    }
    // zignorujmy powtórzenia elementu przez przesunięcie pozycji
    let compared;
    current.isCurrent = true;
    do {
      // wyciągamy referencję do elementu który porównujemy
      compared = result.array[position];
      // oznaczamy element do którego porównujemy
      compared.isComparedTo = true;
      // zwiększamy licznik porównań
      result.comparisons += 1;
      // zwracamy tablicę do wizualizacji
      yield result;
      // zwiększamy pozycję jeśli elementy są takie same
      if (current.value === compared.value) {
        // w praktyce całość moznaby zamknąć do jednolinijkowej pętli while
        // logika się tu nazbierała tylko i wyłącznie ze względu na potrzebę wizualizacji
        position++;
        compared.isComparedTo = false;
      }
    } while (current.value === compared.value);
    current.isCurrent = false;
    // ustawmy element na prawidłowej pozycji
    if (position !== cycleStart) {
      // nie robimy typowej zamiany, tylko wstawiamy element na odpowiednie miejsce
      // a element który był na jego miejscu przenosimy do pamięci
      const temp = current;
      current = result.array[position];
      result.array[position] = temp;
      // zwiększamy licznik zamian
      result.swaps += 1;
      // zwracamy tablicę do wizualizacji
      current.isCurrent = true;
      yield result;
      current.isCurrent = false;
    }
    // dokończmy zamiany w cyklu
    while (position !== cycleStart) {
      position = cycleStart;
      // szukamy pozycję w którą wstawimy zapamiętany element
      for (let i = cycleStart + 1; i < length; i++) {
        // wyciągamy referencję do elementu który porównujemy
        const compared = result.array[i];
        // oznaczamy element do którego porównujemy
        compared.isComparedTo = true;
        // zwiększamy licznik porównań
        result.comparisons += 1;
        // zwracamy tablicę do wizualizacji
        yield result;
        // zwiększamy pozycję jeśli trzeba
        if (compare(current.value, compared.value)) {
          position++;
        }
        compared.isComparedTo = false;
      }
      // zignorujmy powtórzenia elementu przez przesunięcie pozycji
      let compared;
      current.isCurrent = true;
      do {
        // wyciągamy referencję do elementu który porównujemy
        compared = result.array[position];
        // oznaczamy element do którego porównujemy
        // console.log(length, position, cycleStart);
        compared.isComparedTo = true;
        // zwiększamy licznik porównań
        result.comparisons += 1;
        // zwracamy tablicę do wizualizacji
        yield result;
        // zwiększamy pozycję jeśli elementy są takie same
        if (current.value === compared.value) {
          // w praktyce całość moznaby zamknąć do jednolinijkowej pętli while
          // logika się tu nazbierała tylko i wyłącznie ze względu na potrzebę wizualizacji
          position++;
          compared.isComparedTo = false;
        }
      } while (current.value === compared.value);
      current.isCurrent = false;
      // ustawiamy element na właściwej pozycji
      if (current.value !== result.array[position]) {
        // nie robimy typowej zamiany, tylko wstawiamy element na odpowiednie miejsce
        // a element który był na jego miejscu przenosimy do pamięci
        const temp = current;
        current = result.array[position];
        result.array[position] = temp;
        // zwiększamy licznik zamian
        result.swaps += 1;
        // zwracamy tablicę do wizualizacji
        current.isCurrent = true;
        yield result;
        current.isCurrent = false;
      }
    }
    // resetujemy oznaczenia aktualnego i porownywanego elementu
    resetResult(result);
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

cycleSort.algorithmName = "Cycle sort";

export { cycleSort };
