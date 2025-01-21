const hamburgerEl = document.getElementById("hamburger");
const closeEl = document.getElementById("close");
const menuEl = document.getElementById("menu");
const logoutBtns = document.querySelectorAll(".logout");

export function initializeLogout() {
  logoutBtns.forEach((logoutBtn) => {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
    }
    );
  });
};

export function initializeHamburger() {
  closeEl.classList.add("hidden");
  menuEl.classList.add("hidden");

  function hideMenuDisplay() {
    if (window.innerWidth > 640) {
      menuEl.classList.add("hidden");
      closeEl.classList.add("hidden");
      hamburgerEl.classList.remove("hidden");
    };
  };

  hideMenuDisplay();
  window.addEventListener("resize", hideMenuDisplay);

  hamburgerEl.addEventListener("click", () => {
    hamburgerEl.classList.add("hidden");
    menuEl.classList.remove("hidden");
    closeEl.classList.remove("hidden");
  });

  closeEl.addEventListener("click", () => {
    hamburgerEl.classList.remove("hidden");
    closeEl.classList.add("hidden");
    menuEl.classList.add("hidden");
  });
};

initializeHamburger();