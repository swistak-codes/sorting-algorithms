import App from "./components/App.svelte";
import * as algorithms from "./algorithms";

function getAlgorithm() {
  const params = new URLSearchParams(window.location.search);
  const algorithm = params.get("algorithm") || "bubbleSort";

  return algorithms[algorithm];
}

const app = new App({
  target: document.body,
  props: {
    algorithm: getAlgorithm()
  }
});

export default app;
