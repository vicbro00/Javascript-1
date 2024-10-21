/* Add to cart */

/* Fetch data */
fetch('https://v2.api.noroff.dev/rainy-days')
.then(response => response.json())
.then(data => {
  displayProducts(data.data);
})
.catch(error => console.log('Error fetching data:', error));


let cartItems = []; // Array to hold cart items
const cartMenu = document.getElementById('cartMenu');
const cartItemDisplay = document.getElementById('cartItem');
const totalDisplay = document.getElementById('total');

function addToCart(productId) {
  // Dummy data for products
  const products = [
    { id: 0, name: "Graves All Weather Jacket", price: 89.90, imgSrc: "Pictures/product-1.jpg" },
    { id: 1, name: "Annie Workout Jacket", price: 39.90, imgSrc: "Pictures/product-2.jpg" },
    { id: 2, name: "Bard Workout Jacket", price: 39.90, imgSrc: "Pictures/product-3.jpg" },
    { id: 3, name: "Milio Rain Jacket", price: 69.90, imgSrc: "Pictures/product-4.jpg" },
    { id: 4, name: "Jayce Rain Jacket", price: 59.90, imgSrc: "Pictures/product-5.jpg" },
    { id: 5, name: "Braum All Weather Jacket", price: 79.90, imgSrc: "Pictures/product-6.jpg" },
    { id: 6, name: "Ekko Fleece Jacket", price: 29.90, imgSrc: "Pictures/product-7.jpg" }
  ];

  const product = products.find(p => p.id === productId);
  if (product) {
    cartItems.push(product); // Add product to cart
    updateCartDisplay(); // Update the cart display
  }
}

function updateCartDisplay() {
  cartItemDisplay.innerHTML = ''; // Clear current cart items
  let total = 0;

  if (cartItems.length === 0) {
    cartItemDisplay.textContent = "Your cart is empty";
  } else {
    cartItems.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item'; // Add a class for styling if needed

      // Create and append the image element
      const img = document.createElement('img');
      img.src = item.imgSrc; // Set the image source
      img.alt = item.name; // Set the alt text
      img.style.width = '50px'; // Adjust the width as needed
      img.style.height = 'auto'; // Maintain aspect ratio

      // Create and append the remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.onclick = () => removeFromCart(index); // Call removeFromCart with the current index

      // Append the image and text to the item div
      itemDiv.appendChild(img);
      itemDiv.appendChild(document.createTextNode(` ${item.name} - £${item.price.toFixed(2)} `));
      itemDiv.appendChild(removeButton); // Append the remove button
      cartItemDisplay.appendChild(itemDiv); // Add item div to cart display

      total += item.price; // Calculate total price
    });
  }

  totalDisplay.textContent = `£ ${total.toFixed(2)}`; // Update total display
}

function removeFromCart(index) {
  cartItems.splice(index, 1); // Remove the item at the specified index
  updateCartDisplay(); // Update the cart display after removal
}