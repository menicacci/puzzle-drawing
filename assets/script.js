
function loadData() {
	return new Promise((resolve, reject) => {
		d3.json("dataset.json")
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				console.log('Error while reading JSON file');
				reject(error);
			});
	});
}

const dataset = []

loadData()
	.then((data) => {
		data.forEach((d) => {
			dataset.push(d)
		});
	})
	.catch((error) => {
		console.log(error);
	});

// TODO: Refactoring
function test(i) {
	let g = get_graph(dataset[i][0], dataset[i][1])
	let outputDiv = document.getElementById("output");
	outputDiv.innerHTML = ""; // Clear previous content

	for (let i = 0; i < g.length; i++) {
		let levelHeader = document.createElement("h3");
		levelHeader.textContent = "Level: " + i;
		outputDiv.appendChild(levelHeader);

		let puzzlesCount = document.createElement("p");
		puzzlesCount.textContent = "# of puzzles: " + g[i].length;
		outputDiv.appendChild(puzzlesCount);

		for (let j = 0; j < g[i].length; j++) {
			let puzzleInfo = document.createElement("p");
			puzzleInfo.textContent = "Puzzle: " + g[i][j][0] + "Moves: ";
			outputDiv.appendChild(puzzleInfo);

			let movesHeader = document.createElement("p");
			movesHeader.textContent = "Moves:";
			outputDiv.appendChild(movesHeader);

			for (let k = 0; k < g[i][j][1].length; k++) {
				let moveInfo = document.createElement("p");
				moveInfo.textContent = g[i][j][1][k];
				outputDiv.appendChild(moveInfo);
			}
		}
	}
}