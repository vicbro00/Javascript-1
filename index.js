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

  const product = data.data.find(item => item.id === productId);
  
  if (product) {
    cart.push(product);
    totalPrice += product.price;
    console.log(`Added to cart: ${product.title}`);
    
    updateCartDisplay();
  } else {
    console.error('Product not found');
  }
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
      <p>${item.title}</p>
      <p>£${item.price.toFixed(2)}</p>
      <button onclick="removeFromCart(${index})">Remove from Cart</button>
    `;

    cartItemContainer.appendChild(cartItem);

    totalPrice += item.price;
  });

  const totalDisplay = document.getElementById('total');
  totalDisplay.innerText = `£${totalPrice.toFixed(2)}`; // Update total price display
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  
  updateCartDisplay();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

/* Filter buttons */
const filterButtons = document.querySelectorAll(".filter-buttons button");
const filterableCards = document.querySelectorAll(".filterable-cards .card");

const filterCards = e => {
  document.querySelector('.active').classList.remove('active');
  e.target.classList.add('active');

  filterableCards.forEach(card => {
    card.classList.add('hide');
    if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === "all") {
      card.classList.remove('hide');
    }
  })
};

filterButtons.forEach(button => button.addEventListener('click', filterCards))