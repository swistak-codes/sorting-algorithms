function getEmptyNode() {
  return {
    next: null,
    value: Number.POSITIVE_INFINITY,
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
  previous.next = null;

  return head;
}

function listToArray(list) {
  const result = [];

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