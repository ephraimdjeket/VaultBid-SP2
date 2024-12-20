import { API_BASE_URL, API_AUTH, API_LOGIN } from "../utils/apiConfig.mjs";

const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const loginFormEl = document.getElementById("login-form");

async function login() {
    try {
        const response = await fetch(`${API_BASE_URL}${API_AUTH}${API_LOGIN}`, {
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
        console.log(json)
        if (!response.ok) {
            return json.errors[0].message;
        } else {
            localStorage.setItem("name", json.data.name);
            localStorage.setItem("accessToken", json.data.accessToken);
            window.location.href = "/listing/";
        }

    } catch (error) {

    }
}

loginFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
});