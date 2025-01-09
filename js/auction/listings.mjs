import { API_BASE_URL, API_AUCTION_LISTINGS } from "../utils/apiConfig.mjs";
import { singleProfile } from "../ui/profileListings.mjs";
import { displayError } from "../utils/errorHandler.mjs";
import { userLoggedIn, isLoggedIn, isNotLoggedIn } from "../utils/userLoggedIn.mjs";
import { renderListingCard } from "../utils/renderListingCard.mjs";
const spinner = document.querySelector(".status");
const listingCardContainer = document.getElementById("listing-container");
const newestFilterBtn = document.getElementById("newest");
const oldestFilterBtn = document.getElementById("oldest");

newestFilterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    spinner.classList.remove("hidden");
    async function fetchNewest() {
        try {
            const response = await fetch(`${API_BASE_URL}${API_AUCTION_LISTINGS}?_seller=true&_bids=true&sort=created&sortOrder=desc`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                spinner.classList.add("hidden");
                console.error("Failed to fetch data");
                return;
            }
            spinner.classList.add("hidden");
            const { data } = await response.json();
            const sortedData = data.sort((a, b) => {
                const dateA = new Date(a.created);
                const dateB = new Date(b.created);
                return dateB - dateA;
            });

            listingCardContainer.innerHTML = "";

            renderListingCard(sortedData, listingCardContainer);
        } catch (error) {
            spinner.classList.add("hidden");
            displayError(error.message);
        }
    }

    fetchNewest();
});



oldestFilterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    spinner.classList.remove("hidden");
    async function fetchOldest() {
        try {
            const response = await fetch(`${API_BASE_URL}${API_AUCTION_LISTINGS}?_seller=true&_bids=true&sort=created&sortOrder=asc`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                spinner.classList.add("hidden");
                console.error("Failed to fetch data");
                return;
            }
            spinner.classList.add("hidden");
            const { data } = await response.json();

            const sortedData = data.sort((a, b) => {
                const dateA = new Date(a.created);
                const dateB = new Date(b.created);
                return dateA - dateB;
            });


            listingCardContainer.innerHTML = "";


            renderListingCard(sortedData, listingCardContainer);

        } catch (error) {
            spinner.classList.add("hidden");
            displayError(error.message);
        }
    }

    fetchOldest();
});

if (userLoggedIn) {
    isLoggedIn();
    singleProfile();
} else {
    isNotLoggedIn();
}

async function auctionListings() {
    if (!listingCardContainer) {
        displayError("Listing container element not found.");
        return;
    }

    try {
        spinner.classList.remove("hidden");
        const response = await fetch(`${API_BASE_URL}${API_AUCTION_LISTINGS}?_seller=true&_bids=true&sort=created&sortOrder=desc`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            spinner.classList.add("hidden");
            const errorData = await response.json();
            const errorMessage = errorData.errors[0].message || "Failed to fetch";
            throw new Error(errorMessage);
        }
        spinner.classList.add("hidden");
        const { data } = await response.json();
        renderListingCard(data, listingCardContainer);
    } catch (error) {
        spinner.classList.add("hidden");
        displayError(error.message);
    }
}

auctionListings();