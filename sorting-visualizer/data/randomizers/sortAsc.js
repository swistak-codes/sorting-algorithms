import { asc } from "../../helpers/comparators/asc";

/**
 * Zwraca elementy posortowane od najmniejszego do największego
 * @param {Number[]} elements
 */
export function sortAsc(elements) {
  // dość przewrotnie uzyjemy domyślny algorytm sortowania w JS
  return elements.sort(asc);
}
