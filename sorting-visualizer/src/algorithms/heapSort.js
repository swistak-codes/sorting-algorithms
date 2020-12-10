import { swap } from "../helpers/swap";
import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

/**
 * Funkcja zwracająca indeks rodzica wskazanego elementu
 * @param {Number} i
 */
function getParentIndex(i) {
  return Math.floor((i - 1) / 2);
}

/**
 * Funkcja zwracająca lewe dziecko wskazanego elementu
 * @param {Number} i
 */
function getLeftChildIndex(i) {
  return 2 * i + 1;
}

/**
 * Funkcja zamieniająca kopiec w drzewo do wizualizacji
 * @param {Array} heap
 */
function heapToTree(heap) {
  // inicjujemy drzewo
  const tree = {
    nodes: [],
    edges: []
  };
  // przechodzimy po kolei po kopcu
  for (let i = 0; i < heap.length; i++) {
    // szukamy rodzica aktualnego elementu (korzeń nie ma rodzica)
    const parent = i > 0 ? getParentIndex(i) : null;
    // określamy parametry dla aktualnego węzła
    const current = {
      // identyfikator to pozycja w tablicy
      id: i,
      // liczbę wyświetlimy w postaci zaokrąglonej do dwóch miejsc po przecinku
      label: "" + parseFloat(heap[i].value.toFixed(2))
    };
    // dodajemy aktualny węzeł
    tree.nodes.push(current);
    if (parent !== null) {
      // dodajemy krawędź prowadzącą od rodzica do aktualnego węzła
      tree.edges.push({ from: parent, to: i });
    }
  }
  // zwracamy drzewo
  return tree;
}

/**
 * Funkcja przesuwająca elementy w dół kopca
 * @param {*} result
 * @param {Number} start
 * @param {Number} end
 * @param {Function} compare
 * @param {boolean} visualizeWhole
 */
function* siftDown(result, start, end, compare, visualizeWhole) {
  // za korzen kopca ustalmy na początek startowy element
  let root = start;

  while (getLeftChildIndex(root) <= end) {
    // resetujemy oznaczenia aktualnego i porownywanego elementu
    resetResult(result);
    // pobierzmy referencje na lewe dzieko
    let child = getLeftChildIndex(root);
    // ustalmy korzen jako aktualnie zamieniany element
    let toSwap = root;
    // wyciągamy referencję do elementów które ze sobą porównujemy
    let current = result.array[toSwap];
    let compared = result.array[child];
    // oznaczamy aktualnie brany pod uwagę element
    current.isCurrent = true;
    // budujemy drzewo do wizualizacji
    result.tree = heapToTree(
      visualizeWhole ? result.array : result.array.slice(0, end)
    );
    // zwracamy tablicę do wizualizacji
    yield result;
    // oznaczamy element do którego porównujemy
    compared.isComparedTo = true;
    // zwiększamy licznik porównań
    result.comparisons += 1;
    // budujemy drzewo do wizualizacji
    result.tree = heapToTree(
      visualizeWhole ? result.array : result.array.slice(0, end)
    );
    // zwracamy tablicę do wizualizacji
    yield result;
    // resetujemy oznaczenia aktualnego i porownywanego elementu
    resetResult(result);
    if (compare(compared.value, current.value)) {
      toSwap = child;
      current = result.array[toSwap];
    }
    current.isCurrent = true;
    // sprawdzamy czy jest prawe dziecko i czy jest w dobrym miejscu
    if (child + 1 <= end) {
      // zmieniamy porównywany element
      compared = result.array[child + 1];
      // oznaczamy element do którego porównujemy
      compared.isComparedTo = true;
      // zwiększamy licznik porównań
      result.comparisons += 1;
      // budujemy drzewo do wizualizacji
      result.tree = heapToTree(
        visualizeWhole ? result.array : result.array.slice(0, end)
      );
      // zwracamy tablicę do wizualizacji
      yield result;
      current.isCurrent = false;
      // jezeli dziecko jest w zlym miejscu to zamieniamy
      if (compare(compared.value, current.value)) {
        // zwiększamy licznik porównań
        result.comparisons += 1;
        // zmieniamy aktualny element
        toSwap = child + 1;
        current = result.array[toSwap];
        // oznaczamy aktualnie brany pod uwagę element
        current.isCurrent = true;
        // budujemy drzewo do wizualizacji
        result.tree = heapToTree(
          visualizeWhole ? result.array : result.array.slice(0, end)
        );
        // zwracamy tablicę do wizualizacji
        yield result;
      }
    }
    // sprawdźmy czy korzeń przechowuje największy element (czyli zamieniany)
    // jezeli tak, skończyliśmy naszą operację, jak nie, to kontynuujemy
    if (toSwap === root) {
      // resetujemy oznaczenia aktualnego i porownywanego elementu
      resetResult(result);
      return result;
    } else {
      compared = result.array[root];
      compare.isComparedTo = true;
      // zamieniamy element jezeli jest potrzeba
      swap(result.array, root, toSwap);
      // zwiększamy licznik zamian
      result.swaps += 1;
      // budujemy drzewo do wizualizacji
      result.tree = heapToTree(
        visualizeWhole ? result.array : result.array.slice(0, end)
      );
      // zwracamy tablicę do wizualizacji
      yield result;
      // zmieniamy korzen na aktualnie zamieniony element
      root = toSwap;
    }
  }
}

