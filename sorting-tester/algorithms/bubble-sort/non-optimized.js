const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');

function nonOptimized(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    const length = elements.length;
    for (let iteration = 0; iteration < length; iteration++) {
      for (let i = 0; i < length - 1; i++) {
        const current = elements[i];
        const compared = elements[i + 1];
        reads += 2;
        if (current > compared) {
          swap(elements, i, i + 1);
          saves += 2;
        }
      }
    }
  });

  return { elements, reads, saves, memory, time };
}

nonOptimized.algorithmName = 'Sortowanie bąbelkowe (bez optymalizacji)';

module.exports = nonOptimized;