import APIKey from '../config/key.js';

const path = window.location.pathname;
const moviesPage = path.split('/').pop();

const moviesApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=pt-BR&page=${moviesPage}`;
const imagePath = 'https://image.tmdb.org/t/p/w500';

initPageButtons();

createContainer();

async function createContainer() {
    const container = document.createElement("div");
    container.setAttribute("id", "card-container");
    
    const movies = await fetchMovies();
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

    card.addEventListener("click", function() {
        window.location.href = `/movie/${movie.id}`;
    });

    card.appendChild(image);

    return card;
}

//retorna filmes
function fetchMovies() {
    return fetch(moviesApiUrl)
        .then(response => response.json())
        .then(data => {
            return data.results.map(movie => ({
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

function initPageButtons() {
    let lastPageButton = document.getElementById("last-page");
    let nextPageButton = document.getElementById("next-page");
    
    let pageNumber = Number(window.location.href.split("/")[4]);

    if(pageNumber === 1) {
        lastPageButton.style.color = "transparent";
    } else {
        lastPageButton.addEventListener("click", () => {
            window.location.href = `/movies/${pageNumber - 1}`;
        });
    }

    nextPageButton.addEventListener("click", () => {
        window.location.href = `/movies/${pageNumber + 1}`;
    });
}