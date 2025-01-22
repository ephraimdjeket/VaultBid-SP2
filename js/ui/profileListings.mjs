import { API_AUCTION_PROFILE } from "../utils/apiConfig.mjs";
import { displayError } from "../utils/errorHandler.mjs";
import { initializeHamburger, initializeLogout } from "../ui/profileActions.mjs";
import { tryCatch } from "../utils/fetchHelpers.mjs";
import { authHeaders } from "../utils/fetchHelpers.mjs";

const creditDisplay = document.querySelector(".credits");
const creditDisplayMobile = document.querySelector(".credits-mobile");
const listingCardContainer = document.getElementById("listing-container");
const winningCardContainer = document.getElementById("winning-container");
const userName = localStorage.getItem("user");

export const accessToken = localStorage.getItem("accessToken");
export const apiKey = "b5f7559e-bbe6-4f1d-8d32-2b5618d9a720";
export const user = JSON.parse(userName);


export async function singleProfile() {
  try {
    const response = await fetch(`${API_AUCTION_PROFILE}/${user.name}`, authHeaders);
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
};

export function fetchListings() {
  tryCatch(listingCardContainer, "listings");
};

export function fetchWins() {
  tryCatch(winningCardContainer, "wins");
};

initializeLogout();
initializeHamburger();