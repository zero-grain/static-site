function openModal(imgElement) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  modalImg.src = imgElement.src; // 用縮圖來源當放大圖
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  const modal = document.getElementById("imgModal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

// 按 ESC 也能關閉
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
