import { API_BASE_URL, API_AUCTION_PROFILE } from "../utils/apiConfig.mjs";
import { displayErrorAvatar } from "./errorHandler.mjs";
import { user, accessToken, apiKey } from "./profileListings.mjs";

const avatarModalEl = document.getElementById("modal-avatar");
const exitAvatarModal = document.getElementById("exit-avatarmodal");
const openAvatarModal = document.getElementById("open-avatarmodal");
const avatarInputURL = document.getElementById("image-url");
const modalOverlay = document.getElementById("modal-overlay");
const updateAvatarEl = document.getElementById("update-avatar");
const imageSuccessfulContainer = document.getElementById("image-successful");

// Closes the modal once the user clicks the close icon.
exitAvatarModal.addEventListener("click", () => {
    avatarModalEl.classList.add("hidden");
    document.body.style.overflow = "";
});

// Opens the modal
openAvatarModal.addEventListener("click", () => {
    avatarModalEl.classList.remove("hidden");
    document.body.style.overflow = "hidden";
});

// Closes the modal once the user clicks outside the modal element.
avatarModalEl.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        document.body.style.overflow = "";
        avatarModalEl.classList.add("hidden");
    }
});

// PUT HTTP request to update avatar image URL
async function updateAvatarURL() {
    try {
        const response = await fetch(`${API_BASE_URL}${API_AUCTION_PROFILE}${user.name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "X-Noroff-API-Key": `${apiKey}`,
            },
            body: JSON.stringify({
                avatar: {
                    url: avatarInputURL.value,
                },
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.errors[0].message || "Failed to upload image";
            displayErrorAvatar(errorMessage);
            return;
        } else {
            user.avatar.url = avatarInputURL.value;
            localStorage.setItem("user", JSON.stringify(user));
            imageSuccessfulContainer.classList.remove("hidden");
            imageSuccessfulContainer.innerText = "Image successfully uploaded";
            setTimeout(() => {
                imageSuccessfulContainer.classList.add("hidden");
            }, 3000)
        }


    } catch (error) {
        displayErrorAvatar(error.message);
        return;
    };
};

updateAvatarEl.addEventListener("submit", (e) => {
    imageSuccessfulContainer.classList.add("hidden");
    e.preventDefault();
    updateAvatarURL();
});