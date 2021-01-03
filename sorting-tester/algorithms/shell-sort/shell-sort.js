function shellSort(elements, gaps) {
  let reads = 0, saves = 0, memory = 1;

  for (let gi = 0; gi < gaps.length; gi++) {
    const gap = gaps[gi];
    for (let i = 0; i < elements.length; i++) {
      const temp = elements[i];
      reads++;
      let j = 0;
      for (j = i; j >= gap && elements[j - gap] > temp; j -= gap) {
        reads++;
        elements[j] = elements[j - gap];
        saves++;
      }
      elements[j] = temp;
      saves++;
    }
  }

  return { elements, reads, saves, memory };
}

module.exports = shellSort;