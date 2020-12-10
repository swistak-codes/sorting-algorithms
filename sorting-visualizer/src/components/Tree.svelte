<script>
  import { Network } from "vis-network";
  import { DataSet } from "vis-data";
  import { onMount } from "svelte";
  import { currentData } from "../store";

  let element;
  let network = null;

  /**
   * Funkcja restartująca wizualizację
   */
  function destroy() {
    if (network !== null) {
      network.destroy();
      network = null;
    }
  }

  /**
   * Funkcja rysująca drzewo
   */
  function draw(tree) {
    destroy();
    const data = {
      nodes: new DataSet(tree.nodes),
      edges: new DataSet(tree.edges)
    };
    const options = {
      interaction: {
        dragNodes: false
      },
      layout: {
        hierarchical: {
          direction: "UD",
          sortMethod: "directed",
          shakeTowards: "roots"
        }
      },
      nodes: {
        color: {
          background: "yellow",
          border: "black"
        },
        shape: "box",
        font: {
          size: 24
        },
        margin: 15
      },
      edges: {
        arrows: "to"
      },
      physics: {
        enabled: false
      },
      clickToUse: true
    };
    network = new Network(element, data, options);
  }

  currentData.subscribe(value => {
    if (element && value && value.tree) {
      draw(value.tree);
    }
  });
</script>

<style>
  div {
    width: 100%;
    height: 400px;
  }
</style>

<div bind:this={element}></div>
