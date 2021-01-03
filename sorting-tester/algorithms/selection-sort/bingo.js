const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');

function bingo(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    let max = elements.length - 1;
    let nextValue = elements[max];
    reads++;

    for (let i = max - 1; i >= 0; i--) {
      reads++;
      if (elements[i] > nextValue) {
        nextValue = elements[i];
      }
    }

    while (max > 0 && elements[max] === nextValue) {
      reads++;
      max--;
    }

    while (max > 0) {
      let value = nextValue;
      nextValue = elements[max];
      reads++;

      for (let i = max - 1; i >= 0; i--) {
        reads += 2;
        if (elements[i] === value) {
          swap(elements, i, max);
          saves += 2;
          reads--;
          max--;
        } else if (elements[i] > nextValue) {
          nextValue = elements[i];
        }
      }

      while (max > 0 && elements[max] === nextValue) {
        reads++;
        max--;
      }
    }
  });

  return { elements, reads, saves, memory, time };
}

bingo.algorithmName = 'Sortowanie przez wybieranie (bingo sort)';

module.exports = bingo;