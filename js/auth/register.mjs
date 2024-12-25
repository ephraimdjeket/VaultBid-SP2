import { API_BASE_URL } from "../utils/apiConfig.mjs";

// Register User Inputs
const registerNameInput = document.getElementById("register-name");
const registerEmailInput = document.getElementById("register-email");
const registerPasswordInput = document.getElementById("register-password");
const registerAvatarUrl = document.getElementById("register-avatarurl");
const registerFormEl = document.getElementById("register-form");


async function registerFetch() {
    const bodyData = {
        name: registerNameInput.value,
        email: registerEmailInput.value,
        password: registerPasswordInput.value,
    }
    if (registerAvatarUrl.value !== "") {
        bodyData.avatar = { url: registerAvatarUrl.value };
    }
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),

        });
        const json = await response.json();
        if (!response.ok) {
            console.log("Error:", json.errors[0].message);
            return;
        } else {
            console.log("yes")
        }
    } catch (error) {
        console.error(error.message);
    }
}

registerFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    registerFetch();
});