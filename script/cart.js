let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

function renderCartItems(container) {
  if (!container) return;

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = 'Your cart is empty';
    return;
  }

  cart.forEach(product => {
    const productInCart = document.createElement('div');
    productInCart.classList.add('cart-item');
    productInCart.innerHTML = `
      <img src="${product.image.url}" alt="${product.title}">
      <h4>${product.title}</h4>
      <p>Price: $${(product.discountedPrice * product.quantity).toFixed(2)}</p>
      <div>
        <button class="decrease" data-id="${product.id}" data-change="-1">-</button>
        x${product.quantity}
        <button class="increase" data-id="${product.id}" data-change="1">+</button>
      </div>
    `;
    container.appendChild(productInCart);
  });
}

function updateCartUI() {
  const cartItemContainer = document.getElementById('cartItem');
  const totalElement = document.getElementById('total');

  if (cartItemContainer && totalElement) {
    renderCartItems(cartItemContainer);
    totalElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

function changeQuantity(productId, change) {
  const product = cart.find(prod => prod.id === productId);
  if (!product) return;

  product.quantity += change;
  if (product.quantity < 1) product.quantity = 1;
  if (product.quantity > 10) product.quantity = 10;

  totalPrice = cart.reduce((sum, product) => sum + product.discountedPrice * product.quantity, 0);

  updateLocalStorage();
  updateCartUI();
  alert(`Updated quantity of ${product.title} to ${product.quantity}`);
}

function handleCartButtonClick(event) {
  const button = event.target;
  if (button.classList.contains('increase') || button.classList.contains('decrease')) {
    const productId = button.dataset.id;
    const change = parseInt(button.dataset.change);
    changeQuantity(productId, change);
  }
}

function addToCart(product) {
  if (!product || !product.id || !product.discountedPrice || !product.image?.url) return;

  const existingProductIndex = cart.findIndex(p => p.id === product.id);
  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  totalPrice += product.discountedPrice;
  updateLocalStorage();
  updateCartUI();
  alert(`${product.title} has been added to your cart!`);
}

document.addEventListener('DOMContentLoaded', () => {
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

  const cartItemContainer = document.getElementById('cartItem');
  cartItemContainer.addEventListener('click', handleCartButtonClick);
});

function toggleCart() {
  const cartMenu = document.getElementById('cartMenu');
  const cartItemContainer = document.getElementById('cartItem');
  const totalMenuElement = document.getElementById('total');

  if (cartMenu) {
    cartMenu.style.display = cartMenu.style.display === 'block' ? 'none' : 'block';
    renderCartItems(cartItemContainer);
    totalMenuElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

function getCartFromLocalStorage() {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
}
