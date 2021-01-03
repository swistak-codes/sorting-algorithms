function getEmptyNode() {
  return {
    next: null,
    value: Number.NaN,
  };
}

function arrayToList(array) {
  const head = getEmptyNode();

  let previous = null;
  let current = head;
  for (let i = 0; i < array.length; i++) {
    current.value = array[i];
    current.next = getEmptyNode();
    previous = current;
    current = current.next;
  }
  if (previous) {
    previous.next = null;
  }

  return head;
}

function listToArray(list) {
  const result = [];

  if (Number.isNaN(list.value)) {
    return result;
  }

  let current = list;
  while (current) {
    result.push(current.value);
    current = current.next;
  }

  return result;
}

module.exports = {
  getEmptyNode,
  arrayToList,
  listToArray,
};