const minSelectionSort = require('./min-selection');
const maxSelectionSort = require('./max-selection');
const bingoSort = require('./bingo');
const cocktailSelectionSort = require('./bidirectional');
const cocktailSelectionSortOptimized = require('./bidirectional-optimized');

module.exports = {
  minSelectionSort,
  maxSelectionSort,
  bingoSort,
  cocktailSelectionSort,
  cocktailSelectionSortOptimized,
};