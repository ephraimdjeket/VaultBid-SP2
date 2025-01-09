import { API_BASE_URL } from "../utils/apiConfig.mjs";
import { displayError } from "../utils/errorHandler.mjs";

const creditDisplay = document.querySelector(".credits");
const creditDisplayMobile = document.querySelector(".credits-mobile");
export const accessToken = localStorage.getItem("accessToken");
export const apiKey = "b5f7559e-bbe6-4f1d-8d32-2b5618d9a720";
const listingCardContainer = document.getElementById("listing-container");
const userName = localStorage.getItem("user");
export const user = JSON.parse(userName);

export async function singleProfile() {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/profiles/${user.name}`, authHeaders);
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.errors[0].message || "Failed to fetch";
            throw new Error(errorMessage);
        }
        const { data } = await response.json();
        creditDisplay.textContent = data.credits;
        creditDisplayMobile.textContent = data.credits;


    } catch (error) {
        displayError(error.message) || "An unknown error occurred while fetching";
        return;
    }
}


export const authHeaders = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${apiKey}`,
    }
};

export async function fetchListings() {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/profiles/${user.name}/listings`, authHeaders);
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.errors[0].message || "Failed to fetch";
            throw new Error(errorMessage);
        }
        const { data } = await response.json();
        data.forEach((item) => {
            listItem(item)
        });

    } catch (error) {
        displayError(error.message) || "An unknown error occurred while fetching";
        return;
    }
}

export async function fetchWins() {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/profiles/${user.name}/wins`, authHeaders);
        if (!response.ok) throw new Error("Failed to fetch listings");
        const { data } = await response.json();
        data.forEach((item) => {
            listItem(item)
        });

    } catch (error) {
        displayError(error.message) || "An unknown error occurred while fetching";
        return;
    }
}

export function listItem(item) {
    const listingCard = document.createElement("div");
    listingCard.classList.add(
        "bg-white",
        "rounded-xl",
        "w-64",
        "mt-16",
        "flex",
        "flex-col",
        "justify-center",
        "items-left",
    );

    // Add image
    const mediaUrl = item.media && item.media.length > 0 ? item.media[0].url : "/images/placeholder-image.png";
    const listingCardImg = document.createElement("img");
    listingCardImg.style.height = "12rem";
    listingCardImg.classList.add("rounded-t-xl", "block", "w-full", "object-cover");
    listingCardImg.src = mediaUrl;
    listingCardImg.alt = item.media && item.media.length > 0 ? item.media[0].alt : "Placeholder Image";
    listingCard.appendChild(listingCardImg);

    // Add card information container
    const listingContainer = document.createElement("div");
    listingContainer.classList.add("pl-7",
        "py-9");

    // Add title
    const listingTitle = document.createElement("h2");
    listingTitle.classList.add("list-title", "font-bold", "text-xl", "font-roboto", "w-full", "truncate");
    listingTitle.innerText = item.title && item.title.length > 12
        ? item.title.substring(0, 12) + "..."
        : item.title || "Untitled Listing";
    listingContainer.appendChild(listingTitle);

    // Add creation date
    const listingDateContainer = document.createElement("p");
    listingDateContainer.classList.add("font-open-sans");
    const originalDate = item.created;
    const date = new Date(originalDate);
    const formattedDate = date.toLocaleDateString("en-GB");
    const listingDate = formattedDate;
    listingDateContainer.innerText = `Created: ${listingDate}`;
    listingContainer.appendChild(listingDateContainer);

    // Add bid count
    const listingBidContainer = document.createElement("p");
    listingBidContainer.classList.add("font-open-sans");
    const bidCount = item._count?.bids || 0;
    listingBidContainer.innerText = `Bids: ${bidCount}`;
    listingContainer.appendChild(listingBidContainer);

    // Add view button
    const listingButton = document.createElement("a");
    listingButton.href = `/listing-details/?id=${item.id}`;
    listingButton.classList.add(
        "list-button",
        "bg-slate-blue",
        "font-bold",
        "font-open-sans",
        "w-40",
        "h-9",
        "mt-5",
        "text-white",
        "flex",
        "items-center",
        "justify-center"
    );
    listingButton.innerText = "View";
    listingContainer.appendChild(listingButton);
    listingCard.appendChild(listingContainer);

    // Append card to container
    listingCardContainer.appendChild(listingCard);
}
