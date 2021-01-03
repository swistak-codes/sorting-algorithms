const swap = require('../../helpers/swap');
const withTime = require('../../helpers/withTime');

function bidirectional(elements) {
  let reads = 0, saves = 0, memory = 1;

  const time = withTime(() => {
    let bottom = 0;
    let top = elements.length - 1;
    while (bottom < top) {
      for (let i = bottom; i < top; i++) {
        let k = i;
        for (let j = i + 1; j < elements.length; j++) {
          if (elements[j] < elements[k]) {
            k = j;
          }
          reads += 2;
        }
        swap(elements, k, i);
        saves += 2;
      }
      top--;

      for (let i = top; i > bottom; i--) {
        let k = i;
        for (let j = i - 1; j >= 0; j--) {
          if (elements[j] > elements[k]) {
            k = j;
          }
          reads += 2;
        }
        swap(elements, k, i);
        saves += 2;
      }
      bottom++;
    }
  });

  return { elements, reads, saves, memory, time };
}

bidirectional.algorithmName = 'Sortowanie przez wybieranie (dwukierunkowe)';

module.exports = bidirectional;