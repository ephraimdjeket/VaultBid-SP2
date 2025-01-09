const errorMessageContainer = document.getElementById("error-message");
const errorMessageAvatar = document.getElementById("error-message-avatar");

export function displayError(message) {
    errorMessageContainer.innerText = message;
    errorMessageContainer.classList.remove("hidden");
    setTimeout(() => {
        errorMessageContainer.classList.add("hidden");
    }, 3000)
}

export function displayErrorAvatar(message) {
    errorMessageAvatar.innerText = message;
    errorMessageAvatar.classList.remove("hidden");
    setTimeout(() => {
        errorMessageAvatar.classList.add("hidden");
    }, 3000)
}