const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');

function sort(elements, n) {
  let reads = 0, saves = 0, memory = 1;

  if (n > 0) {
    const result = sort(elements, n - 1);
    reads += result.reads;
    saves += result.saves;
    memory += result.memory;

    let j = n;
    reads += 2;
    while (j > 0 && elements[j - 1] > elements[j]) {
      swap(elements, j, j - 1);
      saves += 2;
      j--;
      reads += 2;
    }
  }

  return { elements, reads, saves, memory };
}

function inPlaceRecursive(elements) {
  let result;
  const time = withTime(() => {
    result = sort(elements, elements.length - 1);
  });

  return { ...result, time };
}

inPlaceRecursive.algorithmName = 'Sortowanie przez wstawianie (rekurencyjne)';

module.exports = inPlaceRecursive;