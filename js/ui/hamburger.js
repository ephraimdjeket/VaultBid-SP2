const hamburgerEl = document.getElementById("hamburger");
const menuEl = document.getElementById("menu");


function hideMenuDisplay() {
    if(window.innerWidth > 640) {
        menuEl.classList.add("hidden");
    } 
};

hideMenuDisplay();
window.addEventListener("resize", hideMenuDisplay);

hamburgerEl.addEventListener("click", () => {
    menuEl.classList.toggle("hidden")
})