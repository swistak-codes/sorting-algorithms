<style>
  .container {
    display: flex;
    justify-content: center;
  }

  .container > :global(*) {
    margin: 0 0.5em;
  }
</style>

<div class="container">
	<slot />
</div>