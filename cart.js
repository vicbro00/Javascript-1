function toggleMenu() {
  const x = document.getElementById('offScreen');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}

function toggleCart() {
  const x = document.getElementById('cartMenu');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}

let cart = [];
let totalPrice = 0;
let data;

fetch('products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jsonData => {
    data = jsonData;
    console.log('Data loaded:', data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Function to add a product to the cart
function addToCart(productId) {
  if (!data) {
    console.error('Data is not loaded yet');
    return; 
  } 

  // Find the product by ID
  const product = data.data.find(item => item.id === productId);
  if (product) {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.numberOfUnits++;
    } else {
      cart.push({ ...product, numberOfUnits: 1});
    }
    updateCartDisplay();
  } else {
    console.error('Product not found');
  } 
  saveData();
}

function updateCartDisplay() {
  const cartItemContainer = document.getElementById('cartItem');
  cartItemContainer.innerHTML = '';

  let totalPrice = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <img src="${item.image.url}" alt="${item.image.alt}">
      <div>
        <button onclick="unitsBtn('-', ${index})">-</button>
        <span>${item.numberOfUnits}</span>
        <button onclick="unitsBtn('+', ${index})">+</button>
      </div
      <p>${item.title}</p>
      <p>£${item.price.toFixed(2)}</p>
      <button onclick="removeFromCart(${index})">Remove from Cart</button>
      `;

    cartItemContainer.appendChild(cartItem);
    totalPrice += item.price * item.numberOfUnits;
  });

  const totalDisplay = document.getElementById('total');
  totalDisplay.innerText = `£${totalPrice.toFixed(2)}`;
  console.log('Cart updated:', cart);
}

// Function to update product quantities
function unitsBtn(action, index) {
  const item = cart[index];
  if (item) {
    if (action === '-' && item.numberOfUnits > 1) {
      item.numberOfUnits--;
    } else if (action === '+') {
      item.numberOfUnits++;
    }
    console.log(`Updated item: ${item.title}, Quantity: ${item.numberOfUnits}`);
    updateCartDisplay();
    saveData();
  } else {
    console.error(`Item at index ${index} not found in cart`);
  }
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
  saveData();
}

// Saving and showing cart data with localStorage
function saveData() {
  localStorage.setItem('data', JSON.stringify(cart));
}

function showProducts() {
  const savedCart = localStorage.getItem('data');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
      updateCartDisplay();
    } catch (error) {
      console.error('Error parsing saved cart data:', error);
      localStorage.removeItem('data');
    }
  }
}

showProducts();