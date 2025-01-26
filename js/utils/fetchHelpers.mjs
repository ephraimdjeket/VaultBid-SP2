import { displayError } from "../utils/errorHandler.mjs";
import { API_AUCTION_PROFILE } from "../utils/apiConfig.mjs";
import { listingCard } from "../ui/itemCardRenderer.mjs";

export const accessToken = localStorage.getItem("accessToken");
export const apiKey = "b5f7559e-bbe6-4f1d-8d32-2b5618d9a720";
const userName = localStorage.getItem("user");
export const user = JSON.parse(userName);

export const authHeaders = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
    "X-Noroff-API-Key": `${apiKey}`,
  }
};

/**
 * @description
 * - Fetches data from the API based on the specified type.
 * - Renders the data into the provided container using the `listingCard` function.
 * - If the fetch operation fails, an error message is displayed.
 *
 * @async
 * @function tryCatch
 * @param {HTMLElement} container The container element where the fetched data will be rendered.
 * @param {string} type  The type of data to fetch.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export async function tryCatch(container, type) {
  try {
    const response = await fetch(`${API_AUCTION_PROFILE}/${user.name}/${type}`, authHeaders);
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.errors[0].message || "Failed to fetch";
      throw new Error(errorMessage);
    };
    const { data } = await response.json();
    data.forEach((item) => {
      listingCard(item, container);
    });

  } catch (error) {
    displayError(error.message) || "An unknown error occurred while fetching";
    return;
  };
};
