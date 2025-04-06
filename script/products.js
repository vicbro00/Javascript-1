// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log('Product ID from URL:', productId);

if (!productId) {
  console.error('No product ID found in URL');
  // Redirect to products page or show error message
  window.location.href = '/products.html';
} else {
  fetchProductDetails(productId);
}

// Function to fetch product details
async function fetchProductDetails(productId) {
  // Validate the product ID format first
  if (!isValidId(productId)) {
    throw new Error('Invalid product ID format');
  }

  const apiUrl = `https://v2.api.noroff.dev/rainy-days/${productId}`;
  console.log('Attempting to fetch from:', apiUrl);

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      // More specific error handling
      if (response.status === 404) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('API Response:', responseData); // Log the entire response

    // Validate the response structure
    if (!responseData.data) {
      throw new Error('Unexpected API response format');
    }

    displayProductDetails(responseData.data);
  } catch (error) {
    console.error("Error fetching product details:", error);
    // Re-throw with more context
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

// Helper function to validate UUID format
function isValidId(id) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

// Function to display product details
function displayProductDetails(product) {
  console.log('Displaying product:', product); // Add this log

  const container = document.getElementById('productDetails');
  if (!container) {
    console.error('Product details container not found');
    return;
  }

  // Check if required product properties exist
  if (!product || !product.title || !product.image) {
    console.error('Invalid product data:', product);
    container.innerHTML = '<p>Invalid product data</p>';
    return;
  }

  container.innerHTML = `
    <div class="product-detail-card">
      <img src="${product.image.url}" alt="${product.image.alt || product.title}" class="product-image">
      <div class="product-info">
        <h2>${product.title}</h2>
        <p class="description">${product.description}</p>
        <p class="price">$${product.discountedPrice || product.price}</p>
        ${product.sizes ? `<p class="sizes">Sizes: ${product.sizes.join(', ')}</p>` : ''}
        ${product.baseColor ? `<p class="color">Color: ${product.baseColor}</p>` : ''}
        ${product.gender ? `<p class="gender">Gender: ${product.gender}</p>` : ''}
        <button class="add-to-cart-btn" data-id="${product.id}">Add to cart</button>
      </div>
    </div>
  `;
}
