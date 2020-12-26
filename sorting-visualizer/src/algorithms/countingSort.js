import { resetResult } from "../data/resetResult";

/**
 * Implementacja sortowania przez zliczanie pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 */
function* countingSort(elements) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // tworzymy pomocniczą tablicę do zliczania wystąpień elementów
  const countingArray = [...new Array(elements.array.length + 1)].map(() => 0);
  // najpierw zliczamy ile razy dany element się powtarza
  for (let i = 0; i < elements.array.length; i++) {
    // wyciągamy aktualny element
    const current = result.array[i];
    // dodajemy wystąpienie
    countingArray[current.value] = countingArray[current.value] + 1;
    // oznaczamy aktualnie brany pod uwagę element
    current.isCurrent = true;
    // zwiększamy licznik zamian
    result.swaps += 1;
    // przenosimy tablicę pomocniczą
    result.auxiliary = countingArray;
    // zwracamy tablicę do wizualizacji
    yield result;
    // resetujemy oznaczenia aktualnego i porownywanego elementu
    resetResult(result);
  }
  // teraz wyznaczymy pozycje ostatniego elementu wskazywanego przez tablicę pomocniczą
  for (let i = 1; i < countingArray.length; i++) {
    countingArray[i] += countingArray[i - 1];
    // zwiększamy licznik zamian
    result.swaps += 1;
    // przenosimy tablicę pomocniczą
    result.auxiliary = countingArray;
    // zwracamy tablicę do wizualizacji
    yield result;
  }
  // czyścimy wynik
  result.array = [...new Array(elements.array.length)].map(() => ({
    value: 0
  }));
  // zwracamy tablicę do wizualizacji
  yield result;
  for (let i = elements.array.length - 1; i >= 0; i--) {
    // cofamy ostatnią pozycję wskazanego elementu
    countingArray[elements.array[i].value] -= 1;
    // dodajemy element do tablicy wynikowej
    result.array[countingArray[elements.array[i].value]] = elements.array[i];
    // oznaczamy aktualny element
    result.array[countingArray[elements.array[i].value]].isCurrent = true;
    // przenosimy tablicę pomocniczą
    result.auxiliary = countingArray;
    // zwiększamy licznik zamian
    result.swaps += 1;
    // zwracamy tablicę do wizualizacji
    yield result;
    // resetujemy oznaczenia aktualnego i porownywanego elementu
    resetResult(result);
  }
  // resetujemy oznaczenia aktualnego i porownywanego elementu
  resetResult(result);
  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

countingSort.algorithmName = "Sortowanie przez zliczanie";
countingSort.canUseFloat = false;
countingSort.canChooseDirection = false;
countingSort.isNotSwap = true;

export { countingSort };
