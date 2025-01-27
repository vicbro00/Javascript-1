//API
const apiKey = '806d9b72-8fc9-432c-a274-d54bdecb9d1a';
const apiURL = 'https://v2.api.noroff.dev/rainy-days';

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmljQiIsImVtYWlsIjoidmljYnJvMDI0NThAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzgwMTEwNzV9.Ke81gamCJK8NSBi-dNBiMOQSPUvGjdt_Sis7_vD2TZg';


const options = {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'X-Noroff-API-Key': `806d9b72-8fc9-432c-a274-d54bdecb9d1a`
  }
};

(async () => {
  try {
    const response = await fetch(`${apiURL}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
  } catch (error) {
    console.error('Error fetching API data:', error);
  }
})();

async function fetchProducts() {
  try {
    const response = await fetch(apiURL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    if (Array.isArray(data.data)) {
      displayProducts(data.data);
    } else {
      console.error('Data is not in the expected format:', data);
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching API data:', error);
  }
}

function displayProducts(products) {
  const container = document.getElementById('cardsContainer');
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

  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      const product = products.find(prod => prod.id === productId);
      if (product) {
        addToCart(product);
      }
    });
  });
}

function filterProducts(products, criteria) {
  if (criteria === 'all') {
    return products;
  }
  
  return products.filter(product => {
    if (criteria === 'onSale') {
      return product.onSale;
    }
    return product.gender.toLowerCase() === criteria.toLowerCase() || product.tags.includes(criteria.toLowerCase());
  });
}

function setupFilterButtons(products) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const criteria = event.target.getAttribute('data-name');
      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      
      const filteredProducts = filterProducts(products, criteria);
      displayProducts(filteredProducts);
    });
  });
}

(async () => {
  const products = await fetchProducts();
  setupFilterButtons(products);
})();