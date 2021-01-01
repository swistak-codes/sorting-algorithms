const withTime = require('../../helpers/withTime');

function binary(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    for (let i = 1; i < elements.length; i++) {
      let left = 0;
      let right = i - 1;
      const current = elements[i];
      reads++;
      while (left <= right) {
        const middle = Math.floor(left + (right - left) / 2);
        reads += 1;
        if (current < elements[middle]) {
          right = middle - 1;
        } else {
          left = middle + 1;
        }
      }
      for (let j = i - 1; j >= left; j--) {
        elements[j + 1] = elements[j];
        saves += 2;
      }
      elements[left] = current;
      saves++;
    }
  });

  return { elements, reads, saves, memory, time };
}

binary.algorithmName = 'Sortowanie przez wstawianie (binarne)';

module.exports = binary;