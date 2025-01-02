import { singleProfile, fetchListings, fetchWins } from "../ui/profileListings.mjs";

const userName = localStorage.getItem("user");
const userProfileName = document.getElementById("username");
const userProfilePicture = document.getElementById("profileImg");
const user = JSON.parse(userName);

userProfileName.textContent = user.name;
userProfilePicture.src = user.avatar.url || "/images/placeholder-image.png";

fetchListings();
fetchWins();
singleProfile();