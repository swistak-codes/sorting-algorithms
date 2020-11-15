<style>
  .item {
    display: flex;
    flex-direction: column;
  }
  .item > :global(label) {
    display: block;
  }
  .item > :global(input),
  .item > :global(select) {
    display: block;
  }
</style>

<div class="item">
  <slot />
</div>