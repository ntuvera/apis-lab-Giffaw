const API_KEY = "1D6TfNiI9D9OHCqa7SCm2BttZwg6kdBY";
const URL = "http://api.giphy.com/v1/gifs/search?";

let count = 0, q = 'dogs';

document.addEventListener('DOMContentLoaded', function(e) {
  fetchGiphy('dogs');

  document.querySelector('.form-inline').addEventListener('submit', search);
  document.querySelector('.load-more').addEventListener('click', function(e) {
    fetchGiphy(q);
  });
});


function search(e) {
  e.preventDefault();
  count = 0;
  const value = document.querySelector('.form-control.gif-input').value;
  q = value;
  fetchGiphy(value);
}

function fetchGiphy(q) {
  fetch(`${URL}q=${q}&api_key=${API_KEY}&offset=${count}`, {
    method: "GET",
  })
    .then(function(response) {
      return response.json()
    })
    .then(onSuccess)
    .catch(function(error) {
      onError(error);
    });
}

function onSuccess(response) {
  const data = response.data;

  const gallery = document.querySelector(".gif-gallery");
  if (!count) gallery.innerHTML = "";

  data.forEach(item => {
    let url = item.images.fixed_height.url;
    let image = document.createElement("img");
    image.setAttribute("src",url);
    gallery.appendChild(image);
    count++;
  })
}

function onError(error) {
  alert("Sorry, there was a problem!");
  console.dir(error);
}
