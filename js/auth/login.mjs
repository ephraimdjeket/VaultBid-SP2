import { API_BASE_URL } from "../utils/apiConfig.mjs";

const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const loginFormEl = document.getElementById("login-form");

async function login() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: loginEmailInput.value,
                password: loginPasswordInput.value,
            }),
        })
        const json = await response.json();
        if (!response.ok) {
            console.log(json.errors[0].message);
            return;
        } else {
            console.log("yes");
        }

    } catch (error) {
        const errorMessage = document.createElement("p");
        errorMessage.innerText = `${error.message}`;
        loginFormEl.appendChild(errorMessage);
        console.log(error.message)
    }
}

loginFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
});