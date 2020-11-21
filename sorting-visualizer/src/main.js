import App from "./components/App.svelte";
import * as algorithms from "./algorithms";

const params = new URLSearchParams(window.location.search);

function getAlgorithm() {
  const algorithm = params.get("algorithm") || "treeSort";
  return algorithms[algorithm];
}

function getGenerator() {
  return params.get("generator") || "ciura";
}

const app = new App({
  target: document.body,
  props: {
    algorithm: getAlgorithm(),
    generator: getGenerator()
  }
});

export default app;
