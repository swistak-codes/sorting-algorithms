const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');

function bidirectionalOptimized(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    for (let i = 0, k = elements.length - 1; i < elements.length && k - i > 0; i++, k--) {
      let min = i;
      let max = k;

      for (let j = i; j <= k; j++) {
        reads += 4;
        if (elements[j] > elements[max]) {
          max = j;
        }
        if (elements[j] < elements[min]) {
          min = j;
        }
      }

      if (min !== i) {
        swap(elements, i, min);
        saves += 2;
        if (max === i) {
          max = min;
        }
      }

      if (max !== k) {
        swap(elements, k, max);
        saves += 2;
      }
    }
  });

  return { elements, reads, saves, memory, time };
}

bidirectionalOptimized.algorithmName = 'Sortowanie przez wybieranie (dwukierunkowe, zoptymalizowane)';

module.exports = bidirectionalOptimized;