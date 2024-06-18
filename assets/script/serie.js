import APIKey from '../config/key.js';

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const title = path.split('/').pop();
  document.title = title.toUpperCase().replace(/-/g, ' ');
  console.log(title.toUpperCase().replace(/-/g, ' '));
    
  const queryParams = new URLSearchParams({
    api_key: APIKey,
    query: title,
    language: 'pt-BR'
  }).toString();
    
  const url = `https://api.themoviedb.org/3/search/tv?${queryParams}`;
  console.log(url);

  const serieTitle = document.getElementById("movie-title")
  const serieImg = document.getElementById("movie-img")
  const serieDesc = document.getElementById("movie-description")
  const serieRate = document.getElementById("movie-rate")

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const serieData = JSON.parse(xhr.responseText);
        const serie = serieData.results && serieData.results.length > 0 ? serieData.results[0] : null;
        if (serie) {
          serieTitle.textContent = serie.name;
          serieImg.src = `https://image.tmdb.org/t/p/w500/${serie.poster_path}`;
          serieImg.alt = "";
          serieDesc.textContent = serie.overview;
          serieRate.textContent = serie.vote_average.toFixed(1).toString();
          
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
  