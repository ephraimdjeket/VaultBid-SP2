import { API_BASE_URL } from "../utils/apiConfig.mjs";
import { singleProfile } from "../ui/userAPI.mjs";

const listingImage = document.getElementById("listing-image");
const listingTitle = document.getElementById("title");
const listingDescription = document.getElementById("description");
const listingSeller = document.getElementById("username");
const listingEndDate = document.getElementById("date");
const listingCurrentBid = document.getElementById("current-bid");
const bidHistoryContainer = document.getElementById("bid-history");
const allAmounts = [];


async function listingDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        if (!id) {
            throw new Error("No ID found in the URL.");
        }
        const response = await fetch(`${API_BASE_URL}/auction/listings/?_seller=true&_bids=true`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const { data } = await response.json();
        const listing = data.find((item) => item.id === id);
        if (!listing) {
            throw new Error("No listing found with the given ID.");
        }
        renderListingDetails(listing);
    } catch (error) {
        console.error("Error fetching or rendering auction listings:", error);
    }
}

function renderListingDetails(listing) {
    if (listing.media[0].url === null) {
        listingImage.src = "/images/placeholder-image.png";
    } else {
        listingImage.src = listing.media[0].url;
    }
    if (listingImage.alt === null || listingImage === "") {
        listingImage.alt = "An image";
    } else {
        listingImage.alt = listing.media[0].alt;
    }
    listingTitle.innerText = `${listing.title}`;
    listingDescription.style.maxWidth = "24rem";
    listingDescription.innerText = `${listing.description}`.charAt(0).toUpperCase() + `${listing.description}`.slice(1);
    listingSeller.innerText = `Seller: ${listing.seller.name}`;
    const originalDate = listing.endsAt;
    const date = new Date(originalDate);
    const formattedDate = date.toLocaleDateString("en-GB");
    const originalBidDate = formattedDate;
    listingEndDate.innerText = `${originalBidDate}`;
    listing.bids.forEach((amount) => {
        allAmounts.push(amount.amount);
    });
    const highestAmount = Math.max(...allAmounts);
    listingCurrentBid.innerText = `Highest bid: $${highestAmount}`;
    listing.bids.forEach((bids) => {
        const bidderContainer = document.createElement("div");
        bidderContainer.classList.add("flex", "flex-row", "justify-between", "py-4")
        const bidderName = document.createElement("p");
        bidderName.innerText = `${bids.bidder.name}`;
        const bidderDate = document.createElement("p");
        const originalDate = bids.created;
        const date = new Date(originalDate);
        const formattedDate = date.toLocaleDateString("en-GB");
        const originalBidDate = formattedDate;
        bidderDate.innerText = `${originalBidDate}`;
        const bidderAmount = document.createElement("p");
        bidderAmount.innerText = `$${bids.amount}`;

        bidHistoryContainer.appendChild(bidderContainer);
        bidderContainer.appendChild(bidderName);
        bidderContainer.appendChild(bidderDate);
        bidderContainer.appendChild(bidderAmount);
    })
}

singleProfile();
listingDetails();