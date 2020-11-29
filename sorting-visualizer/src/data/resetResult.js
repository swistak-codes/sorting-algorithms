/**
 * Funkcja resetująca oznaczenia w tablicy wynikowej
 * @param {*} result
 */
export function resetResult(result) {
  // resetujemy oznaczenia aktualnego i porownywanego elementu
  result.array = result.array.map((x) => ({
    ...x,
    isCurrent: false,
    isComparedTo: false
  }));
}
