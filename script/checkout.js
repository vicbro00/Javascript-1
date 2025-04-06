document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalPrice = parseFloat(localStorage.getItem('totalPrice') || '0.00').toFixed(2);

  console.log('Cart Data:', cart); // Debugging
  console.log('Total Price:', totalPrice);

  const cartMenuContainer = document.getElementById('cartItem');
  const totalMenuElement = document.getElementById('total');
  const checkoutContainer = document.getElementById('checkoutContainer');
  const checkoutTotal = document.getElementById('checkoutTotal');

  displayCart(cart, cartMenuContainer, totalMenuElement, checkoutContainer, checkoutTotal, totalPrice);
});

function displayCart(cart, cartMenuContainer, totalMenuElement, checkoutContainer, checkoutTotal, totalPrice) {
  if (cartMenuContainer) {
    cartMenuContainer.innerHTML = cart.length === 0 
      ? 'Your cart is empty' 
      : cart.map(product => createCartItem(product)).join('');
    totalMenuElement.textContent = `$${totalPrice}`;
  }

  if (checkoutContainer) {
    checkoutContainer.innerHTML = cart.length === 0
      ? 'Your cart is empty.'
      : cart.map(product => createCheckoutItem(product)).join('');
    if (checkoutTotal) checkoutTotal.textContent = `Total Price: $${totalPrice}`;
  }
}

function createCheckoutItem(product) {
  if (typeof product.discountedPrice !== 'number' || typeof product.quantity !== 'number') {
    console.error('Invalid product data:', product);
    return '';
  }
  return `
    <div class="checkout-item">
      <img src="${product.image.url}" alt="${product.title}">
      <h4>${product.title}</h4>
      <p>Price: $${product.discountedPrice}</p>
      <p>Quantity: ${product.quantity}</p>
      <p>Subtotal: $${(product.discountedPrice * product.quantity).toFixed(2)}</p>
    </div>
  `;
}

function completeOrder() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalPrice = parseFloat(localStorage.getItem('totalPrice') || '0.00');

  if (cart.length === 0 || totalPrice <= 0) {
    alert('There seems to be an issue with your cart. Please check your cart.');
    return;
  }

  alert('Order completed successfully!');
  localStorage.removeItem('cart');
  localStorage.removeItem('totalPrice');
  window.location.href = 'checkout-success.html';
}
