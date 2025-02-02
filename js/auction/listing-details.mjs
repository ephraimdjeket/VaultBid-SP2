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

/**
 * Submits a bid for the selected auction listing.
 * 
 * @param {string} id The unique id of the selected listing.
 * @returns {void} Handles success or error cases by displaying the relevant message and performing updates.
 * 
 * @throws {Error} Handles any errors related to the network or if an unexpected error occurs during the fetch.
 * 
 * @description 
 * - Checks if the bid amount is a number and that it's above 0. If not, it displays an error message to the user.
 * - If the bid amount is valid, it sends a POST request to the API to bid on current listing id.
 * - If the POST request is not successful, it'll throw an error message that comes from the API to the user.
 * - If the POST request is successful, it'll display a custom success message to the user.
 * - Invokes the function "listingDetails()" and "singleProfile()" to update the UI changes after a successful bid.
 */
/**
 * Submits a bid for the selected auction listing.
 * @param {string} id The unique id of the selected listing.
 */
async function bidOnItem(id) {
  try {
    if (!id) {
      displayError("Invalid listing ID.");
      return;
    }
    // Disable button to prevent multiple submissions
    biddingFormEl.disabled = true;

    const amount = Number(bidAmount.value);
    if (isNaN(amount) || amount <= 0) {
      displayError("Please enter a valid bid amount greater than zero.");
      biddingFormEl.disabled = false;
      return;
    }

    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${apiKey}`,
      },
      body: JSON.stringify({ amount: amount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.errors?.[0]?.message || "Failed to bid";
      displayError(errorMessage);
      biddingFormEl.disabled = false;
      return;
    }

    bidSuccessfulMessage.classList.remove("hidden");
    bidSuccessfulMessage.innerText = "You've successfully bid on this item";

    // Hide success message after 3 seconds
    setTimeout(() => {
      bidSuccessfulMessage.classList.add("hidden");
      biddingFormEl.disabled = false; // Re-enable button
    }, 3000);

    await listingDetails(); // Refresh listing details after a successful bid
    await singleProfile(); // Refresh user profile

  } catch (error) {
    displayError(`Error: ${error.message}`);
    biddingFormEl.disabled = false;
  };
};

/**
 * Fetches and displays auction listing details.
 */
async function listingDetails() {
  try {
    spinner.classList.remove("hidden");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) throw new Error("No ID found in the URL.");

    const response = await fetch(`${API_AUCTION_LISTINGS}?_seller=true&_bids=true&sort=created&sortOrder=desc`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error fetching auction listings");

    spinner.classList.add("hidden");

    const { data } = await response.json();
    const listing = data.find((item) => item.id === id);

    if (!listing) throw new Error("No listing found with the given ID.");

    renderListingDetails(listing);

    // Remove any existing event listeners before adding a new one
    biddingFormEl.removeEventListener("submit", handleBidSubmission);
    biddingFormEl.addEventListener("submit", handleBidSubmission);

  } catch (error) {
    displayError(error.message);
  }
}

/**
 * Prevents multiple event listeners and handles bid submission.
 */
function handleBidSubmission(e) {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (!id) {
    displayError("Invalid listing ID.");
    return;
  }
  bidOnItem(id);
}

function renderListingDetails(listing) {
  listingImage.src = listing.media?.[0]?.url || "/images/placeholder-image.jpg";
  listingImage.alt = listing.media?.[0]?.alt || "An image";

  listingTitle.classList.add("text-ellipsis", "overflow-hidden", "text-clip");
  listingTitle.innerText = listing.title;

  listingDescription.style.maxWidth = "24rem";
  listingDescription.classList.add("text-ellipsis", "overflow-hidden", "text-clip");
  listingDescription.innerText = listing.description || "No description added.";

  listingSeller.innerText = `Seller: ${listing.seller.name}`;

  const formattedDate = new Date(listing.endsAt).toLocaleDateString("en-GB");
  listingEndDate.innerText = formattedDate;

  // Clear previous bid history before rendering new bids
  bidHistoryContainer.innerHTML = "";

  // Reset the `allAmounts` array to prevent duplicates
  allAmounts.length = 0;

  // Find highest bid
  listing.bids.forEach((bid) => {
    allAmounts.push(bid.amount);
  });

  const highestAmount = allAmounts.length > 0 ? Math.max(...allAmounts) : 0;
  listingCurrentBid.innerText = `Highest bid: $${highestAmount}`;

  // Render new bid history
  listing.bids.forEach((bid) => {
    const bidderContainer = document.createElement("div");
    bidderContainer.classList.add("py-4", "item-center", "flex", "justify-center");

    const bidderName = document.createElement("span");
    bidderName.classList.add("w-1/3");
    bidderName.innerText = bid.bidder.name;

    const bidDate = document.createElement("span");
    bidDate.classList.add("w-1/3");
    bidDate.innerText = new Date(bid.created).toLocaleDateString("en-GB");

    const bidAmount = document.createElement("span");
    bidAmount.classList.add("w-1/3");
    bidAmount.innerText = `$${bid.amount}`;

    bidderContainer.appendChild(bidderName);
    bidderContainer.appendChild(bidDate);
    bidderContainer.appendChild(bidAmount);

    bidHistoryContainer.appendChild(bidderContainer);
  });
}


listingDetails();
initializeLogout();
initializeHamburger();
userLoginCheck(singleProfile);