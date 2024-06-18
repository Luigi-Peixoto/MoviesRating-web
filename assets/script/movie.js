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
    
  const url = `https://api.themoviedb.org/3/search/movie?${queryParams}`;

  const movieTitle = document.getElementById("movie-title")
  const movieImg = document.getElementById("movie-img")
  const movieDesc = document.getElementById("movie-description")
  const movieRate = document.getElementById("movie-rate")
    
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const movieData = JSON.parse(xhr.responseText);
        const movie = movieData.results && movieData.results.length > 0 ? movieData.results[0] : null;
        if (movie) {
          movieTitle.textContent = movie.title;
          movieImg.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          movieImg.alt = "";
          movieDesc.textContent = movie.overview;
          movieRate.textContent = movie.vote_average.toFixed(1).toString();
          
        } else {
          console.log('Filme não encontrado', xhr.status);
        }
      } else {
        console.error('Erro ao buscar dados do filme:', xhr.status);
      }
    }
  };
      
  xhr.onerror = function () {
    console.error('Erro ao buscar dados do filme:', xhr.statusText);
    document.getElementById('movie-details').innerHTML = '<p>Erro ao buscar dados do filme.</p>';
  };
    
  xhr.send();
});
  