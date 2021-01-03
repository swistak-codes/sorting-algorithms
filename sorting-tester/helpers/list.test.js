const { arrayToList, getEmptyNode, listToArray } = require('./list');

describe('helpers/list', () => {
  describe('getEmptyNode', () => {
    test('zwraca pusty element', () => {
      const result = getEmptyNode();

      expect(result.next).toBeNull();
      expect(result.value).toBeNaN();
    });
  });

  describe('arrayToList', () => {
    test('pusta tablica -> pusty element', () => {
      const result = arrayToList([]);

      expect(result.next).toBeNull();
      expect(result.value).toBeNaN();
    });

    test('jednoelementowa tablica -> jeden element', () => {
      const result = arrayToList([1]);

      expect(result.next).toBeNull();
      expect(result.value).toEqual(1);
    });

    test('wieloelementowa tablica -> wiele elementów', () => {
      const result = arrayToList([1, 4, 2]);

      expect(result.value).toEqual(1);
      expect(result.next.value).toEqual(4);
      expect(result.next.next.value).toEqual(2);
      expect(result.next.next.next).toBeNull();
    });
  });

  describe('listToArray', () => {
    test('pusta lista -> pusta tablica', () => {
      const result = listToArray(getEmptyNode());

      expect(result).toHaveLength(0);
    });

    test('jeden element -> jednoelementowa tablica', () => {
      const result = listToArray({ next: null, value: 1 });

      expect(result).toHaveLength(1);
      expect(result).toEqual([1]);
    });

    test('wiele elementów -> wieloelementowa tablica', () => {
      const result = listToArray({ next: { next: { next: null, value: 2 }, value: 4 }, value: 1 });

      expect(result).toHaveLength(3);
      expect(result).toEqual([1, 4, 2]);
    });
  });
});