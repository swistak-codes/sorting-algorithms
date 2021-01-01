const combSortBase = require('./comb-sort');
const { normal, gap11 } = require('./gap-generators');

function combSort(elements) {
  return combSortBase(elements, normal);
}

function combSort11(elements) {
  return combSortBase(elements, gap11);
}

combSort.algorithmName = 'Sortowanie grzebieniowe';
combSort11.algorithmName = 'Sortowanie grzebieniowe (wariant 11)';

module.exports = {
  combSort,
  combSort11,
};