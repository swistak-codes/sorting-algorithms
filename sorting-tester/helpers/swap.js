function swap(array, first, second) {
  const temp = array[first];
  array[first] = array[second];
  array[second] = temp;
}

module.exports = swap;