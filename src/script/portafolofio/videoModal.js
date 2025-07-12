export function openVideoModal(url) {
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("modal-video");

  if (!modal || !video) return;

  modal.classList.remove("hidden");
  modal.classList.add("flex", "items-center", "justify-center");

  const source = video.querySelector("source");
  if (source) {
    source.src = url;
    video.load();
    video.play();
  }
}

export function closeVideoModal() {
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("modal-video");

  if (!modal || !video) return;

  video.pause();
  video.currentTime = 0;

  const source = video.querySelector("source");
  if (source) source.src = "";

  modal.classList.remove("flex", "items-center", "justify-center");
  modal.classList.add("hidden");
}

export function setupVideoModalEvents() {
  const closeBtn = document.getElementById("close-modal");
  closeBtn?.addEventListener("click", closeVideoModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeVideoModal();
    }
  });

  window.openVideoModal = openVideoModal;
}
