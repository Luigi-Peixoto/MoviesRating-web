import APIKey from '../config/key.js';
const imagePath = 'https://image.tmdb.org/t/p/w500';
const topContent = document.getElementById("top-content");
let movies = [];


fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=pt-BR`)
  .then(response => response.json())
  .then(data => {
      movies = data.results.slice(0, 6).map(movie => ({
        title: movie.title,
        rating: movie.vote_average,
        image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        description: movie.overview
      }));
      
      console.log(movies)
      console.log(movies.forEach(e =>{console.log(e.title)}))
      appendSection("Filmes Populares", movies)
  })
  .catch(error => {
    console.error('Ocorreu um erro ao obter os filmes populares')
  })

  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=pt-BR`)
  .then(response => response.json())
  .then(data => {
    movies = data.results.slice(0, 6).map(movie => ({
        title: movie.title,
        rating: movie.vote_average,
        image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        description: movie.overview
      }));
      console.log(movies)
      console.log(movies.forEach(e =>{console.log(e.title)}))
      appendSection("Melhores Filmes", movies)
  })
  .catch(error => {
    console.error('Ocorreu um erro ao obter os filmes populares')
  })


  fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${APIKey}&language=pt-BR`)
  .then(response => response.json())
  .then(data => {
    movies = data.results.slice(0, 6).map(movie => ({
        title: movie.name,
        rating: movie.vote_average,
        image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        description: movie.overview
      }));
      console.log(movies)
      console.log(movies.forEach(e =>{console.log(e.title)}))
      appendSection("Series Populares", movies)
  })
  .catch(error => {
    console.error('Ocorreu um erro ao obter as series populares')
  })

  fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKey}&language=pt-BR`)
  .then(response => response.json())
  .then(data => {
    movies = data.results.slice(0, 6).map(movie => ({
        title: movie.name,
        rating: movie.vote_average,
        image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        description: movie.overview
      }));
      console.log(movies)
      console.log(movies.forEach(e =>{console.log(e.title)}))
      appendSection("Melhores Series", movies)
  })
  .catch(error => {
    console.error('Ocorreu um erro ao obter as melhores séries')
  })

function appendSection(title, items) {
    const section = document.createElement("section");
    
    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = title;
    section.appendChild(sectionTitle);
    
    const container = document.createElement("span");
    container.className = "container";
    
    items.forEach(item => {
        console.log(item.title);
        const card = createCard(item.title, item.rating.toFixed(1), item.image, item.description);
        container.appendChild(card);
    });
    
    section.appendChild(container);
    topContent.appendChild(section);
}
function createCard(title, rating, image, description) {
    const card = document.createElement("div");
    card.className = "card";
    
    const img = document.createElement("img");
    img.className = "background";
    img.src = image;
    img.alt = "";
    card.appendChild(img);
    
    const cardContent = document.createElement("div");
    cardContent.className = "card-content";
    
    const cardTitle = document.createElement("h3");
    cardTitle.className = "title";
    cardTitle.textContent = title;
    cardContent.appendChild(cardTitle);
    
    const ratingElement = document.createElement("p");
    ratingElement.textContent = rating + " Estrelas";
    cardContent.appendChild(ratingElement);
    
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    cardContent.appendChild(descriptionElement);
    
    card.appendChild(cardContent);
    return card;
} 

