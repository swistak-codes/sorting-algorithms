const algorithms = require('./algorithms');
const { deepEquals, deepCopy } = require('./helpers/deep');

const inputs = [
  [8, 1, 3, 9, 0, 2],
  [1, 2, 3, 4, 5, 6],
  [6, 5, 4, 3, 2, 1],
  [0, 0, 5, 2, 5, 3, 3, 2, 1, 1, 1, 0],
];
const expected = [
  [0, 1, 2, 3, 8, 9],
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
  [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 5, 5],
];

const wrong = [];

for (const key in algorithms) {
  if (Object.hasOwnProperty.call(algorithms, key)) {
    const algorithm = algorithms[key];
    console.log(`Testuję ${algorithm.algorithmName}`);
    for (let i = 0; i < inputs.length; i++) {
      const elements = deepCopy(inputs[i]);
      const result = algorithm(elements);
      const isOk = deepEquals(result.elements, expected[i]);
      if (isOk) {
        console.log('OK', result.reads, result.saves, result.memory, result.time);
      } else {
        console.log('Błąd: ', result.elements);
        wrong.push(algorithm.algorithmName);
      }      
    }    
    console.log('---');
  }
}

if (wrong.length > 0) {
  console.log('Błędnie działające:', wrong);
}