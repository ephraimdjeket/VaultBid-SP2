import { singleProfile, fetchListings, fetchWins } from "../ui/profileListings.mjs";
import { userLoggedIn, isLoggedIn, isNotLoggedIn } from "../utils/userLoggedIn.mjs";

if (userLoggedIn) {
    isLoggedIn();
    fetchListings();
    fetchWins();
    singleProfile();
} else {
    isNotLoggedIn();
}

const userName = localStorage.getItem("user");
const userProfileName = document.getElementById("username");
const userProfileBio = document.getElementById("bio")
const userProfilePicture = document.getElementById("profileImg");
const user = JSON.parse(userName);

userProfileName.innerText = user.name;
userProfileBio.innerText = user.bio || "How about adding a bio? 😎";
userProfilePicture.src = user.avatar.url || "/images/placeholder-image.png";