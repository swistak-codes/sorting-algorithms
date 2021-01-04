const bubbleSort = require('./bubble-sort');
const combSort = require('./comb-sort');
const insertSort = require('./insert-sort');
const shellSort = require('./shell-sort');
const selectionSort = require('./selection-sort');
const cycleSort = require('./cycle-sort');
const heapSort = require('./heap-sort');

module.exports = {
  ...bubbleSort,
  ...combSort,
  cycleSort,
  ...heapSort,
  ...insertSort,
  ...shellSort,
  ...selectionSort,
};