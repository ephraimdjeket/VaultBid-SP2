import { API_AUCTION_PROFILE } from "../utils/apiConfig.mjs";
import { displayErrorAvatar } from "../utils/errorHandler.mjs";
import { user, accessToken, apiKey } from "./profileListings.mjs";

const avatarModalEl = document.getElementById("modal-avatar");
const exitAvatarModal = document.getElementById("exit-avatar-modal");
const openAvatarModal = document.getElementById("open-avatar-modal");
const avatarInputURL = document.getElementById("image-url");
const modalOverlay = document.getElementById("modal-overlay");
const updateAvatarEl = document.getElementById("update-avatar");

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
        const response = await fetch(`${API_AUCTION_PROFILE}/${user.name}`, {
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
            window.location.href = "/profile";


        }


    } catch (error) {
        displayErrorAvatar(error.message);
        return;
    };
};

updateAvatarEl.addEventListener("submit", (e) => {
    e.preventDefault();
    updateAvatarURL();
});