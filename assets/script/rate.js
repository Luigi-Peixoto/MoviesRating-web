import APIKey from '../config/key.js';

document.addEventListener('DOMContentLoaded', () => {  
    const mainElement = document.querySelector("main");
    const mediaType = mainElement.getAttribute("data-media-type");
    const mediaId = mainElement.getAttribute("data-id");
    const movieUrl = `https://api.themoviedb.org/3/movie/${mediaId}?api_key=${APIKey}&language=pt-BR`;
    const showUrl = `https://api.themoviedb.org/3/tv/${mediaId}?api_key=${APIKey}`;
    
    
    let mediaUrl = "";
    if(mediaType === "show") {
        mediaUrl = showUrl;
    } else if(mediaType === "movie") {
        mediaUrl = movieUrl;
    }

    fetchMovies(mediaUrl);
});


function fetchMovies(mediaUrl) {

    const movieImg = document.getElementById("selected-movie-img");
    const movieTitle = document.getElementById("selected-movie-title");
    movieImg.alt = "";

    fetch(mediaUrl)
        .then(response => response.json())
        .then(data => {
            movieTitle.innerHTML = data.title || data.name;
            movieImg.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
        })
        .catch(error => {
            console.error(`Ocorreu um erro`);
        });
}