const API_KEY = "1D6TfNiI9D9OHCqa7SCm2BttZwg6kdBY";
const URL = "http://api.giphy.com/v1/gifs/search?";

document.addEventListener('DOMContentLoaded', function(e) {
  fetchGiphy('dogs');
  document.querySelector('.form-inline').addEventListener('submit', search);
});


function search(e) {
  e.preventDefault();
  const value = document.querySelector('.form-control.gif-input').value;
  fetchGiphy(value);
}

function fetchGiphy(q) {
  fetch(`${URL}q=${q}&api_key=${API_KEY}`, {
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
  gallery.innerHTML = "";

  data.forEach(item => {
    let url = item.images.fixed_height.url;
    let image = document.createElement("img");
    image.setAttribute("src",url);
    gallery.appendChild(image);
  })
}

function onError(error) {
  alert("Sorry, there was a problem!");
  console.dir(error);
}
