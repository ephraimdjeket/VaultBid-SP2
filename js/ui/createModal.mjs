import { API_AUCTION_LISTINGS } from "../utils/apiConfig.mjs";
import { accessToken, apiKey } from "./profileListings.mjs";
import { displayErrorCreate } from "../utils/errorHandler.mjs";

const createEl = document.getElementById("modal-create");
const exitCreate = document.getElementById("exit-create-modal");
const openCreate = document.getElementById("open-create");
const createOverlay = document.getElementById("modal-overlay-create");
const updateCreateEl = document.getElementById("update-create");
const createTitle = document.getElementById("title");
const createDescription = document.getElementById("description");
const createImageUrl = document.getElementById("image-list-url");
const createEndDate = document.getElementById("end-date");

// Closes the create once the user clicks the close icon.
exitCreate.addEventListener("click", () => {
    createEl.classList.add("hidden");
    document.body.style.overflow = "";
});

// Opens the create
openCreate.addEventListener("click", () => {
    createEl.classList.remove("hidden");
    document.body.style.overflow = "hidden";
});

// Closes the create once the user clicks outside the create element.
createEl.addEventListener("click", (e) => {
    if (e.target === createOverlay) {
        document.body.style.overflow = "";
        createEl.classList.add("hidden");
    }
});

async function createListing() {
    try {
        const response = await fetch(`${API_AUCTION_LISTINGS}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "X-Noroff-API-Key": `${apiKey}`,
            },
            body: JSON.stringify({
                title: createTitle.value,
                description: createDescription.value,
                media: [{ url: createImageUrl.value }],
                endsAt: createEndDate.value,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.errors[0].message || "Failed to create post";
            displayErrorCreate(errorMessage);
            return;
        }
        window.location.href = "/profile/";


    } catch (error) {
        displayErrorCreate(error.message);
        return;
    }
}
updateCreateEl.addEventListener("submit", (e) => {
    e.preventDefault();
    createListing();

})