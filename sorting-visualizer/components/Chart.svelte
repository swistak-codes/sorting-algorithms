<script>
  import Chart from "chart.js";
  import { onMount } from "svelte";
  import { currentData, isDataPresent } from "../store";
  import { dataToChart } from "../data/dataToChart";

  let canvas;
  let chart;
  let comparisons;
  let swaps;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    chart = new Chart(ctx, {
      type: "bar",
      data: {},
      options: {
        tooltips: {
          enabled: false
        },
        animation: {
          duration: 0
        },
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 8
          }
        },
        scales: {
          yAxes: [
            {
              display: false
            }
          ],
          xAxes: [
            {
              display: false
            }
          ]
        }
      }
    });
  });

  currentData.subscribe(value => {
    if (chart && value) {
      chart.data.labels = [...Array(value.array.length).keys()];
      chart.data.datasets = dataToChart(value.array);
      chart.update();
      comparisons = value.comparisons;
      swaps = value.swaps;
    }
  });
</script>

<style>
  div {
    width: 100%;
  }
  canvas {
    margin: auto;
  }
</style>

<div>
  {#if !$isDataPresent}
    <h2>Brak danych do pokazania!</h2>
  {/if}
  <canvas bind:this={canvas} width="500" height="100"></canvas>
  {#if $isDataPresent}
    <p>Liczba porównań: {comparisons}; liczba zamian: {swaps}</p>
  {/if}
</div>
