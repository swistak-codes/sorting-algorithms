const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');
const { parent } = require('./helpers');

function siftUp(elements, start, end) {
  let reads = 0, saves = 0;

  let child = end;
  while (child > start) {
    let parentEl = parent(child);

    reads += 2;
    if (elements[parentEl] < elements[child]) {
      swap(elements, parentEl, child);
      saves += 2;
    }
    child = parentEl;
  }

  return { reads, saves };
}

function heapify(elements, length) {
  let reads = 0, saves = 0;
  let end = 1;

  while (end < length) {
    const result = siftUp(elements, 0, end);
    reads += result.reads;
    saves += result.saves;
    end++;
  }
  return { reads, saves };
}

function topDown(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    let result = heapify(elements, elements.length);
    reads += result.reads;
    saves += result.saves;

    let end = elements.length - 1;
    while (end > 0) {
      swap(elements, end, 0);
      saves += 2;

      result = heapify(elements, end);
      reads += result.reads;
      saves += result.saves;

      end--;
    }
  });

  return { elements, reads, saves, memory, time };
}

topDown.algorithmName = 'Sortowanie przez kopcowanie (naprawa kopca top-down)';

module.exports = topDown;