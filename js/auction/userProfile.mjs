import { userLoginCheck } from "../utils/userLoggedIn.mjs";
import { initializeHamburger, initializeLogout } from "../ui/profileActions.mjs";


userLoginCheck();

const userName = localStorage.getItem("user");
const userProfileName = document.getElementById("username");
const userProfileBio = document.getElementById("bio")
const userProfilePicture = document.getElementById("profileImg");
const user = JSON.parse(userName);

userProfileName.innerText = user.name;
userProfileBio.innerText = user.bio || "A bio hasn't been added.";
userProfilePicture.src = user.avatar.url || "/images/placeholder-image.jpg";

initializeLogout();
initializeHamburger();