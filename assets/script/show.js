import APIKey from '../config/key.js';

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const seriesId = path.split('/').pop(); 

  const serieTitle = document.getElementById("movie-title")
  const serieImg = document.getElementById("movie-img")
  const serieDesc = document.getElementById("movie-description")
  const serieRate = document.getElementById("movie-rate")

  const url = `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${APIKey}&language=en-US`;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const serie = JSON.parse(xhr.responseText);
        
        if (serie) {
          serieTitle.textContent = serie.name;
          serieImg.src = `https://image.tmdb.org/t/p/w500/${serie.poster_path}`;
          serieImg.alt = "";
          serieDesc.textContent = serie.overview;
          serieRate.textContent = serie.vote_average.toFixed(1).toString();
          
          document.title = `Rate - ${serie.name.toUpperCase()}`;

        } else {
          console.log('Serie não encontrado', xhr.status);
        }
      } else {
        console.error('Erro ao buscar dados da serie:', xhr.status);
      }
    }
  };
      
  xhr.onerror = function () {
    console.error('Erro ao buscar dados da Serie:', xhr.statusText);
  };
    
  xhr.send();
});
  