// Base URL
export const API_BASE_URL = "https://v2.api.noroff.dev";
// API Endpoints
export const API_AUTH = `${API_BASE_URL}/auth`;
export const API_LOGIN = `${API_AUTH}/login`;
export const API_REGISTER = `${API_AUTH}/register`;
export const API_AUCTION_LISTINGS = `${API_BASE_URL}/auction/listings`;
export const API_AUCTION_PROFILE = `${API_BASE_URL}/auction/profiles`;

/**
 * 
 * @param {string} sortOrder The order in which to sort listings (e.g "asc" for ascending and "desc" for descending).
 * @returns returns the full URL to fetch the auction listing in the specified order.
 */
export function apiFetch(sortOrder) {
  return `${API_AUCTION_LISTINGS}?_seller=true&_bids=true&sort=created&sortOrder=${sortOrder}&limit=100`
};