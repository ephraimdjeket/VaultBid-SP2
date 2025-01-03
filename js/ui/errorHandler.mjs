const errorMessageContainer = document.getElementById("errorMessage");

export function displayError(message) {
    errorMessageContainer.innerText = message;
    errorMessageContainer.classList.remove("hidden");
    setTimeout(() => {
        errorMessageContainer.classList.add("hidden");
    }, 3000)
}