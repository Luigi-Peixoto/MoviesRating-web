import APIKey from "../config/key.js";

document.addEventListener("DOMContentLoaded", function() {
let timerId;
const movieDisplay = document.getElementById('searchResults');

function searchMovieOnChange() {
    clearTimeout(timerId); 
    timerId = setTimeout(searchMovie, 500);
}

function searchMovie() {
    const searchText = document.getElementById('searchInput').value.trim();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${searchText}&language=pt-BR`;

    if (searchText === '') {
        clearMovieDisplay();

        return;
    }
    movieDisplay.style.setProperty("display", "flex");
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar filmes.');
            }
            return response.json();
        })
        .then(data => {
            displayMovie(data.results.slice(0, 3));
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            alert('Erro ao buscar filmes. Verifique o console para mais detalhes.');
        });
}

function displayMovie(movies) {
    movieDisplay.innerHTML = '';

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('search-result');

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        img.alt = "";

        const resultContentDiv = document.createElement('div');
        resultContentDiv.classList.add('result-content');
        
        const title = document.createElement('h2');
        title.classList.add('result-title')
        title.textContent = movie.title;

        const date = document.createElement('p');
        const parts = movie.release_date.split('-');
        const [year, mounth, day] = parts;
        date.textContent = `Data de lançamento: ${day}/${mounth}/${year}`;

        resultContentDiv.appendChild(title);
        resultContentDiv.appendChild(date);

        movieDiv.appendChild(img);
        movieDiv.appendChild(resultContentDiv)
        
        movieDisplay.appendChild(movieDiv);
    });
}

function clearMovieDisplay() {
    movieDisplay.style.setProperty("display", "none");
}
  document.getElementById('searchInput').addEventListener('input', searchMovieOnChange);
});