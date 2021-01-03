const bubbleSort = require('./bubble-sort');
const cocktailShakerSort = require('./cocktail-shaker-sort');
const combSort = require('./comb-sort');
const insertSort = require('./insert-sort');
const shellSort = require('./shell-sort');
const selectionSort = require('./selection-sort');

module.exports = {
  ...bubbleSort,
  cocktailShakerSort,
  ...combSort,
  ...insertSort,
  ...shellSort,
  ...selectionSort,
};