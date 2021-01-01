const algorithms = require('./algorithms');
const { deepEquals, deepCopy } = require('./helpers/deep');

const input = [8, 1, 3, 9, 0, 2];
const expected = [0, 1, 2, 3, 8, 9];

const wrong = [];

for (const key in algorithms) {
  if (Object.hasOwnProperty.call(algorithms, key)) {
    const algorithm = algorithms[key];
    console.log(`Testuję ${algorithm.algorithmName}`);
    const elements = deepCopy(input);
    const result = algorithm(elements);
    const isOk = deepEquals(result.elements, expected);
    if (isOk) {
      console.log('OK');
    } else {
      console.log('Błąd: ', result.elements);
      wrong.push(algorithm.algorithmName);
    }
    console.log('---');
  }
}

if (wrong.length > 0) {
  console.log('Błędnie działające:', wrong);
}