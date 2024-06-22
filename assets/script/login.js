let loginDropdownIsOpen = false;
const loginBtn = document.getElementById("login-dropdown-button");
const loginDropdown = document.getElementById("login-dropdown");
    
loginBtn.addEventListener("click", function(e) {
    if (loginDropdownIsOpen) {
        loginDropdown.style.setProperty("display", "none");
    } else {
        loginDropdown.style.setProperty("display", "block");
    }
        loginDropdownIsOpen = !loginDropdownIsOpen;
});

document.addEventListener("DOMContentLoaded", () => {
    const xhrCheck = new XMLHttpRequest();
        xhrCheck.open("GET", "/check-login", true);
        xhrCheck.onreadystatechange = function() {
            if (xhrCheck.readyState === XMLHttpRequest.DONE) {
                if (xhrCheck.status === 200) {
                    document.getElementById("user-header").style.display = "block";
                    document.getElementById("register-button").style.display = "none";
                    document.getElementById("login-dropdown-button").style.display = "none";
                    if(getCookie('username')){
                        document.getElementById("username-header").textContent = getCookie('username');
                    }
                } else if (xhrCheck.status === 401) {
                    if(window.location.pathname.endsWith("/rate")){
                        alert("Você precisa estar Logado para comentar!");
                        window.location.href = "/";
                    }
                }
            }
        };
    xhrCheck.send();

    document.getElementById("logout-button").addEventListener("click", function() {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/logout", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    alert("Logout efetuado com sucesso!");
                    document.getElementById("user-header").style.display = "none";
                    document.getElementById("register-button").style.display = "block";
                    document.getElementById("login-dropdown-button").style.display = "block";
                    parent.location.reload();
                }
            }
        };
        xhr.send();
    });
});
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