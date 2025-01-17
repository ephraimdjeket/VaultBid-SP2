const logoutBtns = document.querySelectorAll(".logout");

logoutBtns.forEach((logoutBtn) => {
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
  }
  );
});