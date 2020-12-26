<script>
  import Parameters from "./Parameters.svelte";
  import Chart from "./Chart.svelte";
  import Controls from "./Controls.svelte";
  import Tree from "./Tree.svelte";

  export let algorithm;
  export let generator;
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<main>
	<h1>{algorithm.algorithmName}</h1>
  {#if generator}
    <h2>Ciąg odstępów: {generator.algorithmName}</h2>
  {/if}
  <Parameters canUseFloat={algorithm.canUseFloat} canChooseDirection={algorithm.canChooseDirection} />
  <Chart isNotSwap={algorithm.isNotSwap} />
  <Controls algorithm={algorithm} generator={generator} />
  {#if algorithm.hasTree}
    <Tree />
  {/if}
</main>