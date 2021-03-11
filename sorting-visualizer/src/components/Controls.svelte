<script>
  import Container from "./layout/Container.svelte";
  import Item from "./layout/Item.svelte";
  import Button from "./layout/Button.svelte";
  import {
    canExecuteIteration,
    currentData,
    sortDirection,
    isFreshData,
    isIterationFinished
  } from "../store";
  import { executeWhole } from "../helpers/executeWhole";
  import { executeAnimated, stopAnimation } from "../helpers/executeAnimated";

  export let algorithm;
  export let generator;
  export let blockedRewind;
  let fps = 30;
  let iterator;
  let isAnimating = false;

  /**
   * Funkcja uruchamiająca na nowo algorytm
   */
  function startIteration() {
    // pobieramy iterator z funkcji
    iterator = algorithm($currentData, $sortDirection, generator);
    // ustawiamy, ze dane nie są "świeze"
    $isFreshData = false;
  }

  /**
   * Funkcja przewijająca algorytm do samego końca
   */
  function fastForward() {
    // jezeli algorytm nie został uruchomiony, zróbmy to
    if ($isFreshData) {
      startIteration();
    }
    // wykorzystujemy funkcję pomocniczą uruchamiająca algorytm do samego końca
    // przekazujemy tez funkcję aktualizującą dane
    executeWhole(iterator, data => ($currentData = data));
    // określamy koniec algorytmu
    $isIterationFinished = true;
  }

  /**
   * Funkcja odtwarzająca animację algorytmu
   */
  async function animate() {
    // jezeli algorytm nie został uruchomiony, zróbmy to
    if ($isFreshData) {
      startIteration();
    }
    // oznaczmy ze zaczęliśmy odtwarzanie
    isAnimating = true;
    // wykorzystujemy funkcję pomocniczą uruchamiająca algorytm do samego końca z animacją
    // prędkość animacji będzie nam wyznaczać ile klatek animacji wyświetli się na sekundę, stąd dzielimy 1000 przez tą wartość
    // przekazujemy tez funkcję aktualizującą dane
    await executeAnimated(
      iterator,
      Math.round(1000 / fps),
      data => ($currentData = data)
    );
    if (isAnimating) {
      // określamy koniec algorytmu, jezeli animacja była odtwarzana
      $isIterationFinished = true;
      // określamy koniec animacji
      isAnimating = false;
    }
  }

  /**
   * Funkcja przerywająca animację
   */
  function stopPlaying() {
    stopAnimation();
    isAnimating = false;
  }

  /**
   * Funkcja przechodząca do następnego kroku
   */
  function goToNext() {
    // jezeli algorytm nie został uruchomiony, zróbmy to
    if ($isFreshData) {
      startIteration();
    }
    // pobieramy kolejną wartość z iteratora
    const newArray = iterator.next();
    // aktualizujemy wykres
    $currentData = newArray.value;
    if (newArray.done) {
      // jezeli otrzymaliśmy informację o końcu algorytmu, oznaczamy go
      $isIterationFinished = true;
    }
  }
</script>

<Container>
  <Button disabled={!$canExecuteIteration || isAnimating} onClick={goToNext}>Następny krok</Button>
  <Item>
    <label for="fps">Prędkość animacji</label>
    <input name="elements" type="number" min=1 max=60 bind:value={fps} disabled={!$canExecuteIteration || isAnimating}>
  </Item>
  {#if !isAnimating}
    <Button disabled={!$canExecuteIteration} onClick={animate}>Odtwórz animację</Button>
  {:else}
    <Button disabled={!$canExecuteIteration} onClick={stopPlaying}>Pauza</Button>
  {/if}
  <Button disabled={blockedRewind || !$canExecuteIteration || isAnimating} onClick={fastForward}>Przewiń do końca</Button>
</Container>