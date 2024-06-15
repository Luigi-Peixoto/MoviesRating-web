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
