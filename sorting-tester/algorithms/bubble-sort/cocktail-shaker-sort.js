const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');

function cocktailShakerSort(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    let bottom = 0;
    let top = elements.length - 1;
    let swapped = true;
    while (swapped) {
      swapped = false;
      for (let i = bottom; i < top; i++) {
        const current = elements[i];
        const compared = elements[i + 1];
        reads += 2;
        if (current > compared) {
          swap(elements, i, i + 1);
          saves += 2;
          swapped = true;
        }
      }
      
      if (!swapped) break;
      top--;

      for (let i = top; i > bottom; i--) {
        const current = elements[i];
        const compared = elements[i - 1];
        reads += 2;
        if (current < compared) {
          swap(elements, i, i - 1);
          saves += 2;
          swapped = true;
        }
      }

      bottom++;
    }
  });

  return { elements, reads, saves, memory, time };
}

cocktailShakerSort.algorithmName = 'Sortowanie koktajlowe';

module.exports = cocktailShakerSort;