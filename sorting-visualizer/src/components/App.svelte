<script>
  import Parameters from "./Parameters.svelte";
  import Chart from "./Chart.svelte";
  import Controls from "./Controls.svelte";

  export let algorithm;
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<main>
	<h1>{algorithm.algorithmName}</h1>
  <Parameters />
  <Chart />
  <Controls algorithm={algorithm} />
</main>