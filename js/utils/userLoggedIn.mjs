import { fetchListings, fetchWins } from "../ui/profileListings.mjs";
import { singleProfile } from "../ui/profileListings.mjs";

export const bidSection = document.querySelector(".bid-section");
export const visitorMessage = document.querySelector(".guest-message");

const creditDesktop = document.querySelector(".credits-desktop");
const profileTag = document.querySelector(".profile-desktop");
const logoutBtn = document.querySelector(".logout");
const loginTag = document.querySelector(".login");
const registerTag = document.querySelector(".register");
const creditMobileTag = document.querySelector(".credits-mob");
const profileMobileTag = document.querySelector(".profile-mob");
const logoutMobileBtn = document.querySelector(".logout-mob");
const loginMobileTag = document.querySelector(".login-mobile");
const registerMobileTag = document.querySelector(".register-mobile");
const mainContainer = document.querySelector("main");

export const userLoggedIn = localStorage.getItem("user");

if (window.location.pathname === "/profile/index.html" || window.location.pathname === "/profile/" && !userLoggedIn) {
  mainContainer.innerHTML = `<div
                  class=" text-center bg-red-400 border-4 border-red-500 mx-auto w-96 px-5 py-4 my-3 font-bold"
                  id="error-message"> Unauthorized access.
                </div>`;
  isNotLoggedIn();
};

export function isNotLoggedIn() {
  creditDesktop.classList.add("hidden");
  profileTag.classList.add("hidden");
  logoutBtn.classList.add("hidden");
  loginTag.classList.remove("hidden");
  registerTag.classList.remove("hidden");
  creditMobileTag.classList.add("hidden");
  profileMobileTag.classList.add("hidden");
  logoutMobileBtn.classList.add("hidden");
  loginMobileTag.classList.remove("hidden");
  registerMobileTag.classList.remove("hidden");
}

export function isLoggedIn() {
  creditDesktop.classList.remove("hidden");
  profileTag.classList.remove("hidden");
  logoutBtn.classList.remove("hidden");
  loginTag.classList.add("hidden");
  registerTag.classList.add("hidden");
  creditMobileTag.classList.remove("hidden");
  profileMobileTag.classList.remove("hidden");
  logoutMobileBtn.classList.remove("hidden");
  loginMobileTag.classList.add("hidden");
  registerMobileTag.classList.add("hidden");
}

export function userLoginCheck() {
  if (userLoggedIn) {
    isLoggedIn();
    singleProfile();

    const currentUrl2 = window.location.href;
    if (!currentUrl2.includes("/listing-details") && currentUrl2.includes("/profile")) {
      fetchListings();
    }
    fetchWins();
    const currentUrl3 = window.location.href;
    if (currentUrl3.includes("/listing-details")) {
      bidSection.classList.remove("hidden");
    };
  } else {
    isNotLoggedIn();
    const currentUrl1 = window.location.href;
    if (currentUrl1.includes("/listing-details")) {
      bidSection.classList.add("hidden");
      visitorMessage.classList.remove("hidden");
      visitorMessage.innerText = "Login to bid 😊";
    };
  };
};