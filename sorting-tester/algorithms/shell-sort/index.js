const shellSortBase = require('./shell-sort');
const withTime = require('../../helpers/withTime');
const {
  shell,
  frankLazarus,
  hibbard,
  papernovStasevich,
  prath,
  knuth,
  incerpiSedgewick,
  sedgewick1982,
  sedgewick1986,
  gonnetBaezaYates,
  tokuda,
  ciura,
} = require('./gap-generators');

function shellSort(elements, gapGenerator) {
  let result;
  const gaps = gapGenerator(elements.length);
  const time = withTime(() => {
    result = shellSortBase(elements, gaps);
  });

  return { ...result, time };
}

const shellSortShell = (elements) => shellSort(elements, shell);
shellSortShell.algorithmName = 'Sortowanie Shella (Shell, 1959)';

const shellSortFrankLazarus = (elements) => shellSort(elements, frankLazarus);
shellSortFrankLazarus.algorithmName = 'Sortowanie Shella (Frank & Lazarus, 1960)';

const shellSortHibbard = (elements) => shellSort(elements, hibbard);
shellSortHibbard.algorithmName = 'Sortowanie Shella (Hibbard, 1963)';

const shellSortPapernovStasevich = (elements) => shellSort(elements, papernovStasevich);
shellSortPapernovStasevich.algorithmName = 'Sortowanie Shella (Papernov & Stasevich, 1965)';

const shellSortPrath = (elements) => shellSort(elements, prath);
shellSortPrath.algorithmName = 'Sortowanie Shella (Prath, 1971)';

const shellSortKnuth = (elements) => shellSort(elements, knuth);
shellSortKnuth.algorithmName = 'Sortowanie Shella (Knuth, 1971)';

const shellSortIncerpiSedgewick = (elements) => shellSort(elements, incerpiSedgewick);
shellSortIncerpiSedgewick.algorithmName = 'Sortowanie Shella (Incerpi & Sedgewick, 1985)';

const shellSortSedgewick1982 = (elements) => shellSort(elements, sedgewick1982);
shellSortSedgewick1982.algorithmName = 'Sortowanie Shella (Sedgewick, 1982)';

const shellSortSedgewick1986 = (elements) => shellSort(elements, sedgewick1986);
shellSortSedgewick1986.algorithmName = 'Sortowanie Shella (Sedgewick, 1986)';

const shellSortGonnetBaezaYates = (elements) => shellSort(elements, gonnetBaezaYates);
shellSortGonnetBaezaYates.algorithmName = 'Sortowanie Shella (Gonnet & Baeza-Yates, 1991)';

const shellSortTokuda = (elements) => shellSort(elements, tokuda);
shellSortTokuda.algorithmName = 'Sortowanie Shella (Tokuda, 1992)';

const shellSortCiura = (elements) => shellSort(elements, ciura);
shellSortCiura.algorithmName = 'Sortowanie Shella (Ciura, 2001)';

module.exports = {
  shellSortShell,
  shellSortFrankLazarus,
  shellSortHibbard,
  shellSortPapernovStasevich,
  shellSortPrath,
  shellSortKnuth,
  shellSortIncerpiSedgewick,
  shellSortSedgewick1982,
  shellSortSedgewick1986,
  shellSortGonnetBaezaYates,
  shellSortTokuda,
  shellSortCiura,
};