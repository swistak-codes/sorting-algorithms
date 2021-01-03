const swap = require('../../helpers/swap');
const { shuffle } = require('../../generators/randomizers');
const withTime = require('../../helpers/withTime');

const C = 4;

function compareExchange(elements, i, j) {
  let saves = 0;
  if(((i < j) && (elements[i] > elements[j])) || ((i > j) && (elements[i] < elements[j]))) {
    swap(elements, i, j);
    saves += 2;
  }
  return { reads: 2, saves };
}

function compareRegions(elements, s, t, offset) {
  let saves = 0, reads = 0, memory = 0;
  const mate = [...Array(offset).keys()];
  memory += offset;

  for (let count = 0; count < C; count++) {
    shuffle(mate);

    for (let i = 0; i < offset; i++) {
      const res = compareExchange(elements, s + i, t + mate[i]);
      saves += res.saves;
      reads += res.reads;
    }
  }

  return { saves, reads, memory };
}

function randomized(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    const n = elements.length;
    for (let offset = Math.floor(n / 2); offset > 0; offset = Math.floor(offset / 2)) {
      for (let i = 0; i < n - offset; i += offset) {
        const res = compareRegions(elements, i, i + offset, offset);
        reads += res.reads;
        saves += res.saves;
        memory += res.memory;
      }

      for (let i = n - offset; i >= offset; i -= offset) {
        const res = compareRegions(elements, i - offset, i, offset);
        reads += res.reads;
        saves += res.saves;
        memory += res.memory;
      }

      for (let i = 0; i < n - 3 * offset; i += offset) {
        const res = compareRegions(elements, i, i + 3 * offset, offset);
        reads += res.reads;
        saves += res.saves;
        memory += res.memory;
      }

      for (let i = 0; i < n - 2 * offset; i += offset) {
        const res = compareRegions(elements, i, i + 2 * offset, offset);
        reads += res.reads;
        saves += res.saves;
        memory += res.memory;
      }

      for (let i = 0; i < n; i += 2 * offset) {
        const res = compareRegions(elements, i, i + offset, offset);
        reads += res.reads;
        saves += res.saves;
        memory += res.memory;
      }

      for (let i = offset; i < n - offset; i += 2 * offset) {
        const res = compareRegions(elements, i, i + offset, offset);
        reads += res.reads;
        saves += res.saves;
        memory += res.memory;
      }
    }
  });

  return { elements, reads, saves, memory, time };
}

randomized.algorithmName = 'Sortowanie Shella (randomizowany, Goodrich)';

module.exports = randomized;