const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');

function maxSelection(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    for (let i = elements.length - 1; i >= 0; i--) {
      let k = i;
      for (let j = i - 1; j >= 0; j--) {
        if (elements[j] > elements[k]) {
          k = j;
        }
        reads += 2;
      }
      swap(elements, k, i);
      saves += 2;
    }
  });

  return { elements, reads, saves, memory, time };
}

maxSelection.algorithmName = 'Sortowanie przez wybieranie (szukanie maksimum)';

module.exports = maxSelection;