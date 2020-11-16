import { desc } from "../../helpers/comparators/desc";

/**
 * Zwraca elementy posortowane od największego do najmniejszego
 * @param {Number[]} elements
 */
export function sortDesc(elements) {
  // dość przewrotnie uzyjemy domyślny algorytm sortowania w JS
  return elements.sort(desc);
}
