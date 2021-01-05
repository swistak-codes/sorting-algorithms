const swap = require('../../helpers/swap');
const heapSort = require('./heap-sort');
const { leftT, middleT, rightT } = require('./helpers');

function siftDown(elements, start, end) {
  let reads = 0, saves = 0;

  const left = leftT(start);
  const middle = middleT(start);
  const right = rightT(start);
  let largest;

  if (left <= end && elements[left] > elements[start]) {
    largest = left;
  } else {
    largest = start;
  }
  reads += 2;

  if (right <= end && elements[right] > elements[largest]) {
    largest = right;
  }
  reads += 2;

  if (middle <= end && elements[middle] > elements[largest]) {
    largest = middle;
  }
  reads += 2;

  if (largest !== start) {
    swap(elements, start, largest);
    saves += 2;

    const result = siftDown(elements, largest, end);
    reads += result.reads;
    saves += result.saves;
  }

  return { reads, saves };
}

function heapify(elements) {
  let reads = 0, saves = 0;

  for (let i = Math.floor((elements.length - 1) / 3); i >= 0; i--) {
    const result = siftDown(elements, i, elements.length - 1);
    reads += result.reads;
    saves += result.saves;
  }

  return { reads, saves };
}

function ternary(elements) {
  return heapSort(elements, heapify, siftDown)
}

ternary.algorithmName = 'Sortowanie przez kopcowanie (kopiec 3-narny)';

module.exports = ternary;