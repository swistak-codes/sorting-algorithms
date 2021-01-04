const swap = require('../../helpers/swap');
const heapSort = require('./heap-sort');
const { parent, left } = require('./helpers');

function siftDown(elements, start, end) {
  let reads = 0, saves = 0;
  let root = start;

  while (left(root) <= end) {
    let child = left(root);
    let toSwap = root;

    reads += 2;
    if (elements[toSwap] < elements[child]) {
      toSwap = child;
    }

    if (child + 1 <= end) {
      reads += 2;
      if (elements[toSwap] < elements[child + 1]) {
        toSwap = child + 1;
      }
    }

    if (toSwap === root) {
      break;
    } else {
      swap(elements, root, toSwap);
      saves += 2;
      root = toSwap;
    }
  }

  return { reads, saves };
}

function heapify(elements) {
  let reads = 0, saves = 0;
  let start = parent(elements.length - 1);

  while (start >= 0) {
    const result = siftDown(elements, start, elements.length - 1);
    reads += result.reads;
    saves += result.saves;
    start--;
  }

  return { reads, saves };
}

function regular(elements) {
  return heapSort(elements, heapify, siftDown)
}

regular.algorithmName = 'Sortowanie przez kopcowanie';

module.exports = regular;