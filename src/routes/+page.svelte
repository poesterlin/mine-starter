<script>
	export let data;
</script>

<h1>Servers</h1>
{#await data.servers then servers}
	<table>
		<thead>
			<th>World Name</th>
			<th>Players</th>
			<th></th>
		</thead>
		<tbody>
			{#each servers as server}
				<tr>
					<td>{server.world_name}</td>
					<td>{server.online}/{server.max}</td>
					<td class:green={server.running}>
						{#if server.running}
							<form action="?/stopServer" method="post">
								<input type="hidden" name="serverId" value={server.id} />
								<button id="stop-btn" type="submit">Stop Server</button>
							</form>
						{:else}
							<form action="?/startServer" method="post">
								<input type="hidden" name="serverId" value={server.id} />
								<button id="start-btn" type="submit">Start Server</button>
							</form>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/await}

<style>
	table {
		border-collapse: collapse;
		width: 100%;
	}

	thead {
		border-bottom: 1px solid #ddddddcc;
	}

	tr {
		border-bottom: 1px solid #dddddd3d;
		min-height: 56px;
	}

	th:first-child,
	td:first-child {
		text-align: left;
		padding: 8px;
	}

	td {
		padding: 8px;
		text-align: center;
	}

	button {
		background: 0;
		border-radius: 4px;
		padding: 10px 20px;
		text-align: center;
		display: inline-block;
		font-size: 16px;
		cursor: pointer;
		transition: all 0.3s ease 0s;
		color: white;
	}

	button#start-btn {
		border: 1px solid #4caf50;
	}

	button#start-btn:hover {
		background-color: #4caf50;
		box-shadow:
			0px 0px 6px 1px rgb(76 175 80 / 30%),
			0px 0px 10px 3px rgb(202 202 202 / 30%);
	}

	button#stop-btn {
		border: 1px solid #f44336;
	}

	button#stop-btn:hover {
		background-color: #f44336;
	}

	.green {
		color: green;
	}
</style>
