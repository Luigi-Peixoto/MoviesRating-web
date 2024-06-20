import APIKey from '../config/key.js';

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const movieId = path.split('/').pop();
  
  const movieTitle = document.getElementById("movie-title")
  const movieImg = document.getElementById("movie-img")
  const movieDesc = document.getElementById("movie-description")
  const movieRate = document.getElementById("movie-rate")
    
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKey}&language=pt-BR`;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const movie = JSON.parse(xhr.responseText);

        if (movie) {
          movieTitle.textContent = movie.title;
          movieImg.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          movieImg.alt = "";
          movieDesc.textContent = movie.overview;
          movieRate.textContent = movie.vote_average.toFixed(1).toString();
          
          document.title = `Rate - ${movie.title.toUpperCase()}`;
          
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
  };
    
  xhr.send();
});
  