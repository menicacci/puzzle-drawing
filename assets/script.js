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

// Graphic improve needed
function initiateNavbar() {
	let buttonContainer = document.getElementById('buttonContainer');
	buttonContainer.innerHTML = '';
	const images = ['2_4_3_6_1_5_0_11_9_14_7_12_13_15_10_8.png', '6_1_3_4_2_0_11_12_5_8_10_15_9_13_7_14.png', '7_6_3_4_1_12_2_8_10_9_14_15_5_13_0_11.png'];

	for (let i = 0; i < images.length; i++) {
        const image = document.createElement('img');
        image.src = 'images/' + images[i];
        image.alt = 'Configuration ' + i;
        image.classList.add('nav-item-spacing');
        image.addEventListener('click', generateDigraph.bind(null, i)); // Utilizzo della funzione bind per passare l'indice corretto come argomento
        buttonContainer.appendChild(image);
	}
}

window.addEventListener('DOMContentLoaded', init);
const dataset = []

loadData()
		.then((data) => {
			data.forEach((d) => {
				dataset.push({ puzzle: d[0], move_seq: d[1] });
			});
			initiateNavbar();
			// generateDigraph(0); // Comment this out if you don't want to generate the graph immediately
		})
		.catch((error) => {
			console.log(error);
		});

