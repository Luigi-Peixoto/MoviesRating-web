import APIKey from '../config/key.js';

const path = window.location.pathname;
const moviesPage = path.split('/').pop();

const moviesApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=pt-BR&page=${moviesPage}`;
const showsApiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${APIKey}&language=en-US&page=${moviesPage}`
const imagePath = 'https://image.tmdb.org/t/p/w500';

let type =  window.location.href.split("/")[3];
initPageButtons(type);

createContainer();

async function createContainer() {
    const container = document.createElement("div");
    container.setAttribute("id", "card-container");
    
    let catalogueType =  window.location.href.split("/")[3];

    const contentResults = await fetchMovies(catalogueType);
    contentResults.forEach(content => {
        container.appendChild(createCard(content, catalogueType));
    });

    const main = document.querySelector("main");
    main.appendChild(container);
}

//retorna card do filme
function createCard(content, catalogueType) {
    const card = document.createElement("div");
    card.classList.add("card");
    const image = document.createElement("img");
    image.classList.add("movie-img");
    image.src = content.image;
    
    card.addEventListener("click", function() {
        if(catalogueType == "movies"){
            window.location.href = `/movie/${content.id}`;
        }else if (catalogueType == "shows"){
            window.location.href = `/show/${content.id}`;
        }
    });

    card.appendChild(image);

    const title = document.createElement('p');
    title.classList.add("card-title")
    title.textContent = content.title || content.name;

    card.appendChild(title);
    return card;
}

function fetchMovies(catalogueType) {
    let apiUrl = "";
    
    if(catalogueType == "movies") {
        apiUrl = moviesApiUrl;
    } else if(catalogueType == "shows") {
        apiUrl = showsApiUrl;
    }
    
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            return data.results.map(content => ({
                id: content.id,
                title: content.title || content.name,
                rating: content.vote_average,
                image: `${imagePath}/${content.poster_path}`,
                description: content.overview
            }));
        })
        .catch(error => {
            console.error(`Ocorreu um erro`);
            return [];
        });
}

function initPageButtons(catalogueType) {
    let lastPageButton = document.getElementById("last-page");
    let nextPageButton = document.getElementById("next-page");
    
    let pageNumber = Number(window.location.href.split("/")[4]);

    if(pageNumber === 1) {
        lastPageButton.style.color = "transparent";
    } else {
        lastPageButton.addEventListener("click", () => {
            if(catalogueType === "movies"){
                window.location.href = `/movies/${pageNumber - 1}`;
            }else if (catalogueType === "shows"){
                window.location.href = `/shows/${pageNumber - 1}`;
            }
        });
    }
    
    if(pageNumber === 500) {
        nextPageButton.style.color = "transparent";
    } else {
        nextPageButton.addEventListener("click", () => {
            if(catalogueType === "movies"){
                window.location.href = `/movies/${pageNumber + 1}`;
            }else if (catalogueType === "shows"){
                window.location.href = `/shows/${pageNumber + 1}`;
            }
        });
    }
}