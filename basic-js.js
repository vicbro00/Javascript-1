//Loading screen
var load;

function loadScreen() {
  load = setTimeout(showPage, 1000);
}

function showPage() {
  const loaderElement = document.getElementById('loading'); // Use the correct ID
  if (loaderElement) {
    loaderElement.style.display = 'none';
  } else {
    console.warn('Loading element not found.');
  }
}