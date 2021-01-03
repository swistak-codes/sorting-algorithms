function shell(elementsCount) {
  const result = [];
  let k = 1;
  do {
    result.push(Math.floor(elementsCount / Math.pow(2, k)));
    k++;
  } while (result[result.length - 1] > 1);
  return result;
}

function frankLazarus(elementsCount) {
  const result = [];
  let k = 1;
  do {
    result.push(2 * Math.floor(elementsCount / Math.pow(2, k + 1)) + 1);
    k++;
  } while (result[result.length - 1] > 1);
  return result;
}

function hibbard(elementsCount) {
  const result = [];
  const limit = elementsCount;
  let k = 1;
  while (true) {
    let newValue = Math.pow(2, k) - 1;
    k++;
    if (newValue <= limit) {
      result.push(newValue);
    } else {
      break;
    }
  }
  result.reverse();
  return result;
}

function papernovStasevich(elementsCount) {
  const result = [1];
  const limit = elementsCount;
  let k = 1;
  while (true) {
    let newValue = Math.pow(2, k) + 1;
    k++;
    if (newValue <= limit) {
      result.push(newValue);
    } else {
      break;
    }
  }
  result.reverse();
  return result;
}

function prath(elementsCount) {
  const result = [1];
  const limit = elementsCount;
  let i2 = 0;
  let i3 = 0;
  while (true) {
    const new2 = 2 * result[i2];
    const new3 = 2 * result[i3];
    const newValue = Math.min(new2, new3);
    if (newValue <= limit) {
      result.push(newValue);
    } else {
      break;
    }
    i2 += Number(new2 <= new3);
    i3 += Number(new2 >= new3);
  }
  result.reverse();
  return result;
}

function knuth(elementsCount) {
  const result = [];
  const limit = Math.ceil(elementsCount / 3);
  let k = 1;
  while (true) {
    let newValue = (Math.pow(3, k) - 1) / 2;
    k++;
    if (newValue <= limit) {
      result.push(newValue);
    } else {
      break;
    }
  }
  result.reverse();
  return result;
}

function incerpiSedgewick(elementsCount) {
  return [1, 3, 7, 21, 48, 112, 336, 861, 1968, 4592, 13776, 33936, 86961, 198768, 463792, 1391376, 3402672, 8382192,
    21479367, 49095696, 114556624, 343669872, 852913488, 2085837936, 5138283696, 13166851971, 30095661648, 70223210512]
    .filter(x => x <= elementsCount)
    .reverse();
}

function sedgewick1982(elementsCount) {
  const result = [1];
  const limit = elementsCount;
  let k = 1;
  while (true) {
    let newValue = Math.pow(4, k) + 3 * Math.pow(2, k - 1) + 1;
    k++;
    if (newValue <= limit) {
      result.push(newValue);
    } else {
      break;
    }
  }
  result.reverse();
  return result;
}

function sedgewick1986(elementsCount) {
  const result = [1];
  const limit = elementsCount;
  let k = 1;
  while (true) {
    let newValue;
    if (k % 2 === 0) {
      newValue = 9 * (Math.pow(2, k) - Math.pow(2, k / 2)) + 1;
    } else {
      newValue = 8 * Math.pow(2, k) - 6 * Math.pow(2, (k + 1) / 2) + 1;
    }
    k++;
    if (newValue <= limit) {
      result.push(newValue);
    } else {
      break;
    }
  }
  result.reverse();
  return result;
}

function gonnetBaezaYates(elementsCount) {
  function h(k) {
    return k === 0 ? elementsCount : Math.max(Math.floor((5 *(h(k - 1)) / 11)), 1);
  }

  const result = [];
  let k = 1;
  do {
    result.push(h(k));
    k++;
  } while (result[result.length - 1] > 1);

  result.reverse();
  return result;
}

function tokuda(elementsCount) {
  const result = [1];
  const limit = elementsCount;
  let k = 1;
  while (true) {
    let newValue = Math.ceil(0.2 * (9 * Math.pow(9 / 4, k - 1) - 4));
    k++;
    if (newValue <= limit) {
      result.push(newValue);
    } else {
      break;
    }
  }
  result.reverse();
  return result;
}

function ciura(elementsCount) {
  return [701, 301, 132, 57, 23, 10, 4, 1].filter(x => x <= elementsCount);
}

module.exports = {
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
};