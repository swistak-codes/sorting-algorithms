import { swap } from "../../helpers/swap";

/**
 * Zwraca elementy w losowej kolejności
 * @param {Number[]} elements
 */
export function shuffle(elements) {
  // robimy kopie otrzymanej tablicy
  const result = [...elements];

  // implementacja algoytmu Fishera-Yatesa
  for (let i = elements.length - 1; i >= 0; i--) {
    // losujemy jeden z elementów tablicy
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // zamieniamy go miejscami z aktualnym elementem
    swap(result, i, randomIndex);
  }

  // zwracamy przemieszaną tablicę
  return result;
}
