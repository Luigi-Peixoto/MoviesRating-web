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
    
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const serieData = JSON.parse(xhr.responseText);
        const serie = serieData.results && serieData.results.length > 0 ? serieData.results[0] : null;
        if (serie) {
          console.log(serie.name, serie.first_air_date, serie.overview);
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
    document.getElementById('movie-details').innerHTML = '<p>Erro ao buscar dados do serie.</p>';
  };
    
  xhr.send();
});
  