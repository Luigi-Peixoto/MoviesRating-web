import APIKey from '../config/key.js';
const imagePath = 'https://image.tmdb.org/t/p/w500';
const topContent = document.getElementById("top-content");
let topMovies = [];
let topSeries = [];

document.addEventListener("DOMContentLoaded", function() {
    
});
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=pt-BR`)
  .then(response => response.json())
  .then(data => {
        topMovies = data.results.slice(0, 6).map(movie => ({
        title: movie.title,
        rating: movie.vote_average,
        image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        description: movie.overview
      }));
      console.log(topMovies)
      console.log(topMovies.forEach(e =>{console.log(e.title)}))
      appendSection("Top Filmes", topMovies)
  })
  .catch(error => {
    console.error('Ocorreu um erro ao obter os filmes populares')
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
        const card = createCard(item.title, item.rating.toFixed(0), item.image, item.description);
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

