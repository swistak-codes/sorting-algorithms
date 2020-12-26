<script>
  import Chart from "chart.js";
  import { onMount } from "svelte";
  import { currentData, isDataPresent } from "../store";
  import { dataToChart } from "../data/dataToChart";
  export let isNotSwap = false;

  let canvas;
  let chart;
  let comparisons;
  let swaps;
  let auxiliary;

  let swapText = isNotSwap ? "zapisów" : "zamian";

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
              display: false,
              ticks: {
                beginAtZero: true
              }
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
      auxiliary = value.auxiliary;
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
  <canvas bind:this={canvas} width="500" height="250"></canvas>
  {#if $isDataPresent}
    <p>Liczba porównań: {comparisons}; liczba {swapText}: {swaps}</p>
  {/if}
  {#if auxiliary}
    <p>Aktualna tablica pomocnicza:</p>
    <p>[{auxiliary.join(', ')}]</p>
  {/if}
</div>
