//Loading screen
var load;

function loadScreen() {
  load = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById('loader').style.display = 'none';
}