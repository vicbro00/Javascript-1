//Show menu
function toggleMenu() {
  const x = document.getElementById('offScreen');
  if (x) {
    x.style.display = (x.style.display === 'block') ? 'none' : 'block';
  } else {
    console.error('Menu element not found');
  }
}

//Show cart
function toggleCart() {
  const x = document.getElementById('cartMenu');
  if (x) {
    x.style.display = (x.style.display === 'block') ? 'none' : 'block';
  } else {
    console.error('Cart menu element not found');
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

// Add items
function addToCart(productId) {
  if (!data) {
    console.error('Data is not loaded yet');
    return; 
  } 

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

//Updating cart
function updateCartDisplay() {
  const cartItemContainer = document.getElementById('cartItem');
  if (!cartItemContainer) {
    console.error('Cart item container not found');
    return;
  }

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
  if (!totalDisplay) {
    console.error('Total display element not found');
    return;
  }
}

//Quantity
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

//Remove items
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
  saveData();
}

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

//Load when adding to cart
function loadAddToCart() {
  const loadElement = document.getElementById('loadAddToCart');
  if (loadElement) {
    loadElement.style.display = 'block';
  } else {
    console.error('Load Add To Cart element not found');
  }
}

function loadingCart() {
  loadAddToCart();

  setTimeout(() => {
    const loadElement = document.getElementById('loadAddToCart');
    if (loadElement) {
      loadElement.style.display = 'none';
    }
  }, 500);
}