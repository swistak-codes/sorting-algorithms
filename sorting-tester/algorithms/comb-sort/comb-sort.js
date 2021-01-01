const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');

function combSort(elements, gapGenerator) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    let gap = elements.length;
    let swapped = true;
    while(gap > 1 || swapped) {
      gap = gapGenerator(gap);
      swapped = false;

      for (let i = 0; i + gap < elements.length; i++) {
        const current = elements[i];
        const compared = elements[i + gap];
        reads += 2;
        if (current > compared) {
          swapped = true;
          swap(elements, i, i + gap);
          saves += 2;
        }
      }
    }
  });

  return { elements, reads, saves, memory, time };
}

module.exports = combSort;