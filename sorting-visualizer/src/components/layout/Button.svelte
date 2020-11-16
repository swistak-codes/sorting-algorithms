<script>
 export let onClick;
 export let disabled = false;
</script>

<style>
	button {
	  background: #ff3e00;
	  color: white;
	  border: none;
	  padding: 8px 12px;
	  border-radius: 2px;
	  cursor: pointer;
	}
	button:disabled {
	  background: gray;
	  cursor: disabled;
	}
</style>

<button on:click={onClick} {disabled}><slot/></button>