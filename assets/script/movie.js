import APIKey from '../config/key.js';

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const title = path.split('/').pop();
    console.log(title)
    
    const queryParams = new URLSearchParams({
        api_key: APIKey,
        query: title,
        language: 'pt-BR'
      }).toString();
    
    const url = `https://api.themoviedb.org/3/search/movie?${queryParams}`;
    console.log(url);
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const movieData = JSON.parse(xhr.responseText);
            const movie = movieData.results && movieData.results.length > 0 ? movieData.results[0] : null;
            if (movie) {
              console.log(movie.title, movie.release_date, movie.overview);
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
  