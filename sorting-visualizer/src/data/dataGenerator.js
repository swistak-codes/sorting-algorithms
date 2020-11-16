import * as generators from "./valueGenerators";
import * as randomizers from "./randomizers";

/**
 * Generuje dane w formacie do sortowania
 * @param {Number} count
 * @param {String} generator
 * @param {String} randomizer
 */
export function dataGenerator(count, generator, randomizer) {
  // generujemy dane wskazanym generatorem
  const array = generators[generator](count);
  // rozlosowujemy dane wskazaną maszyną losującą
  const randomizedArray = randomizers[randomizer](array);

  // modyfikujemy tablicę aby oprócz wartości przechowywała takze dodatkowe dane
  // dane te wykorzystamy do wizualizacji sortowania
  return {
    array: randomizedArray.map((x) => ({
      value: x,
      isCurrent: false,
      isComparedTo: false
    })),
    comparisons: 0,
    swaps: 0
  };
}
