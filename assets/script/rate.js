import APIKey from '../config/key.js';
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}
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
    loadPage();
    fetchMovies(mediaUrl);
    
    const iconOptions = document.querySelectorAll('.icon-option');
    const ratingInput = document.getElementById('rating');
    const formMovieId = document.getElementById('form-movieid');
    formMovieId.value = document.querySelector("main").getAttribute("data-id");
    const username = getCookie('username');
    const formUsername = document.getElementById('form-username');
    formUsername.value = username;
    
    iconOptions.forEach(option => {
        option.addEventListener('click', function () {
            iconOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            ratingInput.value = this.getAttribute('data-value');
            console.log(ratingInput.value)
        });
    });
});

function fetchMovies(mediaUrl) {
    const topContent = document.getElementById("top-content");
    const loading = document.getElementById("loading");
    const movieImg = document.getElementById("selected-movie-img");
    const movieTitle = document.getElementById("selected-movie-title");
    movieImg.alt = "";

    fetch(mediaUrl)
    .then(response => response.json())
    .then(data => {
        movieTitle.innerHTML = data.title || data.name;
        movieImg.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
        topContent.style.visibility = 'visible';
        loading.style.display = 'none';
    })
    .catch(error => {
        console.error(`Ocorreu um erro`);
    });
}

function loadPage() {
    const mediaType = window.location.pathname;
    var leftContent = document.createElement("div");
    leftContent.id = "left-content";

    var selectedMovieImg = document.createElement("img");
    selectedMovieImg.id = "selected-movie-img";
    selectedMovieImg.className = "banner";
    selectedMovieImg.src = "/images/imageError.png";
    selectedMovieImg.alt = "";

    leftContent.appendChild(selectedMovieImg);

    var rightContent = document.createElement("div");
    rightContent.id = "right-content";

    var selectedMovieTitle = document.createElement("p");
    selectedMovieTitle.id = "selected-movie-title";
    selectedMovieTitle.textContent = "Não foi possível acessar a Série";

    var registerForm = document.createElement("form");
    registerForm.id = "register-form";
    registerForm.name = "register-form";
    registerForm.className = "form";
    registerForm.action = mediaType;
    registerForm.method = "post";

    var formsOptions = document.createElement("div");
    formsOptions.className = "forms-options";

    var likeOption = document.createElement("div");
    likeOption.className = "icon-option";
    likeOption.dataset.value = "like";

    var likeIcon = document.createElement("i");
    likeIcon.className = "fa-regular fa-thumbs-up";

    var likeLabel = document.createElement("label");
    likeLabel.htmlFor = "like";

    var likeText = document.createElement("p");
    likeText.textContent = "Gostei";

    likeLabel.appendChild(likeText);
    likeOption.appendChild(likeIcon);
    likeOption.appendChild(likeLabel);

    var dislikeOption = document.createElement("div");
    dislikeOption.className = "icon-option";
    dislikeOption.dataset.value = "dislike";

    var dislikeIcon = document.createElement("i");
    dislikeIcon.className = "fa-regular fa-thumbs-down";

    var dislikeLabel = document.createElement("label");
    dislikeLabel.htmlFor = "dislike";

    var dislikeText = document.createElement("p");
    dislikeText.textContent = "Não Gostei";

    dislikeLabel.appendChild(dislikeText);
    dislikeOption.appendChild(dislikeIcon);
    dislikeOption.appendChild(dislikeLabel);

    formsOptions.appendChild(likeOption);
    formsOptions.appendChild(dislikeOption);

    var inputMovieId = document.createElement("input");
    inputMovieId.type = "hidden";
    inputMovieId.id = "form-movieid";
    inputMovieId.name = "id";

    var inputUsername = document.createElement("input");
    inputUsername.type = "hidden";
    inputUsername.id = "form-username";
    inputUsername.name = "username";

    var ratingDescription = document.createElement("textarea");
    ratingDescription.id = "rating-description";
    ratingDescription.className = "rating-description";
    ratingDescription.name = "description";
    ratingDescription.placeholder = "Disserte a respeito da sua avaliação";

    var inputRating = document.createElement("input");
    inputRating.type = "hidden";
    inputRating.id = "rating";
    inputRating.name = "rating";

    var submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.className = "register-submit";

    registerForm.appendChild(formsOptions);
    registerForm.appendChild(inputMovieId);
    registerForm.appendChild(inputUsername);
    registerForm.appendChild(ratingDescription);
    registerForm.appendChild(document.createElement("br"));
    registerForm.appendChild(inputRating);
    registerForm.appendChild(submitButton);

    rightContent.appendChild(selectedMovieTitle);
    rightContent.appendChild(registerForm);

    var topContent = document.getElementById("top-content");
    topContent.appendChild(leftContent);
    topContent.appendChild(rightContent);
    topContent.style.display = 'flex';
    topContent.style.visibility = 'hidden';
}