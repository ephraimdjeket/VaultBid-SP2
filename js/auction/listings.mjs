import { apiFetch } from "../utils/apiConfig.mjs";
import { displayError } from "../utils/errorHandler.mjs";
import { userLoginCheck } from "../utils/userLoggedIn.mjs";
import { renderListingCard } from "../utils/renderListingCard.mjs";
import { initializeHamburger, initializeLogout } from "../ui/profileActions.mjs";

const spinner = document.querySelector(".status");
const listingCardContainer = document.getElementById("listing-container");

async function auctionListings() {
  if (!listingCardContainer) {
    displayError("Listing container element not found.");
    return;
  }

  try {
    spinner.classList.remove("hidden");
    const response = await fetch(apiFetch("desc"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      spinner.classList.add("hidden");
      const errorData = await response.json();
      const errorMessage = errorData.errors[0].message || "Failed to fetch";
      displayError(errorMessage);
      return;
    }
    spinner.classList.add("hidden");
    const { data } = await response.json();
    renderListingCard(data, listingCardContainer);
  } catch (error) {
    spinner.classList.add("hidden");
    displayError(error.message);
    return;
  };
};

userLoginCheck();
auctionListings();
initializeLogout();
initializeHamburger();
