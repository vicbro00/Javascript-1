let cart = [];
let totalPrice = 0;

function addToCart(product) {
  if (!product) {
    console.error("Product not found.");
    return; 
  }

  const existingProductIndex = cart.findIndex(p => p.id === product.id);
  
  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  
  totalPrice += product.discountedPrice;
  updateCartUI();
}

function updateCartUI() {
  const cartItemContainer = document.getElementById('cartItem');
  const totalElement = document.getElementById('total');
  
  cartItemContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemContainer.innerHTML = 'Your cart is empty';
  } else {
    cart.forEach(product => {
      const productInCart = document.createElement('div');
      productInCart.classList.add('cart-item');
      productInCart.innerHTML = `
        <img src="${product.image.url}" alt="${product.title}">
        <h4>${product.title})</h4>
        <p>Price: $${(product.discountedPrice * product.quantity).toFixed(2)}</p>
        <div>
        <button class="decrease" data-id="${product.id}" data-change="-1">-</button>
        x${product.quantity}
        <button class="increase" data-id="${product.id}" data-change="1">+</button>
        </div>
      `;
      cartItemContainer.appendChild(productInCart);
    });

    document.querySelectorAll('.decrease, .increase').forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-id');
        const change = parseInt(event.target.getAttribute('data-change'));
        changeQuantity(productId, change);
      });
    });
  }

  totalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function changeQuantity(productId, change) {
  const product = cart.find(prod => prod.id === productId);
  
  if (product) {
    product.quantity += change;
    
    if (product.quantity < 1) product.quantity = 1;
    if (product.quantity > 10) product.quantity = 10;
    
    totalPrice = cart.reduce((sum, product) => {
      if (product.discountedPrice) {
        return sum + product.discountedPrice * product.quantity;
      } else {
        console.error('Missing discountedPrice for product:', product);
        return sum;
      }
    }, 0);
    
  }
}

// Function to toggle the cart menu
function toggleCart() {
  const cartMenu = document.getElementById('cartMenu');

  if (cartMenu.style.display === 'block') {
    cartMenu.style.display = 'none';
  } else {
    cartMenu.style.display = 'block';
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      const product = products.find(prod => prod.id === productId);
      if (product) {
        addToCart(product);

       
        alert(`${product.title} has been added to your cart!`);
      }
    });
  });
});