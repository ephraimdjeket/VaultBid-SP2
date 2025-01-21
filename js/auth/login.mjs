import { API_LOGIN } from "../utils/apiConfig.mjs";
import { displayError } from "../utils/errorHandler.mjs";

const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const loginFormEl = document.getElementById("login-form");
const submitButton = document.querySelector("input[type='submit']");

function storingUserData(json, response) {
  if (!response.ok) {
    const errorMessage = json.errors[0].message || "Failed to login";
    displayError(errorMessage);
    submitButton.disabled = true;
    return;
  } else {
    localStorage.setItem("user", JSON.stringify(json.data));
    localStorage.setItem("accessToken", json.data.accessToken);
    window.location.href = "/listing/";
  };
};

async function login() {
  try {
    const response = await fetch(`${API_LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmailInput.value,
        password: loginPasswordInput.value,
      }),
    });
    submitButton.disabled = true;
    const json = await response.json();
    storingUserData(json, response);
  } catch (error) {
    const errorMessage = `An error occurred: ${error.message}`;
    displayError(errorMessage);
  } finally {
    setTimeout(() => {
      submitButton.disabled = false;
    }, 3000)
  };
};

loginFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});