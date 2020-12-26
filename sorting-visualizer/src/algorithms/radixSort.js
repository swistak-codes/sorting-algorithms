import { resetResult } from "../data/resetResult";

/**
 * Implementacja sortowania pozycyjnego pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 */
function* radixSort(elements) {
  // ustalamy ile bitów sprawdzamy (d) oraz ile bitów ma liczba (8)
  const d = 2;
  const w = 8;
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // zmienna w której będziemy przechowywać kopię wyniku
  let currentElements = JSON.parse(JSON.stringify(result.array));
  // konstruujemy kolejne przebiegi
  for (let pass = 0; pass < w / d; pass++) {
    // w duzej mierze tutaj powtarzamy kod sortowania przez zliczanie, tylko z drobnymi modyfikacjami
    // tworzymy pomocniczą tablicę do zliczania wystąpień elementów
    const countingArray = [...new Array(1 << d)].map(() => 0);
    // najpierw zliczamy ile razy dany element się powtarza
    for (let i = 0; i < currentElements.length; i++) {
      // wyciągamy aktualny element
      const current = result.array[i];
      // określamy pozycję w tablicy według wzoru
      const position = (current.value >> (d * pass)) & ((1 << d) - 1);
      // dodajemy wystąpienie
      countingArray[position] = countingArray[position] + 1;
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
    result.array = [...new Array(currentElements.length)].map(() => ({
      value: 0
    }));
    // zwracamy tablicę do wizualizacji
    yield result;
    for (let i = currentElements.length - 1; i >= 0; i--) {
      // określamy pozycję w tablicy według wzoru
      const position =
        (currentElements[i].value >> (d * pass)) & ((1 << d) - 1);
      // cofamy ostatnią pozycję wskazanego elementu
      countingArray[position] -= 1;
      // dodajemy element do tablicy wynikowej
      result.array[countingArray[position]] = currentElements[i];
      // oznaczamy aktualny element
      result.array[countingArray[position]].isCurrent = true;
      // przenosimy tablicę pomocniczą
      result.auxiliary = countingArray;
      // zwiększamy licznik zamian
      result.swaps += 1;
      // zwracamy tablicę do wizualizacji
      yield result;
      // resetujemy oznaczenia aktualnego i porownywanego elementu
      resetResult(result);
    }
    // robimy kopię aktualnego wyniku
    currentElements = JSON.parse(JSON.stringify(result.array));
    // resetujemy oznaczenia aktualnego i porownywanego elementu
    resetResult(result);
  }
  // resetujemy oznaczenia aktualnego i porownywanego elementu
  resetResult(result);
  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

radixSort.algorithmName = "Sortowanie pozycyjne";
radixSort.canUseFloat = false;
radixSort.canChooseDirection = false;
radixSort.isNotSwap = true;

export { radixSort };
