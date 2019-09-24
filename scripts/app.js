document.addEventListener('DOMContentLoaded', function() {
  // console.log('death to jQuery');

  const giphyApiKey = '&api_key=tFvpXgEOxXP1PbRpS42cZaYLtPhT2Owr';
  const giphyApiRoute = `https://api.giphy.com/v1/gifs/search?q=cats&api_key=`;
  const giphyApiQueryRoute = `https://api.giphy.com/v1/gifs/search?q=`;

  let offset = 0;
  // Giphy API Key -- lmited use: bad practice to store here, but for learning  purposes here it is

  // this will be refactored to separate, better for testing
  // function displayData(item) {
  //   let newImageCard = document.createElement('div');
  //   newImageCard.className = 'card';
  //   newImageCard.id = item.id;
  // }

  function queryGiphy(query = 'dogs', offset = null) {
    let offsetParam = offset ? `&offset=${offset}` : '';

    console.log(giphyApiQueryRoute + query + offsetParam + giphyApiKey);
    fetch(giphyApiQueryRoute + query + offsetParam + giphyApiKey, {
      method: 'GET',
    })
      .then(function(response) {
        return response.json();
      })
      .then(onSuccess)
      .catch(onError);

    function onSuccess(json) {
      document.getElementById('gif-gallery').innerHTML = ''; // clear and reset the gallery
      document.getElementsByClassName('gif-input')[0].value = query; // clear and reset the gallery
      console.log(json);

      json.data.map(item => {
        let newDiv = document.createElement('div');
        let newAnchor = document.createElement('a');
        let newImg = document.createElement('img');
        newDiv.className = 'image-container';
        newImg.className = 'images';
        newAnchor.setAttribute('href', item.bitly_gif_url);
        newAnchor.setAttribute('target', '_blank');
        // add click img a href target="_blank"
        newImg.setAttribute(
          'src',
          `https://i.giphy.com/media/${item.id}/giphy.webp`
        );
        newDiv.appendChild(newAnchor);
        newAnchor.appendChild(newImg);
        document.getElementById('gif-gallery').appendChild(newDiv);
      });

      loadMoreButton();
    }

    function onError(error) {
      alert('Sorry, there was a problem!');
      console.dir(error);
    }
  }

  function loadMoreButton() {
    let offset = 0;
    let isButton = document.getElementById('more-button');
    if (isButton != null) {
      console.log('Load-More Button already found');
    } else {
      console.log('Generating Load-More Button');
      let loadMoreButton = document.createElement('button');
      // loadMoreButton.innerText = 'Load More';
      loadMoreButton.setAttribute('value', 'Load More');
      loadMoreButton.className = 'btn btn-primary';
      loadMoreButton.id = 'more-button';
      loadMoreButton.innerText = 'Load More';
      let searchButton = document.getElementsByName('search-button')[0];
      searchButton.insertAdjacentElement('afterend', loadMoreButton);

      document.getElementById('more-button').addEventListener('click', e => {
        e.preventDefault();
        // 'submit' vs 'click'
        // console.log('offsetcount: ' + offset);
        offset++;
        let userQuery = document.getElementsByClassName('gif-input')[0].value;
        // console.log('grabbed query: ', userQuery);
        queryGiphy(userQuery, offset);
      });
    }
  }

  document.getElementsByClassName('btn')[0].addEventListener('click', e => {
    // 'submit' vs 'click' ??
    e.preventDefault();
    let userQuery = document.getElementsByClassName('gif-input')[0].value;
    queryGiphy(userQuery);
  });

  // Setup code for adding gifs via click more button

  queryGiphy(); // initial search for 'dogs'
});
