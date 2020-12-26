<script>
  import Button from "./layout/Button.svelte";
  import Container from "./layout/Container.svelte";
  import Item from "./layout/Item.svelte";
  import {
    currentData,
    sortDirection,
    isIterationFinished,
    isFreshData
  } from "../store";
  import { dataGenerator } from "../data/dataGenerator";

  export let canUseFloat = true;
  export let canChooseDirection = true;

  let generator = "oneToN";
  let elements = 15;
  let randomizer = "shuffle";
  let direction = "asc";

  /**
   * Funkcja generująca dane i restartująca stan aplikacji
   */
  function start() {
    $currentData = dataGenerator(
      Math.max(2, Math.min(elements, 100)),
      generator,
      randomizer
    );
    $sortDirection = direction;
    $isIterationFinished = false;
    $isFreshData = true;
  }
</script>

<Container>
  <Item>
    <label for="data-gen">Generator danych</label>
    <select name="data-gen" bind:value={generator}>
      <option value="oneToN">od 1 do N</option>
      <option value="repeated">powtarzające się</option>
      {#if canUseFloat}
        <option value="random">losowe</option>
        <option value="gaussRandom">losowe (Gauss)</option>
      {/if}
    </select>
  </Item>
  <Item>
    <label for="elements">Liczba elementów</label>
    <input name="elements" type="number" min=2 max=100 bind:value={elements}>
  </Item>
  <Item>
    <label for="data-random">Sposób ułożenia wartości</label>
    <select name="data-random" bind:value={randomizer}>
      <option value="shuffle">losowo</option>
      <option value="sortAsc">posortowane (rosnąco)</option>
      <option value="sortDesc">posortowane (malejąco)</option>
    </select>
  </Item>
  {#if canChooseDirection}
    <Item>
      <label for="sort-direction">Sposób sortowania</label>
      <select name="sort-direction" bind:value={direction}>
        <option value="asc">rosnąco</option>
        <option value="desc">malejąco</option>
      </select>
    </Item>
  {/if}
  <Button onClick={start}>Start</Button>
</Container>