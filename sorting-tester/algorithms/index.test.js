const algorithms = require('./index');

const testAlgs = Object.values(algorithms).map(x => [x.algorithmName, x]);
const inputs = [
  ['losowe dane', [8, 1, 3, 9, 0, 2], [0, 1, 2, 3, 8, 9]],
  ['posortowane', [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]],
  ['posortowane odwrotnie', [6, 5, 4, 3, 2, 1], [1, 2, 3, 4, 5, 6]],
  ['powtarzające się', [0, 0, 5, 2, 5, 3, 3, 2, 1, 1, 1, 0], [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 5, 5]],
];

describe('algorithms/', () => {
  describe.each(testAlgs)('%s', (_, sort) => {
    test.each(inputs)('%s', (_, input, expected) => {
      const result = sort(input);
      expect(result.elements).toEqual(expected);
    });
  });
});