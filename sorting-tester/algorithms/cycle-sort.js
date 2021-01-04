const withTime = require('../helpers/withTime');

function cycleSort(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    for (let cycleStart = 0; cycleStart < elements.length - 1; cycleStart++) {
      let item = elements[cycleStart];
      reads++;

      let pos = cycleStart;
      for (let i = cycleStart + 1; i < elements.length; i++) {
        reads++;
        if (elements[i] < item) {
          pos++;
        }
      }

      if (pos === cycleStart) continue;

      while (item === elements[pos]) {
        reads++;
        pos++;
      }

      let temp = elements[pos];
      elements[pos] = item;
      item = temp;
      saves++;

      while (pos !== cycleStart) {
        pos = cycleStart;

        for (let i = cycleStart + 1; i < elements.length; i++) {
          reads++;
          if (elements[i] < item) {
            pos++;
          }
        }

        while (item === elements[pos]) {
          reads++;
          pos++;
        }

        let temp = elements[pos];
        elements[pos] = item;
        item = temp;
        saves++;
      }
    }
  });

  return { elements, reads, saves, memory, time };
}

cycleSort.algorithmName = 'Cycle sort';

module.exports = cycleSort;