function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function deepEquals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};

module.exports = {
  deepCopy,
  deepEquals,
};