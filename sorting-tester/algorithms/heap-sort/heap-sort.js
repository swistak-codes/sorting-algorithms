const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');

function heapSort(elements, heapify, sift) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    let result = heapify(elements);
    reads += result.reads;
    saves += result.saves;

    let end = elements.length - 1;
    while (end > 0) {
      swap(elements, end, 0);
      saves += 2;

      end--;

      result = sift(elements, 0, end);
      reads += result.reads;
      saves += result.saves;
    }
  });

  return { elements, reads, saves, memory, time };
}

module.exports = heapSort;