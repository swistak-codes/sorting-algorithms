import { writable, derived } from "svelte/store";

export const currentData = writable(null);
export const isDataPresent = derived(
  currentData,
  ($currentData) => $currentData !== null
);

export const isFreshData = writable(false);
export const isIterationFinished = writable(false);
export const canExecuteIteration = derived(
  [isIterationFinished, isDataPresent],
  ([$isIterationFinished, $isDataPresent]) =>
    !$isIterationFinished && $isDataPresent
);

export const sortDirection = writable("");
