module.exports = {
  parent: (i) => Math.floor((i - 1) / 2),
  left: (i) => 2 * i + 1,
  right: (i) => 2 * i + 2,
};