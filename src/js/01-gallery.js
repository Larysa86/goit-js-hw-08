// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const gallaryContainer = document.querySelector(".gallery");
const gallaryItemsMarkup = createGallaryMarkup(galleryItems);

gallaryContainer.innerHTML = gallaryItemsMarkup;

function createGallaryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    /></a></div>`;
    })
    .join("");
}

gallaryContainer.addEventListener("click", onGallaryImageElClick);

let instance = "";

function onGallaryImageElClick(event) {
  event.preventDefault();

  const isGallaryImageEl = event.target.classList.contains("gallery__image");

  if (!isGallaryImageEl) {
    return;
  }

  instance = basicLightbox.create(`<img src="${event.target.dataset.source}">`);
  instance.show();
  window.addEventListener("keydown", closeModal);
}

function closeModal(event) {
    if (event.code === "Escape") {
      instance.close();
      window.removeEventListener("keydown", closeModal);
    }
  }

console.log(galleryItems);
