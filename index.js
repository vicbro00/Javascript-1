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

//Loading when filtering
function loadingFilter() {
  document.getElementById('loadingFilter').style.display = 'block';
}

function finishClick() {
  loadingFilter();

  setTimeout(() => {
    document.getElementById('loadingFilter').style.display = 'none';
  }, 500);
}

//Loading when adding to cart

function loadAddToCart() {
  document.getElementById('loadAddToCart').style.display = 'block';
}

function loadingCart() {
  loadAddToCart();

  setTimeout(() => {
    document.getElementById('loadAddToCart').style.display = 'none';
  }, 500)
}