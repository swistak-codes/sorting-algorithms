const swap = require('../helpers/swap');
const { asc, desc } = require('../helpers/comparators');

function shuffle(elements) {
  const result = [...elements];
  for (let i = elements.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    swap(result, i, randomIndex);
  }

  return result;
}

function sortAsc(elements) {
  return elements.sort(asc);
}

function sortDesc(elements) {
  return elements.sort(desc);
}

module.exports = {
  shuffle,
  sortAsc,
  sortDesc,
};