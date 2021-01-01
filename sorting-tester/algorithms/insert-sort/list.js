const { arrayToList, listToArray } = require('../../helpers/list');
const withTime = require('../../helpers/withTime');

function sort(list) {
  let reads = 0, saves = 0, memory = 1;

  if (!list || !list.next) {
    return { elements: list, reads, saves, memory };
  }

  let head = null;
  while (list) {
    let current = list;
    list = list.next;

    reads += 2;
    if (!head || current.value < head.value) {
      if (!head) {
        reads -= 2;
      }
      current.next = head;
      head = current;
      saves += 2;
    } else {
      let p = head;
      while (p) {
        reads += 2;
        if (!p.next || current.value < p.next.value) {
          if (!p.next) {
            reads -= 2;
          }
          current.next = p.next;
          p.next = current;
          saves += 2;
          break;
        }
        p = p.next;
      }
    }
  }

  return { elements: head, reads, saves, memory };
}

function list(elements) {
  let result;
  
  const elementsAsList = arrayToList(elements);
  const time = withTime(() => {
    result = sort(elementsAsList);
  });

  result.elements = listToArray(result.elements);

  return { ...result, time };
}

list.algorithmName = 'Sortowanie przez wstawianie (oparte na listach)';

module.exports = list;