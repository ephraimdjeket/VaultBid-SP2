export const API_BASE_URL = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_LOGIN = "/login";
export const API_REGISTER = "/register";
export const API_AUCTION_LISTINGS = "/auction/listings"
export const API_AUCTION_PROFILE = "/auction/profiles/";

export function apiFetch(sortOrder) {
    return `${API_BASE_URL}${API_AUCTION_LISTINGS}?_seller=true&_bids=true&sort=created&sortOrder=${sortOrder}&limit=100`
};