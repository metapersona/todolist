import pushtoDom from "./domManipulation";
import { index } from "./switchdirectory";
import { myLibrary } from "./myLibraryObject";

function modal() {
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const form = document.getElementById("newtask");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
//   formReset();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    myLibrary.newNote(event, index);
    pushtoDom();

    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  });
}

export default modal;