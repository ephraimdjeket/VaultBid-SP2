const hamburgerEl = document.getElementById("hamburger");
const menuEl = document.getElementById("menu");

hamburgerEl.addEventListener("click", () => {
    menuEl.classList.toggle("hidden")
})