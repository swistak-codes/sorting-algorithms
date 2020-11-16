<style>
  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .container > :global(*) {
    margin: 0 0.5em;
  }
</style>

<div class="container">
	<slot />
</div>