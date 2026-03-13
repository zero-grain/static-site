function openModal(imgElement) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  if (!modal || !modalImg || !imgElement) return;

  modalImg.src = imgElement.currentSrc || imgElement.src;
  modalImg.alt = imgElement.alt || "Image preview";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeModal() {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  if (!modal || !modalImg) return;

  modal.classList.remove("flex");
  modal.classList.add("hidden");
  modalImg.removeAttribute("src");
  document.body.classList.remove("overflow-hidden");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "imgModal") {
    closeModal();
  }
});
