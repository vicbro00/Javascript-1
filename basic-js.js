//Loading screen
var load;

function loadScreen() {
  load = setTimeout(showPage, 1000);
}

function showPage() {
  const loaderElement = document.getElementById('loading');
  if (loaderElement) {
    loaderElement.style.display = 'none';
  } else {
    console.warn('Loading element not found.');
  }
}