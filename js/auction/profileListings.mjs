import { API_BASE_URL } from "../utils/apiConfig.mjs";

const userName = localStorage.getItem("user");
const user = JSON.parse(userName);
const accessToken = localStorage.getItem("accessToken");
const apiKey = "b5f7559e-bbe6-4f1d-8d32-2b5618d9a720";

async function fetchListings() {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/profiles/${user.name}/listings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "X-Noroff-API-Key": `${apiKey}`,
            },
        });
        if (!response.ok) throw new Error("Failed to fetch listings");
        return await response.json();

    } catch (error) {
        console.log("Error fetching listings:", error);
        return [];
    }
}

async function fetchWins() {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/profiles/${user.name}/wins`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "X-Noroff-API-Key": `${apiKey}`,
            },
        });
        if (!response.ok) throw new Error("Failed to fetch listings");
        return await response.json();

    } catch (error) {
        console.log("Error fetching listings:", error);
        return [];
    }
}

fetchListings();
fetchWins();