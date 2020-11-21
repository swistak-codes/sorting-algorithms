/**
 * Funkcja generująca odstępy do sortowania Shella zgodnie z wzorem opracowanym przez Shella (dająca zlozoność O(N^2))
 * @param {Number} elementsCount
 */
export function shell(elementsCount) {
  const result = [];
  let k = 1;
  do {
    // generujemy nowe elementy z wzoru N/(2^k)
    result.push(Math.floor(elementsCount / Math.pow(2, k)));
    // zwiększamy współczynnik k
    k++;
    // iterujemy tak długo, jak nowo dodane elementy są większe od 1
  } while (result[result.length - 1] > 1);
  // zwracamy liczby
  return result;
}

/**
 * Funkcja generująca odstępy do sortowania Shella zgodnie z wzorem opracowanym przez Knutha (dająca złozoność O(N^(3/2)))
 * @param {Number} elementsCount
 */
export function knuth(elementsCount) {
  const result = [];
  const limit = Math.ceil(elementsCount / 3);
  let k = 1;
  while (true) {
    // generujemy nowe elementy z wzoru (3^k-1)/2
    let newValue = (Math.pow(3, k) - 1) / 2;
    // zwiększamy współczynnik k
    k++;
    if (newValue <= limit) {
      // jezeli nowo wygenerowana liczba jest mniejsza bądz równa limitowi, dodajemy ją do wyniku
      result.push(newValue);
    } else {
      // jezeli jest większa od limitu, przerywamy pętlę
      break;
    }
  }
  // odwracamy kolejność elementów
  result.reverse();
  // zwracamy liczby
  return result;
}

/**
 * Funkcja generująca odstępy do sortowania Shella zgodnie z wzorem opracowanym przez Sedgewicka (1986) (dająca złozoność O(N^(4/3)))
 * @param {Number} elementsCount
 */
export function sedgewick(elementsCount) {
  const result = [];
  const limit = elementsCount;
  let k = 1;
  while (true) {
    // ustawiamy zmienną na nowe elementy
    let newValue;
    // sprawdzamy parzystosc wspolczynnika k
    if (k % 2 === 0) {
      // dla parzystego k stosujemy wzór 9*(2^k-2^(k/2))+1
      newValue = 9 * (Math.pow(2, k) - Math.pow(2, k / 2)) + 1;
    } else {
      // dla nieparzystego k stosujemy wzór 8*2^k-6*2^((k+1)/2)+1
      newValue = 8 * Math.pow(2, k) - 6 * Math.pow(2, (k + 1) / 2) + 1;
    }
    // zwiększamy współczynnik k
    k++;
    if (newValue <= limit) {
      // jezeli nowo wygenerowana liczba jest mniejsza bądz równa limitowi, dodajemy ją do wyniku
      result.push(newValue);
    } else {
      // jezeli jest większa od limitu, przerywamy pętlę
      break;
    }
  }
  // odwracamy kolejność elementów
  result.reverse();
  // zwracamy liczby
  return result;
}

/**
 * Funkcja zwracająca odstępy do sortowania Shella wyznaczone eksperymentalnie przez Marcina Ciurę
 */
export function ciura() {
  return [701, 301, 132, 57, 23, 10, 4, 1];
}
