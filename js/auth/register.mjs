import { displayError } from "../utils/errorHandler.mjs";
import { API_REGISTER } from "../utils/apiConfig.mjs";

// Register User Inputs
const registerNameInput = document.getElementById("register-name");
const registerEmailInput = document.getElementById("register-email");
const registerPasswordInput = document.getElementById("register-password");
const registerAvatarUrl = document.getElementById("register-avatar-url");
const registerFormEl = document.getElementById("register-form");
const registerSuccessfulMessage = document.getElementById("register-successful");
const submitButton = document.querySelector("input[type='submit']");

/**
 * @description
 * Handles the registration process by sending a POST request to the API with user data.
 * If an avatar URL is provided, it is included in the request body.
 * Disables the submit button during the process and re-enables it after 3 seconds.
 * Displays a success message if registration is successful, or an error message if it fails.
 *
 * @async
 * @function registerUser
 */
async function registerFetch() {
  const bodyData = {
    name: registerNameInput.value,
    email: registerEmailInput.value,
    password: registerPasswordInput.value,
  };

  if (registerAvatarUrl.value !== "") {
    bodyData.avatar = registerAvatarUrl.value;
  };

  submitButton.disabled = true;

  try {
    const response = await fetch(`${API_REGISTER}`, {
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
    };

    registerSuccessfulMessage.classList.remove("hidden");
    registerSuccessfulMessage.innerText = "Registration successful!";
    setTimeout(() => {
      registerSuccessfulMessage.classList.add("hidden");
    }, 3000);

  } catch (error) {
    registerSuccessfulMessage.classList.add("hidden");
    const errorMessage = `An error occurred: ${error.message}`;
    displayError(errorMessage);
  } finally {
    setTimeout(() => {
      submitButton.disabled = false;
    }, 3000)
  };
};


registerFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  registerFetch();
});