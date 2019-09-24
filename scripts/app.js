let jackpot;

document.addEventListener('DOMContentLoaded', function() {
  // console.log('death to jQuery');

  const giphyApiKey = '&api_key=tFvpXgEOxXP1PbRpS42cZaYLtPhT2Owr';
  const giphyApiRoute = `https://api.giphy.com/v1/gifs/search?q=cats&api_key=`;
  const giphyApiQueryRoute = `https://api.giphy.com/v1/gifs/search?q=`;

  // Giphy API Key -- lmited use: bad practice to store here, but for learning  purposes here it is
  function displayData(item) {
    let newImageCard = document.createElement('div');
    newImageCard.className = 'card';
    newImageCard.id = item.id;
  }

  function queryGiphy() {
    // fetch(`giphyApiRoute${giphyApiKey}`, {
    // fetch(giphyApiRoute + giphyApiKey, {

    let query = 'dogs';
    console.log('------------------');
    console.log(giphyApiQueryRoute + query + giphyApiKey);
    console.log('------------------');
    fetch(giphyApiQueryRoute + query + giphyApiKey, {
      method: 'GET', // Defines what kind of request
    })
      .then(function(response) {
        return response.json();
      })
      .then(onSuccess)
      .catch(onError);

    function onSuccess(json) {
      console.log(json);
      jackpot = json;
      // $('div').append('<h1>' + json.title + '</h1>');

      json.data.map(item => {
        let newDiv = document.createElement('div');
        let newImg = document.createElement('img');
        // newImg.setAttribute('src', item.images.looping.mp4);
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

  queryGiphy();
});
