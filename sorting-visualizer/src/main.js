import App from "./components/App.svelte";
import * as algorithms from "./algorithms";
import * as generators from "./helpers/shellSortGapsGenerators";

const params = new URLSearchParams(window.location.search);

function getAlgorithm() {
  const algorithm = params.get("algorithm") || "treeSort";
  return algorithms[algorithm];
}

function getGenerator() {
  const generator = params.get("generator");
  return generator ? generators[generator] : null;
}

const app = new App({
  target: document.body,
  props: {
    algorithm: getAlgorithm(),
    generator: getGenerator()
  }
});

export default app;
