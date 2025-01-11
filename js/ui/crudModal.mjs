const crudEl = document.getElementById("modal-crud");
const exitCrud = document.getElementById("exit-crudmodal");
const openCrud = document.getElementById("open-crud");
const imageCrudURL = document.getElementById("image-crud-url");
const crudOverlay = document.getElementById("modal-overlay-crud");
const updateCrudEl = document.getElementById("update-crud");

// Closes the crud once the user clicks the close icon.
exitCrud.addEventListener("click", () => {
    crudEl.classList.add("hidden");
    document.body.style.overflow = "";
});

// Opens the crud
openCrud.addEventListener("click", () => {
    crudEl.classList.remove("hidden");
    document.body.style.overflow = "hidden";
});

// Closes the crud once the user clicks outside the crud element.
crudEl.addEventListener("click", (e) => {
    if (e.target === crudOverlay) {
        document.body.style.overflow = "";
        crudEl.classList.add("hidden");
    }
});

async function createListing() {
    try {

    } catch (error) {

    }

}

updateCrudEl.addEventListener("click", (e) => {
    e.preventDefault();

})