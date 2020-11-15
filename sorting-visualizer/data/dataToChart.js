/**
 * Kolor zwykłych elementów
 */
const normalItemColor = "lightblue";

/**
 * Kolor aktualnie rozpatrywanego elementu
 */
const currentItemColor = "lightgreen";

/**
 * Kolor elementu do którego porównujemy
 */
const comparedItemColor = "yellow";

/**
 * Konwertuje dane otrzymane z algorytmu sortującego na dataset dla Chart.js
 * @param {Array} elements
 */
export function dataToChart(elements) {
  const result = { backgroundColor: [], data: [] };
  // iterujemy po kolei po wszystkich elementach
  for (let i = 0; i < elements.length; i++) {
    // dla ułatwienia pobieramy aktualny element
    const element = elements[i];
    // dodajemy wartość do tablicy danych
    result.data.push(element.value);
    // wybieramy styl wg tego z jakim elementem mamy do czynienia
    if (element.isCurrent) {
      result.backgroundColor.push(currentItemColor);
    } else if (element.isComparedTo) {
      result.backgroundColor.push(comparedItemColor);
    } else {
      result.backgroundColor.push(normalItemColor);
    }
  }

  // zwracamy wynik
  return [result];
}
