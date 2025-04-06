//Loading screen
var load;

function loadScreen() {
  const loaderElement = document.getElementById('loading');
  if (loaderElement) {
    loaderElement.style.display = 'block';
  }

  load = setTimeout(showPage, 1000);
}

function showPage() {
  const loaderElement = document.getElementById('loader');
  if (loaderElement) {
    loaderElement.style.display = 'none';
  } else {
    console.warn('Loading element not found.');
  }
}

function toggleMenu() {
  const offScreenMenu = document.getElementById('offScreen');
  offScreenMenu.classList.toggle('open');
}