const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');

function inPlace(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    let i = 1;
    while (i < elements.length) {
      let j = i;
      reads += 2;
      while (j > 0 && elements[j - 1] > elements[j]) {
        swap(elements, j, j - 1);
        saves += 2;
        j--;
        reads += 2;
      }
      i++;
    }
  });

  return { elements, reads, saves, memory, time };
}

inPlace.algorithmName = 'Sortowanie przez wstawianie';

module.exports = inPlace;