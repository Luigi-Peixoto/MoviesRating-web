import APIKey from '../config/key.js';

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const movieId = path.split('/').pop();
  
  var url = "";
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKey}&language=pt-BR`;
  const showUrl = `https://api.themoviedb.org/3/tv/${movieId}?api_key=${APIKey}`;
  if(path.startsWith("/movie")){
    url = movieUrl;
  }else{
    url = showUrl;
  }
  createMovieContent(url)
  loadComments(movieId);
});

function  createMovieContent(url){
  const movieTitle = document.getElementById("movie-title")
  const movieImg = document.getElementById("movie-img")
  const movieDesc = document.getElementById("movie-description")
  const movieRate = document.getElementById("movie-rate")

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const movie = JSON.parse(xhr.responseText);

        if (movie) {
          movieTitle.textContent = movie.title || movie.name;
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
};
  
function loadComments(movieId) {
  var xhr = new XMLHttpRequest();
  var url = '../data/comments.json'; 

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        if(window.location.pathname.startsWith("/movie")){
          for (var id in data.movies){
            if(id === movieId){
              if (data.movies.hasOwnProperty(id)) {
                var comments = data.movies[id];
                if (comments.length > 0) {
                  createCommentCards(comments);
                }
              }
              return;
            }
          }
        }else if (window.location.pathname.startsWith("/show")){
          for (var id in data.comments.shows){
            if(id === movieId){
              if (data.shows.hasOwnProperty(id)) {
                var comments = data.shows[id];
                if (comments.length > 0) {
                  createCommentCards(comments);
                }
              }
              return;
            }
          }
        }
      } else {
        console.error('Erro ao carregar os dados:', xhr.status, xhr.statusText);
      }
    }
  };

  xhr.open('GET', url, true);
  xhr.send();
}

function createCommentCards(comments){
  const container = document.getElementById('comment-content');
  container.innerHTML = '';
  for(let comment of comments){
    const card = document.createElement('div');
    card.classList.add("comment-card");

    const cardTop = document.createElement('div');
    cardTop.classList.add("comment-top");
    
    const author = document.createElement('p');
    author.classList.add("comment-author")
    author.textContent = comment.username;

    const image = document.createElement('img');
    image.classList.add("comment-img")
    if(comment.type === "like"){
      image.src = "/images/like.png";
      image.alt = "like";
    }else{
      image.src = "/images/dislike.png";
      image.alt = "dislike";
    }

    cardTop.appendChild(author);
    cardTop.appendChild(image);

    const text = document.createElement('p');
    text.classList.add("comment-text");
    text.textContent = comment.text;

    card.appendChild(cardTop);
    card.appendChild(text);

    container.appendChild(card);
  }
}