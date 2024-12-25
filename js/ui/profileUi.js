const userProfileName = document.getElementById("username");
const userProfilePicture = document.getElementById("profileImg");

// Get the user object in localstorage
const userName = localStorage.getItem("user");

// Parse the object into Javascript object
const user = JSON.parse(userName)


userProfileName.textContent = user.name;
userProfilePicture.src = user.avatar.url || "/images/placeholder-image.png";