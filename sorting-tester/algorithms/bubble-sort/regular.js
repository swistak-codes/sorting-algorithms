const swap = require('../../helpers/swap');

function regular(elements) {
  let reads = 0, saves = 0;

  for (let length = elements.length - 1; length > 1; length--) {
    for (let i = 0; i < length; i++) {
      const current = elements[i];
      const compared = elements[i + 1];
      reads += 2;
      if (current > compared) {
        swap(elements, i, i + 1);
        saves += 2;
      }
    }
  }

  return { elements, reads, saves };
}

regular.algorithmName = 'Sortowanie bąbelkowe';

module.exports = regular;