
// Load data from a json file
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

// TODO: Graphic improve needed
function initiateNavbar() {
	let buttonContainer = document.getElementById('buttonContainer');
	for (let i = 0; i < dataset.length; i++) {
		let button = document.createElement('button');
		button.classList.add('nav-item', 'nav-link');
		button.textContent = i.toString();
		buttonContainer.appendChild(button);

		button.addEventListener('click', function(event) {
			event.preventDefault();
			generateDigraph(i);
		});
	}
}

window.addEventListener('DOMContentLoaded', init);

const dataset = []

loadData()
	.then((data) => {
		data.forEach((d) => {
			dataset.push({puzzle: d[0], move_seq: d[1]})
		});
		initiateNavbar();
		generateDigraph(0);
	})
	.catch((error) => {
		console.log(error);
	});
