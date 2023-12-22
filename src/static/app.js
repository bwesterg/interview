window.addEventListener("DOMContentLoaded", setup);


async function setup() {
	// START HERE
	// PRODUCTS CAN BE FETCHED USING: GET /products
}

const baseURL = "http://localhost:3000"
const productsURL = `${baseURL}/products`;
let products;

function fetchAndRenderProducts() {
	fetch(productsURL)
		.then(res => res.json())
		.then(data => {
		products = data;
		renderProducts(products); // Initial rendering with all products
		setupSearch(); 
		})
		.catch(error => {
		console.log('Error fetching products', error);
		});
	}

function renderProducts() {
	const container = document.getElementById('productContainer');
	products.forEach(product => {
		const card = document.createElement('div');
		card.classList.add('product-card');
		card.innerHTML = `
			<img src="${product.images[0].src}" alt="${product.title}">
			<h3>${product.title}</h3>
			<p>$${(product.price / 100).toFixed(2)}</p>
		`;
		container.appendChild(card);
		});
	}

// Render products based on the input
function renderProducts(productsToRender) {
const container = document.getElementById('productContainer');
container.innerHTML = ''; // Clear existing content

// Iterate over each product
productsToRender.forEach(product => {
	const card = document.createElement('div');
	card.classList.add('product-card');

	card.innerHTML = `
	<img src="${product.images[0].src}" alt="${product.title}">
	<h3>${product.title}</h3>
	<p>Price: $${(product.price / 100).toFixed(2)}</p>
	`;

	container.appendChild(card);
});
}

function setupSearch() {
// Function to handle input changes and trigger rendering
	function handleInputChange() {
		const inputElement = document.querySelector('.search-products input');
		const searchTerm = inputElement.value;

		// Filter and sort products based on the search term and price
		const filteredAndSortedProducts = products
			.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
			.sort((a, b) => a.price - b.price);

		renderProducts(filteredAndSortedProducts);
	}

	document.querySelector('.search-products input').addEventListener('input', handleInputChange);
}

fetchAndRenderProducts();

		