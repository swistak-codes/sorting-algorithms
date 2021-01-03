const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');

function minSelection(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    for (let i = 0; i < elements.length; i++) {
      let k = i;
      for (let j = i + 1; j < elements.length; j++) {
        if (elements[j] < elements[k]) {
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

minSelection.algorithmName = 'Sortowanie przez wybieranie (szukanie minimum)';

module.exports = minSelection;