const apiKey = '806d9b72-8fc9-432c-a274-d54bdecb9d1a';
const apiURL = 'https://v2.api.noroff.dev/rainy-days';
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmljQiIsImVtYWlsIjoidmljYnJvMDI0NThAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzgwMTEwNzV9.Ke81gamCJK8NSBi-dNBiMOQSPUvGjdt_Sis7_vD2TZg';

const options = {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'X-Noroff-API-Key': apiKey
  }
};

const fetchDataWithTimeout = (url, options, timeout = 5000) => 
  Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeout))
  ]);

async function fetchProducts() {
  try {
    showLoader();
    const response = await fetchDataWithTimeout(apiURL, options);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data.data)) throw new Error('Data is not in the expected format');

    return data.data;
  } catch (error) {
    console.error('Error fetching API data:', error);
    alert('Failed to fetch products. Please try again later.');
  } finally {
    hideLoader();
  }
}

function displayProducts(products) {
  const container = document.getElementById('cardsContainer');
  if (!container) return console.error('Container not found');

  container.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image.url}" alt="${product.title}">
      <h4>${product.title}</h4>
      <p>${product.description}</p>
      <p>Price: $${product.discountedPrice}</p>
      <button class="add-to-cart-btn" data-id="${product.id}">Add to cart</button>
    `;
    container.appendChild(productCard);
  });

  setupAddToCartButtons(products);
}

function setupAddToCartButtons(products) {
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      const product = products.find(prod => prod.id === productId);
      if (product) addToCart(product);
    });
  });
}

function filterProducts(products, criteria) {
  if (criteria === 'all') return products;
  return products.filter(product => 
    criteria === 'onSale' ? product.onSale : product.gender.toLowerCase() === criteria.toLowerCase() || product.tags.includes(criteria.toLowerCase())
  );
}

async function setupFilterButtons(products) {
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
      const criteria = event.target.getAttribute('data-name');
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      showLoader();
      const filteredProducts = filterProducts(products, criteria);
      displayProducts(filteredProducts);
      hideLoader();
    });
  });
}

(async () => {
  const products = await fetchProducts();
  if (products) {
    displayProducts(products);
    setupFilterButtons(products);
  }
})();

function showLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'block';
}

function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
}

function updateCartLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}