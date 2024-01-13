<main>
	<slot />
</main>

<style>
	:global(body) {
		margin: 3rem;
		padding: 0;
		background: #000639;
		background: linear-gradient(90deg, #111753 0%, #151b2d 100%);
		color: #fff; 
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Ubuntu,
			'Helvetica Neue',
			sans-serif;
	}

	main {
		margin: auto;
		max-width: 960px;
	}
</style>
