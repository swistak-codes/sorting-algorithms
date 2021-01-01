function withTime(callback) {
  const start = process.hrtime.bigint();
  callback();
  const end = process.hrtime.bigint();

  return end - start;
}

module.exports = withTime;