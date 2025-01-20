import { apiFetch } from "../utils/apiConfig.mjs";
import { displayError } from "../utils/errorHandler.mjs";
import { userLoginCheck } from "../utils/userLoggedIn.mjs";
import { renderListingCard } from "../utils/renderListingCard.mjs";
import { initializeHamburger, initializeLogout } from "../ui/profileActions.mjs";

const spinner = document.querySelector(".status");
const listingCardContainer = document.getElementById("listing-container");
const newestFilterBtn = document.getElementById("newest");
const oldestFilterBtn = document.getElementById("oldest");
const searchForm = document.getElementById("search-form");

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
  }
}

searchForm.addEventListener("input", async (e) => {
  const inputValue = e.target.value.toLowerCase();
  try {
    const response = await fetch(apiFetch("desc"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.errors[0].message || "Failed to fetch";
      displayError(errorMessage);
      return;
    }
    const { data } = await response.json();
    const filteredData = data.filter((item) => item.title.toLowerCase().includes(inputValue));
    listingCardContainer.innerHTML = "";
    renderListingCard(filteredData, listingCardContainer);
  } catch (error) {
    displayError(error.message);
    return;
  }
});


newestFilterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  spinner.classList.remove("hidden");
  async function fetchNewest() {
    try {
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
      return;
    }
  }

  fetchNewest();
});

oldestFilterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  spinner.classList.remove("hidden");
  async function fetchOldest() {
    try {
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
      const reversedData = data.reverse();
      const sortedData = reversedData.sort((a, b) => {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);
        return dateA - dateB;
      });


      listingCardContainer.innerHTML = "";


      renderListingCard(sortedData, listingCardContainer);

    } catch (error) {
      spinner.classList.add("hidden");
      displayError(error.message);
      return;
    }
  }

  fetchOldest();
});

userLoginCheck();
auctionListings();
initializeLogout();
initializeHamburger();
