function repeated(count) {
  return [...Array(count).keys()].map((x) => ((x + 1) % (count / 5)) + 1);
}

function oneToN(count) {
  return [...Array(count).keys()]
    .map((x) => x + 1);
}


module.exports = {
  repeated,
  oneToN,
};