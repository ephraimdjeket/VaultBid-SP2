import { API_BASE_URL } from "../utils/apiConfig.mjs";
import { singleProfile, fetchListings, authHeaders, } from "../ui/userAPI.mjs";

const userName = localStorage.getItem("user");
const userProfileName = document.getElementById("username");
const userProfilePicture = document.getElementById("profileImg");
const user = JSON.parse(userName);

userProfileName.textContent = user.name;
userProfilePicture.src = user.avatar.url || "/images/placeholder-image.png";

async function fetchWins() {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/profiles/${user.name}/wins`, authHeaders);
        if (!response.ok) throw new Error("Failed to fetch listings");
        return await response.json();

    } catch (error) {
        console.log("Error fetching listings:", error);
        return [];
    }
}

fetchListings();
fetchWins();
singleProfile();