document.addEventListener('DOMContentLoaded', function() {
  // console.log('death to jQuery');

  const giphyApiKey = '&api_key=tFvpXgEOxXP1PbRpS42cZaYLtPhT2Owr';
  const giphyApiRoute = `https://api.giphy.com/v1/gifs/search?q=cats&api_key=`;
  const giphyApiQueryRoute = `https://api.giphy.com/v1/gifs/search?q=`;

  // Giphy API Key -- lmited use: bad practice to store here, but for learning  purposes here it is
  // this will be refactored to separate, better for testing
  // function displayData(item) {
  //   let newImageCard = document.createElement('div');
  //   newImageCard.className = 'card';
  //   newImageCard.id = item.id;
  // }

  function queryGiphy(query = 'dogs') {
    console.log(giphyApiQueryRoute + query + giphyApiKey);

    // clear and reset display div
    fetch(giphyApiQueryRoute + query + giphyApiKey, {
      method: 'GET', // Defines what kind of request
    })
      .then(function(response) {
        return response.json();
      })
      .then(onSuccess)
      .catch(onError);

    function onSuccess(json) {
      document.getElementsByClassName('gif-gallery')[0].innerHTML = '';
      console.log(json);

      json.data.map(item => {
        let newDiv = document.createElement('div');
        let newImg = document.createElement('img');
        // newDiv.className = 'col-sm-1';
        newDiv.className = 'image-container';
        newImg.className = 'images';
        newImg.setAttribute(
          'src',
          `https://i.giphy.com/media/${item.id}/giphy.webp`
        );
        newDiv.appendChild(newImg);
        document.getElementsByClassName('gif-gallery')[0].appendChild(newDiv);
      });
    }

    function onError(error) {
      alert('Sorry, there was a problem!');
      console.dir(error);
    }
  }

  queryGiphy(); // initial search

  document
    .getElementsByClassName('btn')[0]
    // .addEventListener('submit', queryGiphy(query));
    .addEventListener('click', e => {
      // 'submit' vs 'click'
      e.preventDefault();
      let userQuery = document.getElementsByClassName('gif-input')[0].value;
      // console.log('grabbed query: ', userQuery);
      queryGiphy(userQuery);
    });

  queryGiphy(); // initial search for 'dogs'
});
