function increaseUnits() {
}
function decreaseUnits() {
}

function loadCheckoutCart() {
  const savedCart = localStorage.getItem('data');
  const cart = savedCart ? JSON.parse(savedCart) : [];

  const checkoutCartContainer = document.getElementById('checkoutCart');
  checkoutCartContainer.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cartItem');
    cartItem.innerHTML = `
      <img src="${item.image.url}" alt="${item.image.alt}">
      <p>${item.title}</p>
      <button onclick="decreaseUnits(${index})">-</button>
      <span>${item.numberOfUnits}</span>
      <button onclick="increaseUnits(${index})">+</button>
      <p>Price: £${item.price.toFixed(2)}</p>
      <p>Subtotal: £${(item.price * item.numberOfUnits).toFixed(2)}</p>
      <button onclick="removeItem(${index})">Remove Item</button>
    `;
    checkoutCartContainer.appendChild(cartItem);
    totalPrice += item.price * item.numberOfUnits;
  });

  const totalDisplay = document.getElementById('checkoutTotal');
  totalDisplay.innerText = `Total: £${totalPrice.toFixed(2)}`;
}

function increaseUnits(index) {
  const savedCart = localStorage.getItem('data');
  const cart = savedCart ? JSON.parse(savedCart) : [];

  cart[index].numberOfUnits++;
  localStorage.setItem('data', JSON.stringify(cart));
  loadCheckoutCart();
}

function decreaseUnits(index) {
  const savedCart = localStorage.getItem('data');
  const cart = savedCart ? JSON.parse(savedCart) : [];

  if (cart[index].numberOfUnits > 1) {
    cart[index].numberOfUnits--;
  }
  localStorage.setItem('data', JSON.stringify(cart));
  loadCheckoutCart();
}

loadCheckoutCart();

function removeItem(index) {
  const savedCart = localStorage.getItem('data');
  const cart = savedCart ? JSON.parse(savedCart) : [];

  cart.splice(index, 1);

  localStorage.setItem('data', JSON.stringify(cart));

  loadCheckoutCart();
}

document.getElementById('completeOrderButton').addEventListener('click', completeOrder);

function completeOrder() {
  localStorage.removeItem('data');
  window.location.reload();
}