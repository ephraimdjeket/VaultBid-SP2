import { displayError } from "../ui/errorHandler.mjs";
import { API_BASE_URL } from "../utils/apiConfig.mjs";

// Register User Inputs
const registerNameInput = document.getElementById("register-name");
const registerEmailInput = document.getElementById("register-email");
const registerPasswordInput = document.getElementById("register-password");
const registerAvatarUrl = document.getElementById("register-avatarurl");
const registerFormEl = document.getElementById("register-form");
const registerSuccessfullMessage = document.getElementById("register-successful");


async function registerFetch() {
    const bodyData = {
        name: registerNameInput.value,
        email: registerEmailInput.value,
        password: registerPasswordInput.value,
    };


    if (registerAvatarUrl.value !== "") {
        bodyData.avatar = registerAvatarUrl.value;
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
            const errorMessage = json.errors[0].message || "Failed to register";
            displayError(errorMessage);
            return;
        }

        registerSuccessfullMessage.classList.remove("hidden");
        registerSuccessfullMessage.innerText = "Registration successful!";
        setTimeout(() => {
            registerSuccessfullMessage.classList.add("hidden");
        }, 3000);

    } catch (error) {
        registerSuccessfullMessage.classList.add("hidden");
        const errorMessage = `An error occurred: ${error.message}`;
        displayError(errorMessage);
    }
}


registerFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    registerFetch();
});