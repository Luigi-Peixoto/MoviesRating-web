document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = {
        id: Date.now(),
        fullName: document.getElementById("fullname").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        comments: []
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/register", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert("Dados salvos com sucesso!");
                window.location.href = "/";
            } else if (xhr.status === 400){
                alert("Nome de usuário ou email já existente");
            }
        }
    };
    xhr.send(JSON.stringify(formData));
});