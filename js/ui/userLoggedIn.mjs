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
export const bidSection = document.querySelector(".bid-section");
export const visitorMessage = document.querySelector(".guest-message");


export const userLoggedIn = localStorage.getItem("user");

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