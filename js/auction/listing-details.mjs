import { API_AUCTION_LISTINGS } from "../utils/apiConfig.mjs";
import { singleProfile, accessToken, apiKey } from "../ui/profileListings.mjs";
import { displayError } from "../utils/errorHandler.mjs";
import { userLoginCheck } from "../utils/userLoggedIn.mjs";
import { initializeHamburger, initializeLogout } from "../ui/profileActions.mjs";

const listingImage = document.getElementById("listing-image");
const listingTitle = document.getElementById("title");
const listingDescription = document.getElementById("description");
const listingSeller = document.getElementById("username");
const listingEndDate = document.getElementById("date");
const listingCurrentBid = document.getElementById("current-bid");
const bidHistoryContainer = document.getElementById("bid-history");
const allAmounts = [];
const bidAmount = document.getElementById("bid-amount");
const biddingFormEl = document.getElementById("bid-form");
const bidSuccessfulMessage = document.getElementById("bid-successful");
const spinner = document.querySelector(".status");

userLoginCheck(singleProfile);

async function bidOnItem(id) {
  try {
    const amount = Number(bidAmount.value);
    if (isNaN(amount) || amount <= 0) {
      displayError("Please enter a valid bid amount greater than zero.");
      return;
    }

    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${apiKey}`,
      },
      body: JSON.stringify({
        amount: amount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.errors[0].message || "Failed to bid";
      displayError(errorMessage);
      return;
    }

    const result = await response.json();
    bidSuccessfulMessage.classList.remove("hidden");
    bidSuccessfulMessage.innerText = "You've successfully bid on this item"
    setTimeout(() => {
      bidSuccessfulMessage.classList.add("hidden");
    }, 3000);

    listingDetails();
    singleProfile();
  } catch (error) {
    bidSuccessfulMessage.classList.add("hidden");
    const errorMessage = `${error.message}`;
    displayError(errorMessage);
  }
}

async function listingDetails() {
  try {
    spinner.classList.remove("hidden");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
      throw new Error("No ID found in the URL.");
    }
    const response = await fetch(`${API_AUCTION_LISTINGS}?_seller=true&_bids=true&sort=created&sortOrder=desc`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(Error);
    }
    spinner.classList.add("hidden");
    const { data } = await response.json();
    const listing = data.find((item) => item.id === id);
    if (!listing) {
      throw new Error("No listing found with the given ID.");
    }

    renderListingDetails(listing);

    biddingFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      bidOnItem(listing.id);
    });
  } catch (error) {
    const errorMessage = `${error.message}`;
    displayError(errorMessage);
    return;
  }
}



function renderListingDetails(listing) {
  if (!listing.media || listing.media.length === 0 || !listing.media[0]?.url) {
    listingImage.src = "/images/placeholder-image.jpg";
  } else {
    listingImage.src = listing.media[0].url;
  }
  listingImage.alt = listing.media?.[0]?.alt || "An image";
  listingTitle.innerText = listing.title && listing.title.length > 40
    ? listing.title.substring(0, 40) + "..."
    : listing.title || "Untitled Listing";
  listingDescription.style.maxWidth = "24rem";
  listingDescription.innerText = listing.description && listing.description.length > 100 ? listing.description.substring(0, 100) + "..." : listing.description || "No description added.";
  listingSeller.innerText = `Seller: ${listing.seller.name} `;
  const originalDate = listing.endsAt;
  const date = new Date(originalDate);
  const formattedDate = date.toLocaleDateString("en-GB");
  const originalBidDate = formattedDate;
  listingEndDate.innerText = `${originalBidDate}`;
  listing.bids.forEach((amount) => {
    allAmounts.push(amount.amount);
  });
  const highestAmount = allAmounts.length > 0 ? Math.max(...allAmounts) : 0;
  listingCurrentBid.innerText = `Highest bid: $${highestAmount} `;
  listing.bids.forEach((bids) => {
    const bidderContainer = document.createElement("div");
    bidderContainer.classList.add("py-4", "item-center")
    const bidderName = document.createElement("span");
    bidderName.classList.add("w-1/3");
    bidderName.innerText = `${bids.bidder.name} `;
    const bidderDate = document.createElement("span");
    const originalDate = bids.created;
    const date = new Date(originalDate);
    const formattedDate = date.toLocaleDateString("en-GB");
    const originalBidDate = formattedDate;
    bidderDate.classList.add("w-1/3");
    bidderDate.innerText = `${originalBidDate} `;
    const bidderAmount = document.createElement("span");
    bidderAmount.classList.add("w-1/3");
    bidderAmount.innerText = `$${bids.amount} `;

    bidderContainer.appendChild(bidderName);
    bidderContainer.appendChild(bidderDate);
    bidderContainer.appendChild(bidderAmount);
    bidHistoryContainer.appendChild(bidderContainer);
  });
};

listingDetails();
initializeLogout();
initializeHamburger();