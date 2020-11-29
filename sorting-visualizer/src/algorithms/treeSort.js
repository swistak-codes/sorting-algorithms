import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

// pusty element drzewa
const emptyTree = {
  left: null,
  right: null,
  node: null
};
// oryginalna tablica
let originalArray = [];
// aktualny indeks
let currentIndex = 0;
// zmienna przechowująca rezultat algorytmu
let result = {};
// zmienna przechowująca aktualne drzewo
let currentTree = {};

/**
 * Funkcja konwertująca drzewo na tablicę
 * @param {*} tree
 * @param {*} acc
 */
function treeToArray(tree, acc = []) {
  let result = acc;
  // sprawdzamy czy aktualne poddrzewo zawiera element
  if (tree.node) {
    // jezeli zawiera lewą gałąz, odpalamy funkcje rekurencyjnie
    if (tree.left) {
      result = treeToArray(tree.left, result);
    }
    // dopisujemy aktualny element
    result.push(tree.node);
    // jezeli zawiera prawą gałąz, odpalamy funkcje rekurencyjnie
    if (tree.right) {
      result = treeToArray(tree.right, result);
    }
  }
  return result;
}

/**
 * Funkcja generująca tablicę do wyświetlenia na wykresie
 */
function generateResultArray() {
  // generujemy tablicę z aktualnego drzewa
  const treeArray = treeToArray(currentTree, []);
  let rest = [];
  // jezeli zostaly nam jakies elementy w oryginalnej tablicy, dodajemy je
  if (
    treeArray.length === currentIndex &&
    currentIndex < originalArray.length
  ) {
    rest = originalArray.slice(currentIndex);
    rest[0].isCurrent = true;
  } else if (currentIndex < originalArray.length - 1) {
    rest = originalArray.slice(currentIndex + 1);
  }
  // zwracamy polaczone obie tablice
  return [...treeArray, ...rest];
}

/**
 * Funkcja wstawiająca element do drzewa
 * @param {*} tree
 * @param {*} element
 * @param {Function} compare
 */
function* insertToTree(tree, element, compare) {
  // resetujemy oznaczenia aktualnego i porownywanego elementu
  resetResult(result);
  // jezeli drzewo nie ma przypisanej wartości, przypisujemy ją
  if (!tree.node) {
    tree.node = element;
    element.isCurrent = true;
    // zwracamy tablicę do wizualizacji
    result.array = generateResultArray();
    yield result;
    element.isCurrent = false;
  } else {
    // sprawdzamy czy drzewo ma gałęzie lewą i prawą, jak nie to dodajemy
    if (!tree.left) {
      tree.left = { ...emptyTree };
    }
    if (!tree.right) {
      tree.right = { ...emptyTree };
    }
    // oznaczamy aktualnie brane pod uwagę elementy
    element.isCurrent = true;
    tree.node.isComparedTo = true;
    // zwiększamy licznik porównań
    result.comparisons += 1;
    // zwracamy tablicę do wizualizacji
    result.array = generateResultArray();
    yield result;
    // czyścimy oznaczenia
    element.isCurrent = false;
    tree.node.isComparedTo = false;
    if (compare(tree.node.value, element.value)) {
      yield* insertToTree(tree.left, element, compare);
    } else {
      yield* insertToTree(tree.right, element, compare);
    }
  }
}

/**
 * Implementacja sortowania przez wstawianie pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* treeSort(elements, comparator) {
  originalArray = elements.array;
  currentTree = { ...emptyTree };
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];

  for (currentIndex = 0; currentIndex < elements.array.length; currentIndex++) {
    yield* insertToTree(currentTree, elements.array[currentIndex], compare);
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  result.array = generateResultArray();
  return result;
}

treeSort.algorithmName = "Sortowanie drzewiaste";

export { treeSort };
