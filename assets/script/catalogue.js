import APIKey from '../config/key.js';

const moviesApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=pt-BR`;
const imagePath = 'https://image.tmdb.org/t/p/w500';
let containerNumber = 0;

for(let i = 0; i < 6; i++) {
    createContainer(containerNumber);
    containerNumber++;
}

async function createContainer(containerNumber) {
    const container = document.createElement("div");
    container.classList.add("container");
    container.setAttribute("id", "container" + containerNumber);
    
    const movies = await fetchMovies(containerNumber);
    movies.forEach(movie => {
        container.appendChild(createCard(movie));
    });

    const main = document.querySelector("main");
    main.appendChild(container);
}

//retorna card do filme
function createCard(movie) {
    const card = document.createElement("div");
    card.classList.add("card");
    const image = document.createElement("img");
    image.classList.add("movie-img");
    image.src = movie.image;

    card.appendChild(image);

    return card;
}

//retorna filmes
function fetchMovies(containerNumber) {
    return fetch(moviesApiUrl)
        .then(response => response.json())
        .then(data => {
            return data.results.slice(containerNumber*6, (containerNumber + 1)*6).map(movie => ({
                id: movie.id,
                title: movie.title || movie.name,
                rating: movie.vote_average,
                image: `${imagePath}/${movie.poster_path}`,
                description: movie.overview
            }));
        })
        .catch(error => {
            console.error(`Ocorreu um erro`);
            return [];
        });
}