import { resetResult } from "../data/resetResult";
import * as comparators from "../helpers/comparators";

// pusty element drzewa
const emptyTree = {
  left: null,
  right: null,
  node: null,
  id: null
};
// oryginalna tablica
let originalArray = [];
// aktualny indeks
let currentIndex = 0;
// ostatni identyfikator dodany do drzewa
let lastId = -1;
// zmienna przechowująca rezultat algorytmu
let result = {};
// zmienna przechowująca aktualne drzewo
let currentTree = {};
// zmienna przechowująca liczbę zapisów w przechodzeniu drzewa
let traverseSaves = 0;

/**
 * Funkcja konwertująca drzewo na tablicę
 * @param {*} tree
 * @param {*} acc
 */
function treeToArray(tree, acc = [], countSaves = false) {
  let result = acc;
  // sprawdzamy czy aktualne poddrzewo zawiera element
  if (tree.node) {
    // jezeli zawiera lewą gałąz, odpalamy funkcje rekurencyjnie
    if (tree.left) {
      result = treeToArray(tree.left, result, countSaves);
    }
    // dopisujemy aktualny element
    result.push(tree.node);
    // inkrementujemy zmienną zliczającą zapisy
    if (countSaves) {
      traverseSaves++;
    }
    // jezeli zawiera prawą gałąz, odpalamy funkcje rekurencyjnie
    if (tree.right) {
      result = treeToArray(tree.right, result, countSaves);
    }
  }
  return result;
}

/**
 * Funkcja konwertująca drzewo na drzewo do wizualizacji
 * @param {*} tree
 * @param {*} acc
 */
function treeToVisualization(tree, acc = { nodes: [], edges: [] }) {
  let result = acc;
  // sprawdzamy czy aktualne poddrzewo zawiera element
  if (tree.node) {
    // dopisujemy aktualny element
    result.nodes.push({
      // identyfikator to pozycja w tablicy
      id: tree.id,
      // liczbę wyświetlimy w postaci zaokrąglonej do dwóch miejsc po przecinku
      label: "" + parseFloat(tree.node.value.toFixed(2))
    });
    // jezeli zawiera lewą gałąz, odpalamy funkcje rekurencyjnie
    if (tree.left && tree.left.id) {
      result.edges.push({
        from: tree.id,
        to: tree.left.id
      });
      result = treeToVisualization(tree.left, result);
    } else if (tree.right) {
      const id = Math.random();
      result.nodes.push({
        id,
        label: ""
      });
      result.edges.push({
        from: tree.id,
        to: id
      });
    }
    // jezeli zawiera prawą gałąz, odpalamy funkcje rekurencyjnie
    if (tree.right && tree.right.id) {
      result.edges.push({
        from: tree.id,
        to: tree.right.id
      });
      result = treeToVisualization(tree.right, result);
    } else if (tree.left) {
      const id = Math.random();
      result.nodes.push({
        id,
        label: ""
      });
      result.edges.push({
        from: tree.id,
        to: id
      });
    }
  }
  return result;
}

/**
 * Funkcja generująca tablicę do wyświetlenia na wykresie
 */
function generateResultArray(isFinal = false) {
  // generujemy tablicę z aktualnego drzewa
  const treeArray = treeToArray(currentTree, [], isFinal);
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
    tree.id = ++lastId;
    element.isCurrent = true;
    // zwracamy tablicę do wizualizacji
    result.array = generateResultArray();
    // generujemy drzewo do wizualizacji
    result.tree = treeToVisualization(currentTree);
    // zwiekszamy licznik zapisow
    result.swaps++;
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
    // generujemy drzewo do wizualizacji
    result.tree = treeToVisualization(currentTree);
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
 * Implementacja sortowania drzewiastego pozwalająca na wizualizację krok po kroku
 * @param {{}} elements
 * @param {String} comparator
 */
function* treeSort(elements, comparator) {
  originalArray = elements.array;
  currentTree = { ...emptyTree };
  traverseSaves = 0;
  // wykonujemy kopię oryginalnej tablicy oraz dokładamy dodatkowe informacje
  result = { array: [...elements.array], comparisons: 0, swaps: 0 };
  // wyciągamy funkcję porównującą
  const compare = comparators[comparator];

  for (currentIndex = 0; currentIndex < elements.array.length; currentIndex++) {
    yield* insertToTree(currentTree, elements.array[currentIndex], compare);
  }

  // zwracamy na sam koniec tablicę bez oznaczonych elementów
  result.array = generateResultArray(true);
  // dodajemy zapisy wynikające z przejścia po drzewie
  result.swaps += traverseSaves;
  // generujemy drzewo do wizualizacji
  result.tree = treeToVisualization(currentTree);
  return result;
}

treeSort.algorithmName = "Sortowanie drzewiaste";
treeSort.hasTree = true;
treeSort.isNotSwap = true;

export { treeSort };