/**
 * Funkcja do przekształcania tablicy w kopiec
 * @param {*} result
 * @param {Number} count
 * @param {Function} compare
 */
function* heapify(result, count, compare) {
  let start = getParentIndex(count - 1);

  while (start >= 0) {
    yield* siftDown(result, start, count - 1, compare, true);
    start--;
  }

  return result;
}

/**
 * Implementacja sortowania przez kopcowanie pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* heapSort(elements, comparator) {
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  const result = {
    array: [...elements.array],
    comparisons: 0,
    swaps: 0,
    tree: heapToTree(elements.array)
  };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];
  // wyciągamy długość tablicy
  const length = elements.array.length;
  // najpierw zbudujmy kopiec z aktualnej tablicy
  yield* heapify(result, length, compare);
  // resetujemy oznaczenia aktualnego i porownywanego elementu
  resetResult(result);
  // budujemy drzewo do wizualizacji
  result.tree = heapToTree(result.array);
  // zwracamy tablicę do wizualizacji
  yield result;
  // ustalmy element koncowy dla petli sortowania
  let end = length - 1;
  // iterujemy tak dlugo, az "koniec" przesuniemy na sam początek, poniewaz posortowane elementy będą odkładać się na końcu tablicy
  while (end > 0) {
    // wyciągamy referencję do elementów które ze sobą porównujemy
    const current = result.array[0];
    const compared = result.array[end];
    // oznaczamy aktualnie brany pod uwagę element
    current.isCurrent = true;
    // oznaczamy element do którego porównujemy
    compared.isComparedTo = true;
    // budujemy drzewo do wizualizacji
    result.tree = heapToTree(result.array.slice(0, end));
    // zwracamy tablicę do wizualizacji
    yield result;
    // zamieniamy elementy
    swap(result.array, 0, end);
    // zwiększamy licznik zamian
    result.swaps += 1;
    // budujemy drzewo do wizualizacji
    result.tree = heapToTree(result.array.slice(0, end));
    // zwracamy tablicę do wizualizacji
    yield result;
    // zmniejszamy przedzial
    end--;
    // przez zamianę zniszczyliśmy właściwości stogu, więc musimy je przywrócić
    yield* siftDown(result, 0, end, compare, false);
  }
  // resetujemy oznaczenia aktualnego i porownywanego elementu
  resetResult(result);
  // budujemy drzewo do wizualizacji
  result.tree = heapToTree([]);
  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  return result;
}

heapSort.algorithmName = "Sortowanie przez kopcowanie";
heapSort.hasTree = true;

export { heapSort };
