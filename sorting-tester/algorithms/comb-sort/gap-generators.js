function normal(currentGap) {
  let newGap = Math.floor(currentGap * 10 / 13);
  if (newGap < 1) {
    newGap = 1;
  }
  return newGap;
}

function gap11(currentGap) {
  let newGap = normal(currentGap);
  if (newGap === 9 || newGap === 10) {
    newGap = 11;
  }
  return newGap;
}

module.exports = {
  normal,
  gap11,
};