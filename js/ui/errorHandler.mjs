const errorMessageContainer = document.getElementById("errorMessage");

export function displayError(message) {
    errorMessageContainer.classList.add("flex", "justify-around", "text-center", "text-red-500", "py-5")
    errorMessageContainer.innerText = message;
}