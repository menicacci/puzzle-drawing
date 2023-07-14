
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
function initiateNavbar(configurations) {
	console.log(configurations);

	let buttonContainer = document.getElementById('buttonContainer');
	for (let i = 0; i < configurations.length; i++) {
		let image = new Image();
		image.classList.add('nav-item', 'nav-link');
		image.src = generateImage(configurations[i], 25, 15);
		buttonContainer.appendChild(image);

		// Add click event listener to toggle active class
		image.addEventListener('click', function(event) {
			event.preventDefault();
			// Remove active class from all images
			let images = document.querySelectorAll('.nav-item');
			images.forEach(function(img) {
				img.classList.remove('active');
			});
			// Add active class to clicked image
			image.classList.add('active');
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
		initiateNavbar(data.map(v => v[0]));
		// generateDigraph(0);
	})
	.catch((error) => {
		console.log(error);
	});
