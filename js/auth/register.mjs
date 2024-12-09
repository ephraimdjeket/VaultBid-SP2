import { API_BASE_URL } from "../utils/apiConfig.mjs";

// Register User Inputs
const registerNameInput = document.getElementById("register-name");
const registerEmailInput = document.getElementById("register-email");
const registerPasswordInput = document.getElementById("register-password");
const registerAvatarUrl = document.getElementById("register-avatarurl");
const registerFormEl = document.getElementById("register-form");

async function registerFetch() {
    try{
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            name: registerNameInput.value,
            email: registerEmailInput.value,
            password: registerPasswordInput.value,
            avatar: registerAvatarUrl.value,
        }),
    });
    const json = await response.json();
    console.log(json)
} catch(error) {
    console.log("yes", response.error[0].message);
}
}

registerFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    registerFetch();
});